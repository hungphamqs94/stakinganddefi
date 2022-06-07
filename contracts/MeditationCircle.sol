pragma solidity ^0.8.2;

import './interfaces/IHeroTypes.sol';

contract MeditationCircle {
    struct Meditation {
        uint256 id;
        address player;
        uint256 heroId;
        uint8 primaryStat;
        uint8 secondaryStat;
        uint8 tertiaryStat;
        address attunementCrystal;
        uint256 startBlock;
        uint8 status;
    }

    event AttunementCrystalAdded(address atunementItemAddress);
    event LevelUp(address player, uint256 heroId, IHeroTypes.Hero hero, IHeroTypes.Hero oldHero);
    event MeditationBegun(address player, uint256 heroId, uint256 meditationId, uint8 primaryStat, uint8 secondaryStat, uint8 tertiaryStat, address attunementCrystal);
    event MeditationCompleted(address player, uint256 heroId, uint256 meditationId);
    event Paused(address account);
    event RoleAdminChanged(bytes32 role, bytes32 previousAdminRole, bytes32 newAdminRole);
    event RoleGranted(bytes32 role, address account, address sender);
    event RoleRevoked(bytes32 role, address account, address sender);
    event StatUp(address player, uint256 heroId, uint256 stat, uint8 increase);
    enum UpdateType {SMALL, MEDIUM, LARGE }
    event Unpaused(address account);
    function DEFAULT_ADMIN_ROLE() public view returns (bytes32) {}
    function MODERATOR_ROLE() public view returns (bytes32) {}
    function _getRequiredRunes(uint16 _level) public pure returns(uint16[10] memory){}
    function activeAttunementCrystals(address ad) public view returns(bool){}
    function addAttunementCrystal(address _address) public {}
    function completeMeditation(uint256 _heroId) public {}
    function extractNumber(uint256 randomNumber, uint256 digits, uint256 offset) public pure returns(uint256) {}
    function getActiveMeditations(address _address) public view returns (Meditation[] memory) {}
    function getHeroMeditation(uint256 _heroId) public view returns (Meditation[] memory) {}
    function getMeditation(uint256 _id) public view returns (Meditation[] memory) {}
    function getRoleAdmin(bytes32 role) public view returns (bytes32) {}
    function grantRole(bytes32 role, address account) public {}
    function hasRole(bytes32 role, address account) public view returns(bool) {}
    function heroToMeditation(uint256 id) public view returns(uint256) {}
    constructor(address _heroCoreAddress, address _statScienceAddress, address _govTokenAddress) public {}
    function jewelToken() public view returns(address) {}
    function pause() public {}
    function paused() public view returns(bool){}
    function profileActiveMeditations(address _address, uint256 _id) public view returns(uint256 id, address player, uint256 heroId, uint8 primaryStat, uint8 secondaryStat, uint8 tertiaryStat, address attunementCrystal, uint256 startBlock, uint8 status){}
    function renounceRole(bytes32 role, address account) public {}
    function revokeRole(bytes32 role, address account) public {}
    function setFees(address[] memory _feeAddresses, uint256[] memory _feePercents) public {}
    function setRune(uint8 _index, address _address) public {}
    function startMeditation(uint256 _heroId, uint8 _primaryStat, uint8 _secondaryStat, uint8 _tertiaryStat, address _attunementCrystal) public {}
    function supportsInterface(bytes4 interfaceId) public view returns(bool) {}
    function unpause() public {}
    function vrf(uint256 blockNumber) public view returns(bytes32 result) {}
}