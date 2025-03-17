import {
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  

  import { expect } from "chai";
  import hre, { ethers } from "hardhat";
  
  describe("JKPAdapter tests", function () {
  
    enum Options {
      NONE,
      ROCK,
      PAPER,
      SCISSORS
    }
    const DEFAULT_BID = ethers.parseEther("0.01");
    const DEFAULT_COMMISION = 10n;
  
    async function deployFixture() {
  
      const [owner, player1, player2] = await hre.ethers.getSigners();
  
      const Jokenpo = await hre.ethers.getContractFactory("JokenPo");
      const jokenpo = await Jokenpo.deploy();

      const JKPAdapter = await hre.ethers.getContractFactory("JKPAdapter");
      const jkpAdapter = await JKPAdapter.deploy();
  
      return { jokenpo,jkpAdapter, owner, player1,player2 };
    }


    it("Should get Implementation address", async function () {
        const { jokenpo, jkpAdapter, owner, player1, player2 } = await loadFixture(deployFixture);
  
        const address = await jokenpo.getAddress();

        await jkpAdapter.upgrade(jokenpo);
  
        const implementationAddress = await jkpAdapter.getImplementationAddress();
  
  
        expect(address).to.equal(implementationAddress);
        
    });

    it("Should get bid", async function () {
        const { jokenpo, jkpAdapter, owner, player1, player2 } = await loadFixture(deployFixture);

        await jkpAdapter.upgrade(jokenpo);
  
        const bid = await jkpAdapter.getBid();
  
        expect(bid).to.equal(DEFAULT_BID);
        
    });

    it("Should not get bid", async function () {
        const { jokenpo, jkpAdapter, owner, player1, player2 } = await loadFixture(deployFixture);
  
        await expect(jkpAdapter.getBid()).to.revertedWith("You must upgrade first");
        
    });


    it("Should get commision", async function () {
        const { jokenpo, jkpAdapter, owner, player1, player2 } = await loadFixture(deployFixture);

        await jkpAdapter.upgrade(jokenpo);
  
        const comission = await jkpAdapter.getCommission();
  
        expect(comission).to.equal(DEFAULT_COMMISION);
        
    });

    it("Should not get comission (upgrade)", async function () {
        const { jokenpo, jkpAdapter, owner, player1, player2 } = await loadFixture(deployFixture);
  
        await expect(jkpAdapter.getCommission()).to.revertedWith("You must upgrade first");
        
    });

    it("Should not upgrade (permission)", async function () {
        const { jokenpo, jkpAdapter, owner, player1, player2 } = await loadFixture(deployFixture);
        

        const instance = jkpAdapter.connect(player1);

        await expect(instance.upgrade(jokenpo)).to.revertedWith("You do not have permission");
        
    });


    it("Should not upgrade (address)", async function () {
        const { jokenpo, jkpAdapter, owner, player1, player2 } = await loadFixture(deployFixture);
    
        await expect(jkpAdapter.upgrade(ethers.ZeroAddress)).to.revertedWith("The address is required");
        
    });

    it("should play alone by adapter", async function(){
        const { jokenpo, jkpAdapter, owner, player1, player2 } = await loadFixture(deployFixture);

        await jkpAdapter.upgrade(jokenpo);
  
        const instance = jkpAdapter.connect(player1);

        
        await instance.play(Options.PAPER, { value: DEFAULT_BID});

        const result = await instance.getResult();
  
        expect(result).to.equal("Player 1 choose his/her option. Waiting player 2.");
    });


    it("should play along by adapter", async function(){
        const { jokenpo, jkpAdapter, owner, player1, player2 } = await loadFixture(deployFixture);

        await jkpAdapter.upgrade(jokenpo);
  
        const instancePlayer1 = jkpAdapter.connect(player1);

        await instancePlayer1.play(Options.PAPER, { value: DEFAULT_BID});


        const instancePlayer2 = jkpAdapter.connect(player2);

        await instancePlayer2.play(Options.ROCK, { value: DEFAULT_BID});


        const result = await jkpAdapter.getResult();
  
        expect(result).to.equal("Paper wraps rock. Player 1 won");
    });
  
  });
  