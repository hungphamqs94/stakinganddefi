// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

interface IHeroTypes {

    struct SummoningInfo {
        uint256 summonedTime;
        uint256 nextSummonTime;
        uint256 summonerId;
        uint256 assistantId;
        uint32 summons;
        uint32 maxSummons;
    }

    enum Rarity{ SMALL, MEDIUM, LARGE }

    struct HeroInfo {
        uint256 statGenes;
        uint256 visualGenes;
        bool shiny;
        Rarity rarity;
        uint16 generation;
        uint32 firstName;
        uint32 lastName;
        uint8 shinyStyle;
        uint8 class;
        uint8 subClass;
    }

    enum HeroStatus{ SMALL, MEDIUM, LARGE }

    struct HeroState {
        uint256 staminaFullAt;
        uint256 mpFullAt;
        uint16 level;
        uint64 xp;
        address currentQuest;
        uint8 sp;
        HeroStatus status;
    }

    struct HeroStats {
        uint16 strength;
        uint16 intelligence;
        uint16 wisdom;
        uint16 luck;
        uint16 agility;
        uint16 vitality;
        uint16 endurance;
        uint16 dexterity;
        uint16 hp;
        uint16 mp;
        uint16 stamina;
    }

    struct HeroStatGrowth {
        uint16 strength;
        uint16 intelligence;
        uint16 wisdom;
        uint16 luck;
        uint16 agility;
        uint16 vitality;
        uint16 endurance;
        uint16 dexterity;
        uint16 hpSm;
        uint16 hpRg;
        uint16 hpLg;
        uint16 mpRg;
        uint16 mpLg;
    }

    struct HeroProfessions {
        uint16 mining;
        uint16 gardening;
        uint16 foraging;
        uint16 fishing;
    }

    struct Hero {
        uint256 id;
        SummoningInfo summoningInfo;
        HeroInfo info;
        HeroState stats;
        HeroStatGrowth primaryStatGrowth;
        HeroStatGrowth secondaryStatGrowth;
        HeroProfessions professions;
    }

}