const chai = require("chai");
const { artifacts } = require("hardhat");
const expect = chai.expect;
const RenaToken = artifacts.require("RenaToken");
const banker = artifacts.require("Banker");
const bank = artifacts.require("Bank");
let Rena;
let Banker;
let Bank;

contract("Rena Token Contract", (accounts) => {
    describe("Rena Token Contract", function () {
        it("Create Rena Token", async function () {
            let creator = accounts[0];
            var _name = "Rena";
            var _symbol = "RENA";
            Rena = await RenaToken.new(
                _name,
                _symbol,
                String(100e18),
                String(100e18),
                String(1e18),
                String(1e18),
                { from: creator }
            );
            console.log("contract", Rena.address);
        });
        describe("Update Cap and Mint Rena Token For Account", function () {
            it("Update Cap Rena Token", async function () {
                let newCap = await Rena.capUpdate(String(100e18), {
                    from: accounts[0],
                });
                expect(String(await Rena.cap())).equal(String(100e18));
            });
            it("Mint Rena Token For Account 0", async function () {
                creator = accounts[0];
                let mint = await Rena.mint(String(creator), String(50e18), {
                    from: accounts[0],
                });
                expect(String(await Rena.balanceOf(String(creator)))).equal(
                    String(50e18)
                );
            });
        });
    });
});

contract("Bank Contract", (accounts) => {
    describe("Bank Smart Contract", function () {
        it("Create Bank", async function () {
            let creator = accounts[0];
            var _name = "TP BANK";
            var _symbol = "TPB";
            //var RenaTokenGov = IERC20(String(Rena.address));
            Bank = await bank.new(_name, _symbol, String(Rena.address), {
                from: creator,
            });
            console.log("bank address:", String(Bank.address));
        });
        it("Approve allow Bank Transfer Rena From Account 0", async function () {
            let creator = accounts[0];
            let amount = String(40e18);
            let approveRena = await Rena.approve(String(Bank.address), amount, {
                from: creator,
            });
            console.log(`approve :: gas used : ${approveRena.receipt.gasUsed}`);
        });
        it("Account 0 deposit rena token to Bank", async function () {
            let creator = accounts[0];
            let amount = String(20e18);
            let deposit = await Bank.enter(amount, { from: creator });
            console.log(`deposit :: gas used : ${deposit.receipt.gasUsed}`);
        });
        it("Check Balance of Account 0", async function () {
            let creator = accounts[0];
            expect(String(await Rena.balanceOf(String(creator)))).equal(
                String(30e18)
            );
        });
        it("Check Balance Rena of Bank", async function () {
            expect(String(await Rena.balanceOf(String(Bank.address)))).equal(
                String(20e18)
            );
        });

        it("Mint Rena for Bank", async function () {
            let mint = await Rena.mint(String(Bank.address), String(50e18), {
                from: accounts[0],
            });
            expect(String(await Rena.balanceOf(String(Bank.address)))).equal(
                String(70e18)
            );
        });

        it("Account 0 Withdraw Token", async function () {
            let share = await Bank.leave(String(10e18), { from: accounts[0] });
            console.log(`withdraw :: gas used : ${share.receipt.gasUsed}`);
        });
    });
});
