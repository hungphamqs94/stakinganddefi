const chai = require("chai");
const expect = chai.expect;
const CalHash = artifacts.require("CalHash");

let calHash;

contract("CalHash", (accounts) => {
    describe("CalHash Smart Contract", function() {
        it("Create CalHash", async function() {
            calHash = await CalHash.new({from: accounts[0]});
            //console.log(`uniswapV2Factory :: gas used : ${calHash.receipt.gasUsed}`);
        })
        it("Init Hash", async function() {
            let hash = await calHash.getInitHash();
            console.log(`${JSON.stringify(hash)}`)
        })
    })
})