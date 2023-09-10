import { ethers } from "hardhat";

async function main() {
    const secondToken = await ethers.deployContract("DuoToken", []);
    await secondToken.waitForDeployment();

    console.log(`SecondSwapToken deployed to ${secondToken.target}`);
    // 0xCF5CD0144087419ec376Fc45F2984dc5D6C955AA - DuoToken Address
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
