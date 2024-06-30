// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;


import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Context} from "@openzeppelin/contracts/utils/Context.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
* This contract is based on the openzeppelin VestingWallet.sol
*
* @dev A vesting wallet is a smart contract that can recieve native currency and ERC20 tokens, and  release these
* assets to the wallet beneficiary according to a vesting wallet.
*
* Any asset transfered to this wallet will follow the vesting schedule as if they were locked from the beginning
*
* If the vesting has already started, any amount of tokens (at least part) sent to this contract is immediately claimable.
*
* By setting the duration to 0, one can configure this contract this contract to behave like an asset timelock that hold tokens for
* a beneficiary until a specified time.
*
* NOTE: Since this wallet is {Ownable}, and ownership is transferrable. It is possible to sell unvested tokens.
* Preventing this in a smart contract is difficult, considering that
* 1) a beneficiary address could be a counterfactually deployed contract: even though the codes at an address can be checked, 
* to verify its a smart contract address, this is not reliable as evm address can be generated and codes deployed later to the address.
* 2) there is likely to be a migration path for EOAs to become contracts in the near future.
*
* NOTE: When using this contract with any token whose balance is adjusted automatically (i.e. a release token),
* make sure to account for the supply/balance adjustment in the vesting schedule to ensure the vesting amount is as intended.
* //I don't understand this line
*
*
*/

contract SusuWallet is Context, Ownable {

    event EtherReleased(uint amount);
    event ERC20Released(address indexed token, uint amount);

    uint private _released; // amount of eth released

    mapping(address token => uint256) private _erc20Released; // mapping of amount of token released
    uint64 private immutable _start; 
    uint64 private immutable _duration;


    /**
    * @dev Sets the sender as initial owner, the beneficiary as the pending owner, the start timestamp,
    * and the vesting duration of the vesting wallet.
    */
    constructor(address beneficiary, uint64 startTimestamp, uint64 durationSeconds) Ownable(beneficiary){
        _start = startTimestamp;
        _duration = durationSeconds;
    }

    /**
    * @dev The contract should be able to receive Eth
    */
    receive() external payable {}

    /**
    * @dev Getter for the start timestamp
    */
    function start() public view virtual returns(uint){
        return _start;
    }

    /**
    * @dev Getter for the vesting duration
    */
    function duration() public view virtual returns (uint){
        return _duration;
    }

    /**
    * @dev Getter for the end timestamp
    */
    function end() public view virtual returns (uint){
        return start()+duration();
    }

    /**
    * @dev Amount of eth already released
    */
    function released() public view virtual returns(uint){
        return _released;
    }

    /**
    * @dev Amount of token already released
    */
    function released(address token) public view virtual returns(uint){
        return _erc20Released[token];
    }

    /**
    * @dev Getter for amount of releasable eth
    */
    function releasable() public view virtual returns (uint){
        return vestedAmount(uint64(block.timestamp)) - released();
    }

    /**
    * @dev Getter for amount releasable `token` tokens. `token` should be the address of {IERC20} contract.
    */
    function releasable(address token) public view virtual returns (uint){
        return vestedAmount(token, uint64(block.timestamp)) - released(token);
    }
    

    /**
    * @dev Release the native token (ether) that have already vested.
    *
    * Emits a {EtherReleased} event.
    */
    function release() public virtual {
        uint amount = releasable();
        _released += amount;
        emit EtherReleased(amount);
        Address.sendValue(payable(owner()), amount);
    }

    /**
    * @dev Release the tokens that have already vested.
    *
    */
    function release(address token) public virtual {
        uint amount = releasable(token);
        _erc20Released[token] += amount;
        emit ERC20Released(token, amount);
        SafeERC20.safeTransfer(IERC20(token), owner(), amount);
    }

    /**
    * @dev Calculates the amount of ether that has already vested. Default implementation is a linear vesting curve.
    */
    function vestedAmount(uint64 timestamp) public view virtual returns(uint){
        return _vestingSchedule(address(this).balance + released(), timestamp);
    }

    /**
    * @dev Calculates the amount of tokens that has already vested. Default implementation is a linear vesting curve.
    */
    function vestedAmount(address token, uint64 timestamp) public view virtual returns (uint){
        return _vestingSchedule(IERC20(token).balanceOf(address(this)) +  released(token), timestamp);
    }


    /**
    * @dev Virtual implementation of the vesting formula. This returns the amount vested, as a function of time, for
    * an asset given its total historical allocation.
    */
    function _vestingSchedule(uint totalAllocation, uint64 timestamp) internal view virtual returns(uint){
        if(timestamp < start()){
            return 0;
        }else if(timestamp >= end()){
            return totalAllocation;
        }else {
            return (totalAllocation * (timestamp - start())) / duration();
        }
    }

}