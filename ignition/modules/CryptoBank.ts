import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("CryptoBankModule", (m) => {
  const cryptoBank = m.contract("CryptoBank");

  return { cryptoBank };
});
