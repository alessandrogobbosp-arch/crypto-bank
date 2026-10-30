import { expect } from "chai";
import hre  from "hardhat";
const { ethers } = await hre.network.connect();

describe("CryptoBank", function () {
  let cryptoBank;
  let owner;
  let user;

  beforeEach(async function () {
	[owner, user] = await ethers.getSigners();

	const CryptoBank = await ethers.getContractFactory("CryptoBank");
	cryptoBank = await CryptoBank.deploy();
	await cryptoBank.waitForDeployment();
});

it("Dovrebbe permettere il deposit", async function () {
  const amount = ethers.parseEther("1.0");

 await cryptoBank.connect(user).deposit({ value:  amount  });

 const balance = await cryptoBank.balances(user.address);
 expect(balance).to.equal(amount);
});

it("Dovrebbe permettere il withdraw", async function () {
 const amount = ethers.parseEther("1.0");

 await cryptoBank.connect(user).deposit({ value:  amount  });
 await cryptoBank.connect(user).withdraw(amount);

 const balance = await cryptoBank.balances(user.address);
 expect(balance).to.equal(0);
});

it("Non dovrebbe permettere di prelevare più del saldo", async function () {
 const amount = ethers.parseEther("1.0");
 const tooMuch = ethers.parseEther("2.0");

 await cryptoBank.connect(user).deposit({ value:  amount  });

 await expect(
   cryptoBank.connect(user).withdraw(tooMuch)
).to.be.revertedWith("Saldo insufficiente");
});
});
