const chai = require("chai");
const { contract } = require("hardhat");
const expect = chai.expect;
const RenaToken = artifacts.require("RenaToken");
const AirdropClaim = artifacts.require("AirdropClaim");

let Rena;
let airdropClaim;

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

contract("AirdropClaim contract", async (accounts) => {
    const creator = accounts[0];
    const accOne = accounts[1];
    const accTwo = accounts[2];
    const accThree = accounts[3];
    describe("AirdropClaim contract", () => {
        it("Create contract", async () => {
            airdropClaim = await AirdropClaim.new(String(Rena.address), {
                from: creator,
            });
            console.log("AirdropClaim address", String(airdropClaim.address));
        });

        it("Mint Rena Token For AirdropClaim Contract", async function () {
            let mint = await Rena.mint(
                String(airdropClaim.address),
                String(50e18),
                {
                    from: accounts[0],
                }
            );
            expect(
                String(await Rena.balanceOf(String(airdropClaim.address)))
            ).equal(String(50e18));
        });

        it("Set airdrop to users", async () => {
            let recipients = [accOne, accTwo, accThree];
            let amounts = [String(5e18), String(10e18), String(0e18)];
            let setAirdrops = await airdropClaim.setAirdrops(
                recipients,
                amounts,
                { from: creator }
            );
            console.log("setAirdrops gas: ", setAirdrops.receipt.gasUsed);
        });

        it("Failure case : Claim airdrop", async () => {
            let claimAirdrop1 = await airdropClaim.claimAirdrop({
                from: accOne,
            });
            console.log("claimAirdrop1 gas: ", claimAirdrop1.receipt.gasUsed);
            let claimAirdrop2 = await airdropClaim.claimAirdrop({
                from: accTwo,
            });
            console.log("claimAirdrop2 gas: ", claimAirdrop2.receipt.gasUsed);
            expect(String(await Rena.balanceOf(String(accOne)))).equal(
                String(5e18)
            );
            expect(String(await Rena.balanceOf(String(accTwo)))).equal(
                String(10e18)
            );
            expect(String(await Rena.balanceOf(String(Airdrop.address)))).equal(
                String(35e18)
            );
        });

        it("Toggle enable", async () => {
            await airdropClaim.toggleEnabled({ from: creator });
        });

        it("Claim airdrop", async () => {
            let claimAirdrop1 = await airdropClaim.claimAirdrop({
                from: accOne,
            });
            console.log("claimAirdrop1 gas: ", claimAirdrop1.receipt.gasUsed);
            let claimAirdrop2 = await airdropClaim.claimAirdrop({
                from: accTwo,
            });
            console.log("claimAirdrop2 gas: ", claimAirdrop2.receipt.gasUsed);
            expect(String(await Rena.balanceOf(String(accOne)))).equal(
                String(5e18)
            );
            expect(String(await Rena.balanceOf(String(accTwo)))).equal(
                String(10e18)
            );
            expect(
                String(await Rena.balanceOf(String(airdropClaim.address)))
            ).equal(String(35e18));
        });

        it("Failure case: No unclaimed tokens", async () => {
            let claimAirdrop = await airdropClaim.claimAirdrop({
                from: accThree,
            });
            console.log("claimAirdrop gas: ", claimAirdrop.receipt.gasUsed);
        });
    });
});
