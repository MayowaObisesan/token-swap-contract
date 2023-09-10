import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      // url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      url: process.env.SEPOLIA_RPC,
      // @ts-ignore
      // accounts: [process.env.PRIVATE_KEY]
      accounts: [process.env.SEPOLIA_PRIVATE_KEY]
    },
    // base: {
    //   url: process.env.BASE_RPC,
    //   // @ts-ignore
    //   accounts: [process.env.PRIVATE_KEY]
    // }
  }
};

export default config;
