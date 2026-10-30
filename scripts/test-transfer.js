import { network } from "hardhat";
const { ethers } = await network.connect();

async function main() {
  const [owner, user1, user2] = await ethers.getSigners();
  console.log("Owner:", owner.address);
  console.log("User1:", user1.address);
  console.log("User2:", user2.address);

  const CryptoBank = await ethers.getContractFactory("CryptoBank");
  const cryptoBank = await CryptoBank.deploy();
  await cryptoBank.waitForDeployment();
  console.log("Contratto deployato a:", await cryptoBank.getAddress());

  // Deposit
  await cryptoBank.connect(user1).deposit({ value: ethers.parseEther("1.0") });
  console.log("Saldo user1 dopo deposit:", ethers.formatEther(await cryptoBank.getBalance(user1.address)));

  // Transfer
  await cryptoBank.connect(user1).transfer(user2.address, ethers.parseEther("0.3"));
  console.log("Saldo user1 dopo transfer:", ethers.formatEther(await cryptoBank.getBalance(user1.address)));
  console.log("Saldo user2 dopo transfer:", ethers.formatEther(await cryptoBank.getBalance(user2.address)));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
