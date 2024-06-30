// SPDX-License-Identifier: MIT

/// @author Nartey Kodjo-Sarso <narteysarso@gmail.com>
pragma solidity >=0.8.15;

import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {SusuManager} from "./SusuManager.sol";
import {ISusuManager} from "./ISusuManager.sol";
import "hardhat/console.sol";

error ZeroAddress();


///@dev  Proxy factory
contract ProxyFactory is Initializable,PausableUpgradeable, OwnableUpgradeable {
    address public mastercopy;

    address internal constant SENTINEL_MANAGER = address(0x1);
    mapping(address => address) public susuManagers;
    address public groupTableAddress;
    address public susuWalletTableAddress;
    address public susuContributionsTableAddress;

    uint public manangerCount = 0;
    
    bool isInistialized;


    event GroupCreated(address indexed group);
    event MastercopyUpdated(address indexed oldMastercopy, address indexed newMastercopy);

    function initialize(address _mastercopy) initializer public {
        require(!isInistialized, "Already initialized");
        __Pausable_init();
        __Ownable_init(msg.sender);
        mastercopy = _mastercopy;
        isInistialized = true;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function updateMastercopy (address _mastercopy) external onlyOwner {
        if(_mastercopy == address(0)) revert ZeroAddress();

        address old = mastercopy;

        mastercopy = _mastercopy;

        emit MastercopyUpdated(old, _mastercopy);
    }

    function newGroupManager(address initialOwner_, address token_, uint256 amountPerHead_, address[] memory contributors_) external whenNotPaused returns (address group) {

        bytes memory bytecode = type(SusuManager).creationCode;
        bytes32 salt =  bytes32(manangerCount);
        assembly{
            group := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }

        susuManagers[SENTINEL_MANAGER] = group;
        susuManagers[group] = SENTINEL_MANAGER;

        ISusuManager(group).initialize(groupTableAddress, susuWalletTableAddress,susuContributionsTableAddress, initialOwner_, token_, amountPerHead_, contributors_);
        
        manangerCount++;

        console.log(group);

        emit GroupCreated(group);
    }
    

     /**
    * @dev Check if a given address is a contributor
    */
    function isManager(address _manager) external view returns(bool){
        return !(_manager == SENTINEL_MANAGER|| susuManagers[_manager] == address(0));
    }

    function setGroupTableAddress(address _groupTableAddress) external onlyOwner{
        groupTableAddress = _groupTableAddress;
    }

    function setWalletTableAddress(address _susuWalletTableAddress) external  onlyOwner{
        susuWalletTableAddress = _susuWalletTableAddress;
    }
    function setContributionTableAddress(address _contributionTableAddress) external  onlyOwner{
        susuContributionsTableAddress = _contributionTableAddress;
    }

    
}