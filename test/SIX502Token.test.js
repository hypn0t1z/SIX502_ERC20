const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SIX502Token", function() {
    let SIX502Token;
    let token;
    let owner;
    let addr1;
    let addr2;

    const initialSupply = ethers.parseUnits('1000000', 18); // 1,000,000 tokens
    const maxSupply = ethers.parseUnits('500000000', 18); // 500,000,000 tokens

    beforeEach(async function() {
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        SIX502Token = await ethers.getContractFactory("SIX502Token");
        token = await SIX502Token.deploy("SIX502Token", "SIX502", initialSupply);
        await token.waitForDeployment();
    });

    it("Should have correct initial supply and max supply", async function() {
        expect(await token.totalSupply()).to.equal(initialSupply);
        expect(await token.maxSupply()).to.equal(maxSupply);
    });

    it("Should mint tokens correctly", async function() {
        const mintAmount = ethers.parseUnits('1000', 18); // 1,000 tokens
        await token.mint(addr1.address, mintAmount);
        const totalSupply = await token.totalSupply();
        const expectedSupply = initialSupply + mintAmount;
        expect(totalSupply).to.equal(expectedSupply);
        expect(await token.balanceOf(addr1.address)).to.equal(mintAmount);
    });

    it("Should not mint tokens exceeding max supply", async function() {
        const exceedAmount = (maxSupply - initialSupply) + ethers.parseUnits('1', 18); // 1 token more than max supply
        await expect(token.mint(addr1.address, exceedAmount)).to.be.revertedWith("Max supply exceeded");
    });

    it("Should only allow owner to mint tokens", async function() {
        const mintAmount = ethers.parseUnits('1000', 18); // 1,000 tokens
        await expect(token.connect(addr1).mint(addr1.address, mintAmount)).to.be.revertedWith("Ownable: caller is not the owner");
    });
});