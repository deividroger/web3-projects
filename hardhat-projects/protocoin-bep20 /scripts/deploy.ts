import { ethers } from "hardhat";

async function main() {
    const protocoin = await ethers.deployContract("ProtoCoin");
    await protocoin.waitForDeployment();

    console.log(`Contract deployed at ${protocoin.target}`);
}


main().catch((err)=>{
    console.log(err);
    process.exitCode = 1;
});