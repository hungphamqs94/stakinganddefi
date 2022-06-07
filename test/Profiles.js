const chai = require("chai");
const expect = chai.expect;
const RenaToken = artifacts.require("RenaToken");
const Profiles = artifacts.require("Profiles");

let rena;
let profile;

contract("Profiles", (accounts) => {
    describe("Deploy Profile", function () {

        it("1.1 Create Smart Contract Profile", async function() {
            profile = await Profiles.new({from: accounts[0]});
        })

        it("1.2 Initialize Profile", async function() {
            let initialize = await profile.initialize({from: accounts[0]});
            console.log(`Initailize Value : ${initialize.receipt.gasUsed}`)
        })

        it("1.3 Create Profile Hung Pham",async function() {
            let hungpham = await profile.createProfile("hungpham", 1, {from: accounts[0]});
            console.log(`Profile Hung Pham : ${hungpham.receipt.gasUsed}`)
        })

        it("1.4 Set Name Lengths",async function() {
            let nameLengths = await profile.setNameLengths(8,20, {from: accounts[0]})
            console.log(`Name Length: ${nameLengths.receipt.gasUsed}`)
        })

        it("1.5 Change Name",async function() {
            let changeName = await profile.changeName(1, "quangtam", {from:accounts[0]})
            console.log(`Change Name: ${changeName.receipt.gasUsed}`)
        })

        it("1.6 Get Profile By Name", async function() {
            let profileName = await profile.getProfileByName("quangtam", {from: accounts[0]})
            console.log(`Profile Name: ${JSON.stringify(profileName)}`)
        })

        it("Get Address By Name", async function() {
            let address = await profile.getAddressByName("quangtam", {from: accounts[0]})
            console.log(`address: ${JSON.stringify(address)}`)
        })

    })
})

