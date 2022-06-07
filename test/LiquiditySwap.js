const chai = require("chai");
const { contract } = require("hardhat");
const expect = chai.expect;
const JewelToken = artifacts.require("JewelToken");
const RenaToken = artifacts.require("JewelToken");
const UniswapV2Factory = artifacts.require("UniswapV2Factory");
const UniswapV2Router02 = artifacts.require("UniswapV2Router02");
const UniswapV2Library = artifacts.require("UniswapV2Library");
const UniswapV2Pair = artifacts.require("UniswapV2Pair");

let Jewel;
let Rena;
let creator;
let uniswapV2Factory;
let uniswapV2Router;
let uniswapV2Library;
let uniswapV2Pair;
const sleep = ms => new Promise(res => setTimeout(res, ms));

contract("JewelToken", (accounts) => {
    describe("Deploy Jewel Token", function () {
        it("Create Jewel Token Smart Contract", async function() {
            creator = accounts[0];
            var _name = "Jewel";
            var _symbol = "JEWEL";
            Jewel = await JewelToken.new(_name, _symbol, String(100e18), String(100e18), String(10e18), String(10e18), {from: creator});
            console.log("contract",Jewel.address);
        })
    })
    describe("Update Cap and Mint Jewel Token For Account", function () {
        it("Update Cap Jewel Token", async function() {
            let newCap = await Jewel.capUpdate(String(100e18), {from: accounts[0]})
            expect(String(await Jewel.cap())).equal(String(100e18));
        })
        it("Mint Jewel Token For Account 0", async function() {
            let creator = accounts[0];
            let mint = await Jewel.mint(String(creator), String(50e18), {from: accounts[0]});
            expect(String(await Jewel.balanceOf(String(creator)))).equal(String(50e18));
        })
    })
})


contract("RenaToken", (accounts) => {
    describe("Deploy Rena Token", function () {
        it("Create Rena Token Smart Contract", async function() {
            creator = accounts[0];
            var _name = "Rena";
            var _symbol = "RENA";
            Rena = await RenaToken.new(_name, _symbol, String(100e18), String(100e18), String(1e18), String(1e18), {from: creator});
            console.log("contract", Rena.address);
        })
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

contract("Factory", (accounts) => {
    describe("Factory Smart Contract", function() {
        it("Create Factory", async function() {
            creator = accounts[0];
            uniswapV2Factory = await UniswapV2Factory.new(String(creator), {from: accounts[0]})
        })
        it("Create key pair", async function() {
            creator = accounts[0];
            let keyPair = await uniswapV2Factory.createPair(String(Rena.address), String(Jewel.address), {from: accounts[0]})
        })
    })
})


contract("Uniswap Router", (accounts) => {
    describe("Uniswap Router Smart Contract", function() {
        it("Create Uniswap Router", async function() {
            var _WETH = '0x2170ed0880ac9a755fd29b2688956bd959f933f8';
            uniswapV2Router =await UniswapV2Router02.new(String(uniswapV2Factory.address), String(_WETH), {from: accounts[0]});
            console.log("contract", uniswapV2Router.address);
        })

        it("Approve allow Uniswap Router Transfer two token Rena And Jewel", async function () {
            let creator = accounts[0];
            let amount = String(40e18);
            let approveRena = await Rena.approve(String(uniswapV2Router.address),amount, {from : creator});
            console.log(`approveRena :: gas used : ${approveRena.receipt.gasUsed}`);
            let approveJewel = await Jewel.approve(String(uniswapV2Router.address),amount, {from : creator});
            console.log(`approveJewel :: gas used : ${approveJewel.receipt.gasUsed}`);
        })

        let add;
        it("Get Address Pair", async function () {
            let accOne = accounts[0];
            await uniswapV2Router.getPairAddress(String(Rena.address), String(Jewel.address), {from: creator}).then(async function(res) { 
                add = JSON.stringify(res.receipt.logs[0].args.pair);
                let mint1 = await Jewel.mint(String(res.receipt.logs[0].args.pair), String(10e18), {from: accounts[0]});
                expect(String(await Jewel.balanceOf(res.receipt.logs[0].args.pair))).equal(String(10e18));
                let mint2 = await Rena.mint(String(res.receipt.logs[0].args.pair), String(10e18), {from: accounts[0]});
                expect(String(await Rena.balanceOf(res.receipt.logs[0].args.pair))).equal(String(10e18));
            })
        })

        it("Add liquidity Uniswap Router", async function () {
            //0x68bf7E364020dabe127afAFB78D6Ae379a9444a2,0x8a5a6A01715eCbddBD1d4356a0f8f1aCC51a1C88,5000000000000000000,3000000000000000000,1000000000000000000,1000000000000000000,0x55D51A68df6677EfAaAf0A363cB6319dB9ec34c8,1640654617
            let accOne = accounts[0];
            let addliquidity = await uniswapV2Router.addLiquidity(String(Rena.address), String(Jewel.address), String(5e18), String(3e18), String(1e18), String(1e18), String(accounts[0]), 1640654617, {from : accounts[0]});
            expect(String(await Rena.balanceOf(accounts[0]))).equal(String(45e18));
            expect(String(await Jewel.balanceOf(accounts[0]))).equal(String(47e18));
            //await sleep(15000);
        })

        it("Swap token Uniswap Router", async function(){
            let accOne = accounts[0];
            var listAddress = [String(Rena.address), String(Jewel.address)];
            //10000000000000000,5000000000000000,["0x68bf7E364020dabe127afAFB78D6Ae379a9444a2","0x8a5a6A01715eCbddBD1d4356a0f8f1aCC51a1C88"],0x55D51A68df6677EfAaAf0A363cB6319dB9ec34c8,1640654617
            let swapToken = await uniswapV2Router.swapExactTokensForTokens(String(1e16),String(5e15), listAddress, String(accounts[0]), 1640654617, {from: accounts[0]})
            // console.log(`uniswap :: ${JSON.stringify(swapToken)}`)
        })

    })
})
