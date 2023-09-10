import { ethers } from "hardhat";

async function main() {
    const firstToken = await ethers.deployContract("UnoToken", []);
    await firstToken.waitForDeployment();

    console.log(`FirstSwapToken deployed to ${firstToken.target}`);
    // 0xA72ea6360E3402372ED7337A49ff7cCD072A35Ac - UnoToken Address
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
