const chai = require("chai");
const expect = chai.expect;
const RenaToken = artifacts.require("RenaToken");
const MasterGardenerToken = artifacts.require("MasterGardener");

let Rena;
let MasterGardener;

contract("MasterGarderer Token Contract", (accounts) => {

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
                let mint = await Rena.mint(String(creator), String(20e18), {from: accounts[0]});
                expect(String(await Rena.balanceOf(String(creator)))).equal(String(20e18));
            })
        })

    })

    describe("MasterGarderer Contract", function() {

        it("Master Garderer Token", async function() {
            let _rewardMultiplier = [20,30,40,50,60,70,80,90]
            MasterGardener = await MasterGardenerToken.new(String(Rena.address), 1, _rewardMultiplier, {from: accounts[0]});
        })

        it("Init Value Address", async function() {
            await MasterGardener.initValueAddr(String(accounts[1]),String(accounts[0]), String(accounts[2]), String(accounts[0]), {from:accounts[0]});
        })

        it("Init Value Block", async function() {
            await MasterGardener.initValueBlock(10, 1, {from: accounts[0]});
        })

        it("Init Value Fee", async function() {
            await MasterGardener.initValueFee(String(1e3), String(1e3),{from:accounts[0]});
        })

        it("Init Value Stage", async function() {
            var blockStartStage = [1,11,21,31,41]
            var blockEndStage = [9,19,29,39,49]
            var userFeeStage = [1,1,1,1]
            var devFeeStage = [1,1,1,1]
            await MasterGardener.initValueStage(blockStartStage,blockEndStage, userFeeStage, devFeeStage, {from:accounts[0]})
        })

        it("Approve Master Gardener on Account 4", async function() {
            let amount = String(20e18);
            let approveMasterGardener = await Rena.approve(String(MasterGardener.address),amount, {from : accounts[0]});
            console.log(`approveMasterGardener :: gas used : ${approveMasterGardener.receipt.gasUsed}`);
        })

        it("create pool", async function() {
            let pool = await MasterGardener.add(String(50e18), String(Rena.address), true, {from:accounts[0]});
            console.log(`pool :: gas used : ${pool.receipt.gasUsed}`);
        })

        it("Check Value", async function() {
            let value = await MasterGardener.calValue(String(30e18), {from:accounts[0]});
            console.log(JSON.stringify(value))
        })

        // it("claim Token", async function() {
        //     let havert = await MasterGardener.claimReward(0, {from: String(accounts[0])});
        //     console.log(`claim :: gas used : ${havert.receipt.gasUsed}`)
        // })


        it("Get Owner", async function() {
            let owner = await MasterGardener.getOwner({from: accounts[0]});
            console.log(`owner : ${JSON.stringify(owner)}`)
        })

        it("deposit Token", async function() {
            let deposit = await MasterGardener.deposit(0, String(10e18), String(accounts[2]), {from:accounts[0]});
            console.log(`pool :: gas used : ${JSON.stringify(deposit)}`)
        })

        it("claim Token", async function() {
            let havert = await MasterGardener.claimReward(0, {from: String(accounts[0])});
            console.log(`claim :: gas used : ${havert.receipt.gasUsed}`)
        })

        // it("Only Test Transfer Token", async function() {
        //     let deposit = await MasterGardener.onlyTestTransfer(0, String(10e18),{from:accounts[0]});
        //     console.log(`pool :: gas used : ${JSON.stringify(deposit)}`)
        // })

        it("Get Owner", async function() {
            let owner = await MasterGardener.getOwner({from: accounts[0]});
            console.log(`owner : ${JSON.stringify(owner)}`)
        })

        // it("Only Test Transfer Token", async function() {
        //     let deposit = await MasterGardener.onlyTestTransfer(0, String(10e18),{from:accounts[0]});
        //     console.log(`pool :: gas used : ${JSON.stringify(deposit)}`)
        // })
        it("deposit Token", async function() {
            let deposit = await MasterGardener.deposit(0, String(10e18), String(accounts[2]), {from:accounts[0]});
            console.log(`pool :: gas used : ${JSON.stringify(deposit)}`)
        })

        it("claim Token", async function() {
            let havert = await MasterGardener.claimReward(0, {from: String(accounts[0])});
            console.log(`claim :: gas used : ${havert.receipt.gasUsed}`)
        })

        // it("Only Test Transfer Token", async function() {
        //     let deposit = await MasterGardener.onlyTestTransfer(0, String(10e18),{from:accounts[0]});
        //     console.log(`pool :: gas used : ${JSON.stringify(deposit)}`)
        // })
       


    })
})
