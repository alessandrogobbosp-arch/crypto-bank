import { network } from "hardhat";

async function main() {
 const { ethers } = await network.create();

 console.log("Deploying CryptoBank...");

const CryptoBank = await ethers.getContractFactory("CryptoBank");
const cryptoBank = await CryptoBank.deploy();

 await cryptoBank.waitForDeployment();

 const address = await cryptoBank.getAddress();
 console.log("CryptoBank deployed to:", address);

}

main().catch((error) => {
 console.error(error);
 process.exitCode = 1;
});


