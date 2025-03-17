import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";

import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("JokenPo tests", function () {

  enum Options {
    NONE,
    ROCK,
    PAPER,
    SCISSORS
  }
  const DEFAULT_BID = ethers.parseEther("0.01");

  async function deployFixture() {

    // Contracts are deployed using the first signer/account by default
    const [owner, player1, player2] = await hre.ethers.getSigners();

    const Jokenpo = await hre.ethers.getContractFactory("JokenPo");
    const jokenpo = await Jokenpo.deploy();

    return { jokenpo, owner, player1,player2 };
  }

    it("Should get leaderboard", async function () {
      const { jokenpo, owner, player1, player2 } = await loadFixture(deployFixture);

      const player1Instance = jokenpo.connect(player1);
      await player1Instance.play(Options.PAPER, {value: DEFAULT_BID});

      const player2Instance = jokenpo.connect(player2);
      await player2Instance.play(Options.ROCK, {value: DEFAULT_BID});

      const leaderboard = await jokenpo.getLeaderboard();

      expect(leaderboard[0].wallet).equal(player1.address);
      expect(leaderboard[0].wins).equal(1);

      expect(leaderboard.length).equal(1);
    });

    it("Should set bid", async function () {
      const { jokenpo, owner, player1, player2 } = await loadFixture(deployFixture);

      const newBid = ethers.parseEther("0.02");

      await jokenpo.setBid(newBid);

      const updatedBid = await jokenpo.getBid();

      expect(updatedBid).equal(newBid);
      
    });

    it("Should not set bid", async function () {
      const { jokenpo, owner, player1, player2 } = await loadFixture(deployFixture);

      const newBid = ethers.parseEther("0.02");

      const instance = jokenpo.connect(player1);

      await expect( instance.setBid(newBid)).to.be.revertedWith("You do not have permission");
     
    });

    it("Should not set bid (game in progress)", async function () {
      const { jokenpo, owner, player1, player2 } = await loadFixture(deployFixture);

      const newBid = ethers.parseEther("0.02");

      const instance = jokenpo.connect(player1);

      await instance.play(Options.PAPER, {value: DEFAULT_BID});
      
      await expect( jokenpo.setBid(newBid)).to.be.revertedWith("You cannot change the bid with a game in progress");
     
    });

    it("Should set commision", async function () {
      const { jokenpo, owner, player1, player2 } = await loadFixture(deployFixture);

      const newCommission = 11n;

      await jokenpo.setComission(newCommission);

      const updatedCommission = await jokenpo.getCommission();

      expect(updatedCommission).equal(newCommission);
      
    });

    it("Should not set commision", async function () {
      const { jokenpo, owner, player1, player2 } = await loadFixture(deployFixture);

      const newCommission = 11n;

      const instancePlayer1 = jokenpo.connect(player1);

      await expect( instancePlayer1.setComission(newCommission)).to.be.revertedWith("You do not have permission");
      
    });

    it("Should not set commision (game in progress)", async function () {
      const { jokenpo, owner, player1, player2 } = await loadFixture(deployFixture);

      const instance = jokenpo.connect(player1);

      await instance.play(Options.PAPER, {value: DEFAULT_BID});
      
      await expect( jokenpo.setComission(11n)).to.be.revertedWith("You cannot change the comission with a game in progress");
      
    });

    it("Should play alone", async function () {
      const { jokenpo, owner, player1, player2 } = await loadFixture(deployFixture);

      const player1Instance = jokenpo.connect(player1);
      await player1Instance.play(Options.PAPER, {value: DEFAULT_BID});

      const result = await jokenpo.getResult();

      expect(result).equals("Player 1 choose his/her option. Waiting player 2.");

    });

    it("Should play along", async function () {
      const { jokenpo, owner, player1, player2 } = await loadFixture(deployFixture);

      const player1Instance = jokenpo.connect(player1);
      await player1Instance.play(Options.PAPER, {value: DEFAULT_BID});

      const player2Instance = jokenpo.connect(player2);
      await player2Instance.play(Options.ROCK, {value: DEFAULT_BID});

      const result = await jokenpo.getResult();

      expect(result).equals("Paper wraps rock. Player 1 won");
      
    });

    it("Should not play alone (owner)", async function () {
      const { jokenpo, owner, player1, player2 } = await loadFixture(deployFixture);

      await expect( jokenpo.play(Options.PAPER, {value: DEFAULT_BID})).to.be.revertedWith("The owner cannot play");
     
    });
    
    it("Should not play (invalid option)", async function () {
      const { jokenpo, owner, player1, player2 } = await loadFixture(deployFixture);

      const player1Instance = jokenpo.connect(player1);

      await expect( player1Instance.play(Options.NONE, {value: DEFAULT_BID})).to.be.revertedWith("Invalid choice");
     
    });

    it("Should not play (twice in a roll)", async function () {
      const { jokenpo, owner, player1, player2 } = await loadFixture(deployFixture);

      const player1Instance = jokenpo.connect(player1);

      await player1Instance.play(Options.ROCK, {value: DEFAULT_BID}); 

      await expect( player1Instance.play(Options.SCISSORS, {value: DEFAULT_BID})).to.be.revertedWith("Wait the another player");
     
    });

    it("Should not play (wrong bid)", async function () {
      const { jokenpo, owner, player1, player2 } = await loadFixture(deployFixture);

      const player1Instance = jokenpo.connect(player1);

      await expect( player1Instance.play(Options.SCISSORS, {value: 1n})).to.be.revertedWith("Invalid bid");
     
    });

});
