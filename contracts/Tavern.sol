pragma solidity ^0.8.2;

pragma experimental ABIEncoderV2;

import './interfaces/ICrystalTypes.sol';

contract Tavern {

    event CrystalOpen(address owner, uint256 crystalId, uint256 heroId);
    event Gen0Purchase(address owner, uint256 crystalId, uint256 createdBlock, uint256 purchasePrice);
    event RoleAdminChanged(bytes32 role,bytes32 previousAdminRole, bytes32 newAdminRole);
    event RoleGranted(bytes32 role, address account, address sender);
    event RoleRevoked(bytes32 role, address account, address sender);


    constructor(address _heroCoreAddress, address _govTokenAddress, address _geneScienceAddress, address _gaiaTearsAddress, uint256 _startCost, uint256 _maxQuantity, uint256 _increase){

    }

    function DEFAULT_ADMIN_ROLE() public view returns (bytes32) {

    }

    function MODERATOR_ROLE() public view returns (bytes32) {
        
    }

    function amountSold() public view returns (uint256) {
        
    }

    function crystals(uint256 crystalId) public view returns (address, uint256, uint256, uint16, uint256, uint256, uint8, address, uint32, uint32, uint32, uint8){

    }

    function enabled() public view returns (bool) {

    }

    function extractNumber(uint256 randomNumber, uint256 digits, uint256 offset) public view returns (uint256)  {

    }

    function getCrystal(uint256 _crystalId) public view returns(ICrystalTypes.HeroCrystal[]memory list) {

    }

    function getRoleAdmin(address _address) public view returns(bytes32){

    }

    function getUserCrystals(address _address) public view returns(uint256[] memory list){

    }

    function grantRole(bytes32 role, address account) public view {

    }

    function hasRole(bytes32 role, address account) public view returns (bool){

    }

    function increase() public view returns (uint256) {

    }

    function jewelToken() public view returns (address) {

    }

    function lastPurchase(address _address) public view returns (uint256) {

    }

    function maxQuantity() public view returns (uint256) {

    }

    function nextPrice()  public view returns (uint256) {

    }

    function open(uint256 _crystalId) public view {

    }

    function purchase(uint256 _limit)  public view {

    }

    function renounceRole(bytes32 role, address account) public view {

    }

    function revokeRole(bytes32 role, address account) public view {

    }

    function setFees(address[] memory _feeAddresses, uint256[] memory _feePercents) public view {

    }

    function startCost() public view returns (uint256) {

    }

    function supportsInterface(bytes4 interfaceId) public view returns (bool) {

    }

    function toggleEnabled() public view {

    }

    function userCrystals(address account, uint256 _crystalId) public view returns(uint256){

    }

    function vrf(uint256 blockNumber) public view returns (bytes32) {

    }

}
