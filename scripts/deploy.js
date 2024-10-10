const { ethers } = require("hardhat");
const { verifyContract } = require("./verifyUtils");

const NAME = "SIX502";
const SYMBOL = "SIX";
const INITIALSUPPLY = 0;

async function deployContracts() {
    const [operator, bob, charlie, dave] = await ethers.getSigners();
    const SIX502Token = await ethers.getContractFactory("SIX502Token");
    const newOwnerAddress = "0x4e51Cb12EeB306F1fd1F6f469a7ff2d0D2645c31";

    // const SIX502TokenContract = await SIX502Token.deploy(NAME, SYMBOL, INITIALSUPPLY);
    // await SIX502TokenContract.waitForDeployment();
    // await SIX502TokenContract.transferOwnership(newOwnerAddress)


    const SIX502TokenContract = await SIX502Token.attach("0x62804a3d8f2727d9d007846c6144ecaef0C95771");

    const addressB = {
        erc20Address: SIX502TokenContract.target,
    };
    console.table(addressB);

    // Verify the contract three times (if necessary)
    for (let i = 0; i < 3; i++) {
        await verifyContract(SIX502TokenContract, [NAME, SYMBOL, INITIALSUPPLY]);
    }
}

deployContracts().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});