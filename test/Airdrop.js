const chai = require("chai");
const expect = chai.expect;
const RenaToken = artifacts.require("RenaToken");
const AirdropToken = artifacts.require("Airdrop");

let Rena;
let Airdrop;

contract("Rena Token Contract", (accounts) => {
    describe("Rena Token Contract", function() {
        it("Create Rena Token", async function() {
            let creator = accounts[0];
            var _name = "Rena";
            var _symbol = "RENA";
            Rena = await RenaToken.new(_name, _symbol, String(100e18), String(100e18), String(1e18), String(1e18), {from: creator});
            console.log("contract", Rena.address);
        })
        describe("Update Cap and Mint Rena Token For Account", function () {
            it("Update Cap Rena Token", async function() {
                let newCap = await Rena.capUpdate(String(100e18), {from: accounts[0]})
                expect(String(await Rena.cap())).equal(String(100e18));
            })
            it("Mint Rena Token For Account 0", async function() {
                creator = accounts[0];
                let mint = await Rena.mint(String(creator), String(50e18), {from: accounts[0]});
                expect(String(await Rena.balanceOf(String(creator)))).equal(String(50e18));
            })
        })
    })
})

contract("Airdrop Contract", (accounts) => {
    describe("Airdrop Smart Contract", function() {
        it("Create Airdrop", async function() {
            let creator = accounts[0];
            Airdrop = await AirdropToken.new(String(Rena.address), {from: creator})
            console.log('Airdrop address:', String(Airdrop.address))
        })

        it("Mint Rena Token For Airdrop Contract", async function() {
            let mint = await Rena.mint(String(Airdrop.address), String(50e18), {from: accounts[0]});
            expect(String(await Rena.balanceOf(String(Airdrop.address)))).equal(String(50e18));
        })

        it("Send Batch Token", async function() {
            var addressReceive = [String("0x70997970c51812dc3a010c7d01b50e0d17dc79c8"), String("0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc")];
            let sendBatch = await Airdrop.sendBatch(addressReceive, String(2e18), {from: accounts[0]})
            console.log(`sendBatch :: gas used : ${sendBatch.receipt.gasUsed}`)
        })
        it("Check amout of Account 1 equal 2", async function() {
            expect(String(await Rena.balanceOf(String(accounts[1])))).equal(String(2e18));
        })
        it("Check amout of Account 2 equal 2", async function() {
            expect(String(await Rena.balanceOf(String(accounts[2])))).equal(String(2e18));
        })
    })
})