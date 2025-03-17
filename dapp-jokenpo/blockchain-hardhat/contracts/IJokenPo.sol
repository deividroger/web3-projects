// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./JKPLibrary.sol";

interface IJokenPo {
    
    function getResult() external view returns(string memory);

    function getBid() external view returns(uint256);

    function setBid(uint256 newBid) external;

    function getCommission() external view returns(uint256);

    function setComission(uint8 newComission) external;

    function getBalance() external view returns (uint256);

    function play(JKPLibrary.Options newChoice) external payable returns(string  memory);

    function getLeaderboard() external view returns (JKPLibrary.Player[] memory);
}