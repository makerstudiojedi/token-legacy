//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import { Clones } from "@openzeppelin/contracts/proxy/Clones.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { LegacyImplementation } from "./LegacyImplementation.sol";

contract LegacyFactory is Ownable {
	address public implementationAddress;
	uint256 public fee;

	mapping(address => address) public userWill;

	event ImplementationUpdated(address oldImp, address newImp);
	event LegacyCreated(address indexed owner, address indexed legacy);
	event FeeSet(uint256 amount);

	// constructor() {
	// 	LegacyImplementation implementation = new LegacyImplementation();
	// 	implementation.initialize(msg.sender);
	// 	implementationAddress = address(implementation);
	// }

	function setImplementationAddress(address imp) public onlyOwner {
		address oldImp = implementationAddress;
		implementationAddress = imp;

		emit ImplementationUpdated(oldImp, imp);
	}

	function setFee(uint256 amount) public onlyOwner {
		fee = amount;

		emit FeeSet(amount);
	}

	function createLegacy() public payable returns (address) {
		require(
			userWill[msg.sender] == address(0),
			"You already have a will deployed"
		);

		if (fee > 0) {
			require(msg.value >= fee, "Not enough token sent for fees");
		}

		bytes memory data = abi.encodeWithSignature(
			"initialize(address)",
			msg.sender
		);

		address clone = Clones.cloneDeterministic(
			implementationAddress,
			keccak256(data)
		);
		(bool success, ) = clone.call(data);
		require(success, "Factory: Initialization failed");

		userWill[msg.sender] = clone;

		emit LegacyCreated(msg.sender, clone);

		return clone;
	}
}
