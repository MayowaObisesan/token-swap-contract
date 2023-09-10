import { ethers } from "hardhat";

async function main() {
    const secondToken = await ethers.deployContract("DuoToken", []);
    await secondToken.waitForDeployment();

    console.log(`SecondSwapToken deployed to ${secondToken.target}`);
    // 0x2c2145782d2465600Dd81A44fDaD4E7393ac218a - DuoToken Address
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
