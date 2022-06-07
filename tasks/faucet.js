
const fs = require("fs");

// This file is only here to make interacting with the Dapp easier,
// feel free to ignore it if you don't need it.

task("faucet", "Sends ETH and tokens to an address")
  .addPositionalParam("receiver", "The address that will receive them")
  .setAction(async ({ receiver }) => {
    if (network.name === "hardhat") {
      console.warn(
        "You are running the faucet task with Hardhat network, which" +
          "gets automatically created and destroyed every time. Use the Hardhat" +
          " option '--network localhost'"
      );
    }

    const RenaAddressesFile =
      __dirname + "/../frontend/src/contracts/RenaToken.json";
    
    const JewelAddressesFile =
      __dirname + "/../frontend/src/contracts/JewelToken.json";

    const UniswapV2Factory = 
      __dirname + "/../frontend/src/contracts/UniswapV2Factory.json";

    const UniswapV2Router02 = 
      __dirname + "/../frontend/src/contracts/UniswapV2Router02.json";

    if (!fs.existsSync(RenaAddressesFile)) {
      console.error("You need to deploy your contract first");
      return;
    }

    if (!fs.existsSync(JewelAddressesFile)) {
        console.error("You need to deploy your contract first");
        return;
    }

    if (!fs.existsSync(UniswapV2Factory)) {
        console.error("You need to deploy your contract first");
        return;
    }

    if (!fs.existsSync(UniswapV2Router02)) {
        console.error("You need to deploy your contract first");
        return;
    }


    const addressRenaJson = fs.readFileSync(RenaAddressesFile);
    const RenaAddress = JSON.parse(addressRenaJson);

    const addressJewelJson = fs.readFileSync(JewelAddressesFile);
    const JewelAddress = JSON.parse(addressJewelJson);

    const addressFactoryJson = fs.readFileSync(UniswapV2Factory);
    const factoryAddress = JSON.parse(addressFactoryJson);

    const addressRouterJson = fs.readFileSync(UniswapV2Router02);
    const routerAddress = JSON.parse(addressRouterJson);

    if ((await ethers.provider.getCode(RenaAddress.Token)) === "0x") {
      console.error("You need to deploy your contract first");
      return;
    }

    if ((await ethers.provider.getCode(JewelAddress.Token)) === "0x") {
        console.error("You need to deploy your contract first");
        return;
    }

    if ((await ethers.provider.getCode(factoryAddress.Token)) === "0x") {
        console.error("You need to deploy your contract first");
        return;
    }

    if ((await ethers.provider.getCode(routerAddress.Token)) === "0x") {
        console.error("You need to deploy your contract first");
        return;
    }

    const renatoken = await ethers.getContractAt("RenaToken", RenaAddress.Token);
    const jeweltoken = await ethers.getContractAt("JewelToken", JewelAddress.Token);
    const factorytoken = await ethers.getContractAt("UniswapV2Factory", factoryAddress.Token);
    const routertoken = await ethers.getContractAt("UniswapV2Router02", routerAddress.Token);
    const [sender] = await ethers.getSigners();


    console.log(`Transferred 1 ETH and 100 tokens to ${receiver}`);
  });
