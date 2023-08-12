const PlayerActions = {
    SET_EVERYTHING: 'SET_EVERYTHING',
    SET_CHARACTER_INFO: {
        ALL: "SET_CHARACTER_INFO_ALL",
        NAME: "SET_CHARACTER_INFO_NAME",
        PLAYER: "SET_CHARACTER_INFO_PLAYER",
        OCCUPATICE: "SET_CHARACTER_INFO_OCCUPATICE",
        AGE: "SET_CHARACTER_INFO_AGE",
        SEX: "SET_CHARACTER_INFO_SEX",
        RESIDENCE: "SET_CHARACTER_INFO_RESIDENCE",
        BIRTHPLACE: "SET_CHARACTER_INFO_BIRTHPLACE",
        IMAGE: "SET_CHARACTER_IMAGE",
    },
    SET_CHARACTERISTICS: {
        ALL: "SET_CHARACTERISTICS_ALL",
        STR: "SET_CHARACTERISTICS_STR",
        DEX: "SET_CHARACTERISTICS_DEX",
        POW: "SET_CHARACTERISTICS_POW",
        CON: "SET_CHARACTERISTICS_CON",
        APP: "SET_CHARACTERISTICS_APP",
        EDU: "SET_CHARACTERISTICS_EDU",
        SIZ: "SET_CHARACTERISTICS_SIZ",
        INT: "SET_CHARACTERISTICS_INT",
        MOVE: "SET_CHARACTERISTICS_MOVE",
        DMG_BONUS: "SET_CHARACTERISTICS_DMG_BONUS",
        BUILD: "SET_CHARACTERISTICS_BUILD",
        DODGE: "SET_CHARACTERISTICS_DODGE",
        SET_AGE_MODS: "AGE_MODS_ARE_SET"
    },
    SET_SECONDARY_STATS: {
        HP: {
            M_WOUND: "SET_MAJOR_WOUND",
            MAX_HP: "SET_MAX_HP",
            DYING: "SET_DYING",
            UNCONSCIOUS: "SET_UNCONSCIOUS",
            SET_HP: "SET_HP"
        },
        SANITY: {
            TEMP_INSANE: "SET_TEMP_INSANE",
            INDEF_INSANE: "SET_INDEF_INSANE",
            START_SANITY: "SET_START_SANITY",
            MAX_SANITY: "SET_MAX_SANITY",
            SET_SANITY: "SET_SANITY",
        },
        LUCK: "SET_LUCK",
        MP: {
            MAX_MP: "SET_MAX_MP",
            SET_MP: "SET_MP",
        }
    }
}

export default PlayerActions;