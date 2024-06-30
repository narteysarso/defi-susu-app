// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10 <0.9.0;

import {TablelandController} from "@tableland/evm/contracts/TablelandController.sol";
import {TablelandPolicy} from "@tableland/evm/contracts/TablelandPolicy.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Controller is TablelandController, Ownable {
    address public factoryAddress;

    constructor(address initialOwner, address _factoryAddress)
        Ownable(initialOwner)
    {
        factoryAddress = _factoryAddress;
    }

    function getPolicy(
        address caller,
        uint256
    ) public payable override returns (TablelandPolicy memory) {

        // (bool success, bytes memory returndata) = factoryAddress.call(abi.encodeWithSignature("isManager(address)",caller));
        // require(success, "Policy call failed");
        // require(abi.decode(returndata, (bool)), "Invalid caller");

        return
            TablelandPolicy({
                allowInsert: true,
                allowUpdate: false,
                allowDelete: false,
                whereClause: "",
                withCheck: "",
                updatableColumns: new string[](0)
            });
    }


    function setFactoryAddress(address _factoryAddress) public onlyOwner{
        factoryAddress = _factoryAddress;
    }
}