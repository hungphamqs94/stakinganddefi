// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

interface ICrystalTypes {
    struct HeroCrystal {
        address owner;
        uint256 summonerId;
        uint256 assistantId;
        uint16 generation;
        uint256 createdBlock;
        uint256 heroId;
        uint8 summonerTears;
        uint8 assistantTears;
        address bonusItem;
        uint32 maxSummons;
        uint32 firstName;
        uint32 lastName;
        uint8 shinyStyle;
    }
}