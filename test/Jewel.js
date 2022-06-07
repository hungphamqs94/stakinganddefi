const chai = require("chai");
const expect = chai.expect;
const JewelToken = artifacts.require("JewelToken");

let Jewel;
let creator;

contract("JewelToken", (accounts) => {
    describe("Deploy Jewel Token", function () {
        it("Create Jewel Token Smart Contract", async function() {
            creator = accounts[0];
            var _name = "Jewel";
            var _symbol = "JEWEL";
            Jewel = await JewelToken.new(_name, _symbol, String(500e18), String(500e18), String(10e18), String(10e18), {from: creator});
            console.log("contract",Jewel.address);
        })
    })
    describe("Update Cap and Mint Jewel Token For Account", function () {
        it("Update Cap Jewel Token", async function() {
            let newCap = await Jewel.capUpdate(String(500e18), {from: accounts[0]})
            expect(String(await Jewel.cap())).equal(String(500e18));
        })
        it("Mint Jewel Token For Account 0", async function() {
            let mint = await Jewel.mint(accounts[0], String(50e18), {from: accounts[0]});
            expect(String(await Jewel.balanceOf(accounts[0]))).equal(String(50e18));
        })
    })
})