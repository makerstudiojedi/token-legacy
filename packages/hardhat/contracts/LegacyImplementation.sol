//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import { Initializable } from "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract LegacyImplementation is Initializable, ReentrancyGuard {
	address public owner;
	uint256 public deadline;

	mapping(bytes32 => uint256) public wills;
	mapping(address => uint256) public totalAllocations;

	event ProofUpdated(uint256 proofDeadline);
	event WillAdded(address indexed to, address token, uint256 percentage);
	event WillWithdrawn(address indexed to, address token, uint256 percentage);

	modifier onlyOwner() {
		require(msg.sender == owner, "You are not the owner of this legacy");
		_;
	}

	constructor() {
		_disableInitializers();
	}

	function initialize(address _owner) public initializer {
		require(_owner != address(0), "Can't burn a legacy");
		owner = _owner;
	}

	function registerProof(uint256 _deadline) public onlyOwner {
		deadline = _deadline;

		emit ProofUpdated(_deadline);
	}

	function willToken(address to, IERC20 token, uint256 percentage) public {
		address tokenAddress = address(token);
		bytes32 willKey = keccak256(abi.encode(to, tokenAddress));

		uint256 currentWill = wills[willKey];
		uint256 newAllocation = totalAllocations[tokenAddress] -
			currentWill +
			percentage;

		require(newAllocation <= 100, "Allocatable amount exceeded");

		wills[willKey] = percentage;
		totalAllocations[tokenAddress] = newAllocation;

		emit WillAdded(to, tokenAddress, percentage);
	}

	function withdraw(IERC20 token) public nonReentrant {
		bytes32 willKey = keccak256(abi.encode(msg.sender, address(token)));
		uint256 myPercentage = wills[willKey];

		require(
			deadline >= block.timestamp,
			"This allocation is not unlocked yet"
		);
		require(myPercentage > 0, "This allocation is empty");

		wills[willKey] = 0;

		uint256 allocationAmount = token.balanceOf(owner) *
			(myPercentage / 100);

		token.transferFrom(owner, msg.sender, allocationAmount);

		emit WillWithdrawn(msg.sender, address(token), myPercentage);
	}

	function getTotalAllocation(IERC20 token) public view returns (uint256) {
		return totalAllocations[address(token)];
	}
}
