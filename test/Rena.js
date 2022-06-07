const chai = require("chai");
const expect = chai.expect;
const RenaToken = artifacts.require("JewelToken");

let Rena;
let creator;

contract("RenaToken", (accounts) => {
    describe("Deploy Rena Token", function () {
        it("Create Rena Token Smart Contract", async function () {
            creator = accounts[0];
            var _name = "Rena";
            var _symbol = "RENA";
            Rena = await RenaToken.new(
                _name,
                _symbol,
                String(500e18),
                String(500e18),
                String(10e18),
                String(10e18),
                { from: creator }
            );
            console.log("contract", Rena.address);
        });
    });
    describe("Update Cap and Mint Rena Token For Account", function () {
        it("Update Cap Rena Token", async function () {
            let newCap = await Rena.capUpdate(String(500e18), {
                from: accounts[0],
            });
            expect(String(await Rena.cap())).equal(String(500e18));
        });
        it("Mint Jewel Rena For Account 0", async function () {
            let mint = await Rena.mint(accounts[0], String(50e18), {
                from: accounts[0],
            });
            expect(String(await Rena.balanceOf(accounts[0]))).equal(
                String(50e18)
            );
        });
        it("Failure case: Mint Rena cap exceeded", async () => {
            let mint = await Rena.mint(accounts[0], String(510e18), {
                from: accounts[0],
            });
            expect().fail("ERC20Capped: cap exceeded");
            // String(
            //     await Rena.mint(accounts[0], String(50e18), {
            //         from: accounts[0],
            //     })
            // )
        });
    });
});
