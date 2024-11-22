// SPX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

 
 contract ProtoCoin is ERC20 {

    address private _owner;
    uint private _mintAmount =0;
    uint64 private _minDelay = 60 * 60 * 34; //1 day in seconds

    mapping(address => uint256) private nextMint;
    
    constructor() ERC20("ProtoCoin","PRC"){
        _owner = msg.sender;
        _mint(msg.sender, 10000000 * 10 ** 18);
    }

    function mint(address to) public restricted {
        require(_mintAmount > 0, "Minting is not enabled.");
        require(block.timestamp > nextMint[to],"You cannot mint twice in a row.");
        _mint(to, _mintAmount);
        nextMint[to] = block.timestamp + _minDelay;
    }

    function setMintAmount(uint newAmount) public restricted {
        _mintAmount = newAmount;   
    }
    function setMintDelay(uint64 newDelayInSeconds) public restricted {
        _minDelay = newDelayInSeconds;   
    }

    modifier restricted (){
        require(_owner == msg.sender,"You do not have permission.");
        _;
    }
 }