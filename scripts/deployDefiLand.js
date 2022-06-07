// This is a script for deploying your contracts. You can adapt it to deploy

const { ethers } = require("hardhat");

// yours, or create new ones.
async function main() {
    // This is just a convenience check
    if (network.name === "hardhat") {
        console.warn(
            "You are trying to deploy a contract to the Hardhat Network, which" +
                "gets automatically created and destroyed every time. Use the Hardhat" +
                " option '--network localhost'"
        );
    }

    // ethers is avaialble in the global scope
    const [deployer] = await ethers.getSigners();
    console.log(
        "Deploying the contracts with the account:",
        await deployer.getAddress()
    );

    const addressDeployer = await deployer.getAddress();

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const RenaToken = await ethers.getContractFactory("RenaToken");
    const renatoken = await RenaToken.deploy(
        "RENA",
        "RENA",
        String(500e18),
        String(100e18),
        String(100e18),
        String(100e18)
    );
    await renatoken.deployed();

    console.log("Token Rena address:", renatoken.address);

    // We also save the contract's artifacts and address in the frontend directory
    saveFrontendFiles(renatoken, "RenaToken");

    const UniswapV2Factory = await ethers.getContractFactory(
        "UniswapV2Factory"
    );
    const uniswapV2Factory = await UniswapV2Factory.deploy(
        String(addressDeployer)
    );
    await uniswapV2Factory.deployed();
    console.log("UniswapV2Router02 address:", uniswapV2Factory.address);
    saveFrontendFiles(uniswapV2Factory.address, "UniswapV2Factory");

    let WETH = "0x3665D747ef3B552306Ff4B33831D7B527a2A3a42";
    const UniswapV2Router02 = await ethers.getContractFactory(
        "UniswapV2Router02"
    );
    const uniswapV2Router02 = await UniswapV2Router02.deploy(
        String(uniswapV2Factory.address),
        String(WETH)
    );
    await uniswapV2Router02.deployed();
    console.log("UniswapV2Router02 address:", uniswapV2Router02.address);
    // We also save the contract's artifacts and address in the frontend directory
    saveFrontendFiles(uniswapV2Router02, "UniswapV2Router02");

    // Air drop
    const Airdrop = await ethers.getContractFactory("Airdrop");
    const airdrop = await Airdrop.deploy(String(renatoken.address));
    await airdrop.deployed();
    console.log("Airdrop address:", airdrop.address);
    saveFrontendFiles(airdrop, "Airdrop");

    // Air drop claim
    const AirdropClaim = await ethers.getContractFactory("AirdropClaim");
    const airdropClaim = await AirdropClaim.deploy(String(renatoken.address));
    await airdropClaim.deployed();
    console.log("AirdropClaim address:", airdropClaim.address);
    saveFrontendFiles(airdropClaim, "AirdropClaim");

    // Air drop claim
    const Authorizable = await ethers.getContractFactory("Authorizable");
    const authorizable = await Authorizable.deploy();
    await authorizable.deployed();
    console.log("Authorizable address:", authorizable.address);
    saveFrontendFiles(authorizable, "Authorizable");

    // Bank
    const Bank = await ethers.getContractFactory("Bank");
    const bank = await Bank.deploy(
        "WarenaDefiBank",
        "WDB",
        String(renatoken.address)
    );
    await bank.deployed();
    console.log("Bank address:", bank.address);
    saveFrontendFiles(bank, "Bank");

    // Banker
    const Banker = await ethers.getContractFactory("Banker");
    const banker = await Banker.deploy(
        String(uniswapV2Factory.address),
        String(bank.address),
        String(renatoken.address),
        String(WETH)
    );
    await banker.deployed();
    console.log("Banker address:", banker.address);
    saveFrontendFiles(banker, "Banker");

    // Mater Gardener
    let _rewardMultiplier = [20, 30, 40, 50, 60, 70, 80, 90];
    const MasterGardener = await ethers.getContractFactory("MasterGardener");
    const masterGardener = await MasterGardener.deploy(
        String(renatoken.address),
        1,
        _rewardMultiplier
    );
    await masterGardener.deployed();
    console.log("MasterGardener address:", masterGardener.address);
    saveFrontendFiles(masterGardener, "MasterGardener");

    // // Ownable
    // const Ownable = await ethers.getContractFactory("Ownable");
    // const ownable = await Ownable.deploy();
    // await ownable.deployed();
    // console.log("Ownable contract address", ownable.address);

    // Multicall
    const Multicall = await ethers.getContractFactory("Multicall");
    const multicall = await Multicall.deploy();
    await multicall.deployed();
    console.log("Multicall contract address", multicall.address);
    saveFrontendFiles(multicall, "Multicall");
}

function saveFrontendFiles(token, path) {
    const fs = require("fs");
    const contractsDir = __dirname + "/../frontend/src/contracts";

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(
        contractsDir + "/" + path + "-address.json",
        JSON.stringify({ Token: token.address }, undefined, 2)
    );

    const TokenArtifact = artifacts.readArtifactSync(path);

    fs.writeFileSync(
        contractsDir + "/" + path + ".json",
        JSON.stringify(TokenArtifact, null, 2)
    );
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
