import { ethers } from "hardhat";

async function main() {
    const firstToken = await ethers.deployContract("UnoToken", []);
    await firstToken.waitForDeployment();

    console.log(`FirstSwapToken deployed to ${firstToken.target}`);
    // 0x79b90f2237304DfaA519Bfab5893eD541Aa49fF1 - UnoToken Address
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
