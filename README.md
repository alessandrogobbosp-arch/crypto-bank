 HEAD
# CryptoBank

Un semplice smart contract bancario scritto in Solidity. Permette di depositare, prelevare e trasferire ETH.

## Funzionalità

- **Deposit**: Deposita ETH nel contratto
- **Withdraw**: Preleva ETH dal proprio saldo (protetto da reentrancy)
- **Transfer**: Trasferisci ETH a un altro utente
- **Eventi**: `Deposit`, `Withdraw`, `Transfer`

## Tecnologie

- Solidity 0.8.24
- Hardhat
- OpenZeppelin Contracts (`Ownable`, `ReentrancyGuard`)
- JavaScript

## Setup

```bash
npm install

# crypto-bank
Simple decentralized bank smart contract (Solidity + Hardhat)

## Deployed Contracts

### Sepolia
- **CryptoBank**: `0x466fB6BDc862F55ad11bb554e72eBe935Ac0d3bf`
  - [View on Etherscan](https://sepolia.etherscan.io/address/0x466fB6BDc862F55ad11bb554e72eBe935Ac0d3bf)
