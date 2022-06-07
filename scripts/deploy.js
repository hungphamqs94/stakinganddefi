// This is a script for deploying your contracts. You can adapt it to deploy
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

    const addressDeployer =  await deployer.getAddress();
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const RenaToken = await ethers.getContractFactory("RenaToken");
    const renatoken = await RenaToken.deploy("RENA", "RENA", String(500e18), String(100e18), String(100e18), String(100e18));
    await renatoken.deployed();
  
    console.log("Token Rena address:", renatoken.address);
  
    // We also save the contract's artifacts and address in the frontend directory
    saveFrontendFiles(renatoken, "RenaToken");

    const JewelToken = await ethers.getContractFactory("JewelToken");
    const jeweltoken = await JewelToken.deploy("JEWEL", "JEWEL", String(500e18), String(100e18), String(100e18), String(100e18));
    await jeweltoken.deployed();
  
    console.log("Token Jewel address:", jeweltoken.address);
  
    // We also save the contract's artifacts and address in the frontend directory
    saveFrontendFiles(jeweltoken, "JewelToken");

    const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");
    const uniswapV2Factory = await UniswapV2Factory.deploy(String(addressDeployer));
    await uniswapV2Factory.deployed();


    let WETH = '0x2170ed0880ac9a755fd29b2688956bd959f933f8';
    const UniswapV2Router02 = await ethers.getContractFactory("UniswapV2Router02");
    const uniswapV2Router02 = await UniswapV2Router02.deploy(String(uniswapV2Factory.address), String(WETH));
    await uniswapV2Router02.deployed();
  
    console.log("UniswapV2Router02 address:", jeweltoken.address);
  
    // We also save the contract's artifacts and address in the frontend directory
    saveFrontendFiles(jeweltoken, "UniswapV2Router02");

  }
  
  function saveFrontendFiles(token, path) {
    const fs = require("fs");
    const contractsDir = __dirname + "/../frontend/src/contracts";
  
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }
  
    fs.writeFileSync(
      contractsDir + "/" + path +"-address.json",
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