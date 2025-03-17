// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./IJokenPo.sol";
import "./JKPLibrary.sol";

contract JKPAdapter {
    IJokenPo private jokenPo;
    address public immutable owner;

    event Played(address indexed player, string result);

    constructor() {
        owner = msg.sender;
    }

    function getImplementationAddress() external view returns (address) {
        return address(jokenPo);
    }

    function getResult() external view upgraded returns (string memory) {
        return jokenPo.getResult();
    }

    function getBid() external view upgraded returns (uint256) {
        return jokenPo.getBid();
    }

    function setBid(uint256 newBid) external upgraded restricted {
        jokenPo.setBid(newBid);
    }

    function getCommission() external view  upgraded returns (uint256) {
        return jokenPo.getCommission();
    }

    function setComission(uint8 newComission) external upgraded restricted {
        jokenPo.setComission(newComission);
    }

    function getBalance() external view upgraded returns (uint256) {
        return jokenPo.getBalance();
    }

    function play(JKPLibrary.Options newChoice) external payable upgraded {
        string memory result = jokenPo.play{value: msg.value}(newChoice);
        emit Played(msg.sender, result);
    }


    function getLeaderboard() external view  upgraded returns (JKPLibrary.Player[] memory)  {
        return jokenPo.getLeaderboard();
    }

    function upgrade(address newImplementation) restricted external {
        require(msg.sender == owner, "You do not have permission");
        require(
            newImplementation != address(0),
            "The address is required"
        );

        jokenPo = IJokenPo(newImplementation);
    }

    modifier restricted() {
        require(owner == msg.sender, "You do not have permission");
        _;
    }

    modifier upgraded() {
        require(address(jokenPo) != address(0), "You must upgrade first");
        _;
    }
}
