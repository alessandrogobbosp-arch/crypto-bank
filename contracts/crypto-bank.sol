// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract CryptoBank is Ownable, ReentrancyGuard {
	mapping(address => uint256) public balances;

	event Deposit(address indexed user, uint256 amount);
	event Withdraw(address indexed user, uint256 amount);
	event Transfer(address indexed from, address indexed to, uint256 amount);

	constructor() Ownable(msg.sender) {}

	function deposit() external payable {
		require(msg.value > 0, "Devi depositare qualcosa");
		balances[msg.sender] += msg.value;
		emit Deposit(msg.sender, msg.value);
	}

	function withdraw(uint256 amount) external nonReentrant {
	require(balances[msg.sender] >= amount, "Saldo insufficiente");
	balances[msg.sender] -= amount;
	(bool success, ) = msg.sender.call{value: amount}("");
	require(success, "Trasferimento fallito");
	emit Withdraw(msg.sender, amount);
	}

	function transfer(address to, uint256 amount) external nonReentrant {
        require(balances[msg.sender] >= amount, "Saldo insufficiente");
	require(to != address(0), "Indirizzo non valido");

	balances[msg.sender] -= amount;
	balances[to] += amount;
	
	emit Transfer(msg.sender, to, amount);
	}

	function getBalance(address user) external view returns (uint256) {
		return balances[user];
	}
}
