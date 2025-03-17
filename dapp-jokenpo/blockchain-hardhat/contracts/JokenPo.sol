// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./IJokenPo.sol";
import "./JKPLibrary.sol";


contract JokenPo is IJokenPo{
    
    address payable private immutable owner;

    JKPLibrary.Options private choice1 = JKPLibrary.Options.NONE;

    address private player1;
    string private result;
    uint256 private bid = 0.01 ether;
    uint8 private commission = 10;

    JKPLibrary.Player[] players;

    constructor() {
        owner = payable(msg.sender);
    }

    function getResult() external view returns(string memory){
        return result;
    }

    function getBid() external view returns(uint256) {
        return bid;
    }

    function setBid(uint256 newBid) external {
        require(tx.origin == owner,"You do not have permission");
        require(player1 == address(0), "You cannot change the bid with a game in progress");
        bid = newBid;
    }

    function getCommission() external view returns(uint256) {
        return commission;
    }

    function setComission(uint8 newComission) external {
        require(tx.origin == owner,"You do not have permission");
        require(player1 == address(0), "You cannot change the comission with a game in progress");
        commission = newComission;
    }


    function getBalance() external view returns (uint256) {
        require(owner == tx.origin, "You don't have permnission to do this");

        return address(this).balance;
    }

    function updateWinner(address winner) private {
        for (uint256 i = 0; i < players.length; i++) {
            if (players[i].wallet == winner) {
                players[i].wins++;
            }
        }
        players.push(JKPLibrary.Player(winner, 1));
    }

    function finishGame(string memory newResult, address winner) private {
        address contractAddress = address(this);

        payable(winner).transfer((contractAddress.balance / 100) * (100 - commission)); 

        owner.transfer(contractAddress.balance);

        result = newResult;
        player1 = address(0);
        choice1 = JKPLibrary.Options.NONE;

        updateWinner(winner);
    }

    function play(JKPLibrary.Options newChoice) external payable returns(string memory) {
        require(tx.origin != owner, "The owner cannot play");
        require(newChoice != JKPLibrary.Options.NONE, "Invalid choice");
        require(player1 != tx.origin, "Wait the another player");
        require(msg.value >= bid, "Invalid bid");

        if (choice1 == JKPLibrary.Options.NONE) {
            player1 = tx.origin;
            choice1 = newChoice;
            result = "Player 1 choose his/her option. Waiting player 2.";
        } else if (choice1 == JKPLibrary.Options.ROCK && newChoice == JKPLibrary.Options.SCISSORS) {
            finishGame("Rock breaks scissors. Player 1 won", player1);
        } else if (choice1 == JKPLibrary.Options.PAPER && newChoice == JKPLibrary.Options.ROCK) {
            finishGame("Paper wraps rock. Player 1 won", player1);
        } else if (choice1 == JKPLibrary.Options.SCISSORS && newChoice == JKPLibrary.Options.PAPER) {
            finishGame("Scissors cuts paper. Player 1 won", player1);
        } else if (choice1 == JKPLibrary.Options.SCISSORS && newChoice == JKPLibrary.Options.ROCK) {
            finishGame("Rock breaks scissors. Player 2 won", tx.origin);
        } else if (choice1 == JKPLibrary.Options.ROCK && newChoice == JKPLibrary.Options.PAPER) {
            finishGame("Paper wraps rock. Player 2 won", tx.origin);
        } else if (choice1 == JKPLibrary.Options.PAPER && newChoice == JKPLibrary.Options.SCISSORS) {
            finishGame("Scissors cuts paper. Player 2 won", tx.origin);
        } else {
            result = "Draw game. THe prize as doubled.";
            player1 = address(0);
            choice1 = JKPLibrary.Options.NONE;
        }

        return result;
    }

    function getLeaderboard() external view returns (JKPLibrary.Player[] memory) {
        if (players.length < 2) return players;

        JKPLibrary.Player[] memory arr = new JKPLibrary.Player[](players.length);

        for (uint i = 0; i < players.length; i++) {
            arr[i] = players[i];
        }

        for (uint i = 0; i < arr.length - 1; i++) {
            for (uint j = 1; j < arr.length; j++) {
                if (arr[i].wins < arr[j].wins) {
                    JKPLibrary.Player memory change = arr[i];
                    arr[i] = arr[j];
                    arr[j] = change;
                }
            }
        }

        return arr;
    }
}