// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract FractionalNft is ERC721 {
    using Counters for Counters.Counter;

    struct tokenFractionCustomer {
        address walletAddress;
        uint256 tokenId;
        uint256 tokenFractions;
    }

    Counters.Counter private _idCounter;    
    mapping(uint256 => uint256) public tokenDNA;
    mapping(uint256 => uint256) public tokenFractionAvailable;
    mapping(address => tokenFractionCustomer) public tokenFractionsOwner;

    constructor() ERC721("Bire", "BR") {}

    function mint(uint256 _name) public {
        uint256 current = _idCounter.current(); 
        tokenDNA[current] = _name;
        tokenFractionAvailable[current] = 0;
        _safeMint(msg.sender, current);
        _idCounter.increment();
    }

    function fractionate(uint256 _tokenId, uint256 _slices) public returns (uint256 ) {
        tokenFractionAvailable[_tokenId] = _slices;
		return tokenFractionAvailable[_tokenId];
    }

    function buyFractions(uint256 _tokenId,uint256 _fractions) public {
        tokenFractionsOwner[msg.sender] = tokenFractionCustomer(msg.sender,_tokenId,_fractions);
        tokenFractionAvailable[_tokenId] = tokenFractionAvailable[_tokenId] - _fractions;
    }

    function sellFractions(uint256 _tokenId,uint256 _fractions) public {
        tokenFractionsOwner[msg.sender] = tokenFractionCustomer(msg.sender,_tokenId,(tokenFractionsOwner[msg.sender].tokenFractions - _fractions));
        tokenFractionAvailable[_tokenId] = tokenFractionAvailable[_tokenId] + _fractions;
    }

}