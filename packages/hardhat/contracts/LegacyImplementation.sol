//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import { Initializable } from "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract LegacyImplementation is Initializable, ReentrancyGuard {
	address public owner;
	uint256 public deadline;
	uint256 public decimal = 100;

	mapping(bytes32 => uint256) public wills;
	mapping(address => uint256) public totalAllocations;
	mapping(address => uint256) public tokenBalance;

	event WillAdded(address indexed to, address token, uint256 percentage);
	event WillWithdrawn(address indexed to, address token, uint256 percentage);
	event ProofUpdated(uint256 proofDeadline);

	modifier onlyOwner() {
		require(msg.sender == owner, "You are not the owner of this legacy");
		_;
	}

	constructor() {
		_disableInitializers();
	}

	function initialize(address _owner) public initializer {
		require(_owner != address(0), "Can't burn a legacy");
		deadline = block.timestamp + 7 days;
		owner = _owner;
	}

	function registerProof(uint256 _deadline) public onlyOwner {
		deadline = _deadline;

		emit ProofUpdated(_deadline);
	}

	function willToken(
		address to,
		IERC20 token,
		uint256 percentage
	) public onlyOwner {
		require(to != address(0), "Can't transfer to zero address");
		require(percentage >= 0 && percentage <= decimal, "Invalid percentage");

		address tokenAddress = address(token);
		bytes32 willKey = keccak256(abi.encode(to, tokenAddress));
		uint256 _totalAllocations = totalAllocations[tokenAddress];

		uint256 currentWill = wills[willKey];

		require(
			currentWill <= _totalAllocations,
			"Current allocation is greater than total allocation"
		);

		uint256 newAllocation = _totalAllocations + percentage;
		require(newAllocation >= _totalAllocations, "Overflow detected");

		newAllocation -= currentWill;

		require(
			newAllocation >= 0 && newAllocation <= decimal,
			"Allocatable amount exceeded"
		);

		wills[willKey] = percentage;
		totalAllocations[tokenAddress] = newAllocation;

		emit WillAdded(to, tokenAddress, percentage);
	}

	function withdraw(IERC20 token) public nonReentrant {
		bytes32 willKey = keccak256(abi.encode(msg.sender, address(token)));
		uint256 myPercentage = wills[willKey];

		require(
			deadline <= block.timestamp,
			"This allocation is not unlocked yet"
		);
		require(myPercentage > 0, "This allocation is empty");

		wills[willKey] = 0;

		uint256 oldBalance = tokenBalance[address(token)];
		uint256 newBalance = token.balanceOf(owner);

		uint256 _balance = (newBalance >= oldBalance || oldBalance == 0)
			? newBalance
			: oldBalance;

		tokenBalance[address(token)] = _balance;

		uint256 allocationAmount = (_balance * myPercentage) / decimal;

		bool success = token.transferFrom(owner, msg.sender, allocationAmount);

		require(success, "Allocation withdrawal failed");

		emit WillWithdrawn(msg.sender, address(token), myPercentage);
	}

	function getTokenBalance(IERC20 token) public view returns (uint256) {
		uint256 oldBalance = tokenBalance[address(token)];
		uint256 newBalance = token.balanceOf(owner);

		return
			(newBalance >= oldBalance || oldBalance == 0)
				? newBalance
				: oldBalance;
	}

	function getTotalAllocation(IERC20 token) public view returns (uint256) {
		return totalAllocations[address(token)];
	}
}
