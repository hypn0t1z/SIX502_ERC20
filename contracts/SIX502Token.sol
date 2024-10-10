// SPDX-License-Identifier: ISC
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SIX502Token is ERC20, Ownable {
    uint256 private immutable _maxSupply;
    event Mint(address indexed to, uint256 amount);

    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol) {
        _maxSupply = 500000000 * 10 ** decimals();
        require(initialSupply <= _maxSupply, "Initial supply exceeds max supply.");
        _mint(msg.sender, initialSupply);
    }

    function maxSupply() external view returns (uint256) {
        return _maxSupply;
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= _maxSupply, "Max supply exceeded.");
        _mint(to, amount);
        emit Mint(to, amount);
    }
}
