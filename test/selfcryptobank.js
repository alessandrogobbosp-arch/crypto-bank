import { expect } from "chai";
import { network } from "hardhat";

describe("CryptoBank", function () {
  let cryptoBank;
  let owner, user1, user2;
  let ethers;

  beforeEach(async function () {
    const connection = await network.create();
    ethers = connection.ethers;
    [owner, user1, user2] = await ethers.getSigners();

    const CryptoBank = await ethers.getContractFactory("CryptoBank");
    cryptoBank = await CryptoBank.deploy();
    await cryptoBank.waitForDeployment();
  });

  it("Dovrebbe permettere il deposito e emettere evento", async function () {
    await expect(
      cryptoBank.connect(user1).deposit({ value: ethers.parseEther("1.0") })
    )
      .to.emit(cryptoBank, "Deposit")
      .withArgs(user1.address, ethers.parseEther("1.0"));

    expect(await cryptoBank.getBalance(user1.address)).to.equal(ethers.parseEther("1.0"));
  });

  it("Dovrebbe permettere il prelievo e emettere evento", async function () {
    await cryptoBank.connect(user1).deposit({ value: ethers.parseEther("1.0") });

    await expect(
      cryptoBank.connect(user1).withdraw(ethers.parseEther("0.5"))
    )
      .to.emit(cryptoBank, "Withdraw")
      .withArgs(user1.address, ethers.parseEther("0.5"));

    expect(await cryptoBank.getBalance(user1.address)).to.equal(ethers.parseEther("0.5"));
  });

  it("Dovrebbe permettere il transfer e emettere evento", async function () {
    await cryptoBank.connect(user1).deposit({ value: ethers.parseEther("1.0") });

    await expect(
      cryptoBank.connect(user1).transfer(user2.address, ethers.parseEther("0.3"))
    )
      .to.emit(cryptoBank, "Transfer")
      .withArgs(user1.address, user2.address, ethers.parseEther("0.3"));

    expect(await cryptoBank.getBalance(user1.address)).to.equal(ethers.parseEther("0.7"));
    expect(await cryptoBank.getBalance(user2.address)).to.equal(ethers.parseEther("0.3"));
  });

  it("Dovrebbe fallire il prelievo se il saldo è insufficiente", async function () {
    await expect(
      cryptoBank.connect(user1).withdraw(ethers.parseEther("1.0"))
    ).to.be.revertedWith("Saldo insufficiente");
  });
});
