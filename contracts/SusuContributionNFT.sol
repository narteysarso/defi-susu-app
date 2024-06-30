// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SusuWalletNFT is ERC721, ERC721Pausable, Ownable {
    uint256 private _nextTokenId;
    address factoryAddress;

    constructor(address initialOwner, address _factoryAddress)
        ERC721("Susu Contribution Token", "SCT")
        Ownable(initialOwner)
    {
        factoryAddress = _factoryAddress;
    }

    modifier isMinterContract(){
        (bool isMinter, bytes memory returndata) = factoryAddress.call(abi.encodeWithSignature("isManager(address)",[msg.sender]));
        require(abi.decode(returndata, (bool)), "Invalid caller");
        _;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }

    function contractMint(address to) external isMinterContract {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }

    function setFactoryAddress(address _factoryAddress) public onlyOwner{
        factoryAddress = _factoryAddress;
    }

    // The following functions are overrides required by Solidity.

    function _baseURI() internal pure override(ERC721) returns (string memory) {
        return "https://";
    }

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Pausable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }
}
