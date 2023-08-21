//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor(string memory _name, string memory _symbol, address to) ERC20(_name, _symbol) {
        _mint(to == address(0) ? msg.sender : to, 150 ether);
    }

    function mintTo(address user, uint256 amount) public {
      	_mint(user, amount);
    }
}