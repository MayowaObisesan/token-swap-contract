import { ethers } from "hardhat";

async function main() {
    const firstTokenAddress = "0x79b90f2237304DfaA519Bfab5893eD541Aa49fF1";
    const secondTokenAddress = "0x2c2145782d2465600Dd81A44fDaD4E7393ac218a";

    const swapper = await ethers.deployContract("Swapper", []);
    await swapper.waitForDeployment();

    console.log(`Swapper deployed to ${swapper.target}`);
    // 0xbCD65a729d8a482460d835034Cb49ADa89F8E009 - Mainnet Swapper Contract Address

    const amountA = ethers.parseEther("1");
    const amountB = ethers.parseEther("2");
    // 0xEE98c1f90FF6a11cb215f18A2a0616E8E696fE4b - Localhost Swapper Contract Address

    // Approve the spender to spend an amount
    const tokenA = await ethers.getContractAt("UnoToken", firstTokenAddress);
    const [owner, spender] = await ethers.getSigners();

    // tokenA.approve(swapper.target, ethers.parseEther("5"));
    // tokenA.allowance(owner.address, swapper.target);
    // // tokenA.transfer(owner.address, ethers.parseEther("5"));

    // swapper.addLiquidity(ethers.parseEther("2"), ethers.parseEther("3"));

    const transaction = await owner.sendTransaction({
        to: "0xA72ea6360E3402372ED7337A49ff7cCD072A35Ac",
        value: ethers.parseEther("5")
    });
    console.log(transaction);

    console.log(await tokenA.balanceOf(owner.address));
    console.log(await tokenA.balanceOf(spender.address));

    const swapperAdd = await swapper.addLiquidity(amountA, amountB);
    console.log(swapperAdd);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
