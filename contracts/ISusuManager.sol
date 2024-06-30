//SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

interface ISusuManager {
    function initialize(
        address susuGroupTableAddress,
        address susuWalletTableAddress,
        address susuContributionTableAddress,
        address initialOwner,
        address token,
        uint256 amountPerHead_,
        address[] memory _contributors
    ) external ;
}
