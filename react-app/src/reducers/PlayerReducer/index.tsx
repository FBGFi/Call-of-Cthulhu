import React, { createContext } from 'react';
import { PlayerActions } from "../../actions";
import md5 from 'md5';

type TAction = {
    type: string;
    value?: any;
}

type TCharacteristicsValue = {
    INITIAL_VALUE: number | undefined;
    ADDED_VALUE: number;
}

type TPlayerState = {
    CHARACTER_ID: string,
    CHARACTER_INFO: {
        NAME: string,
        PLAYER: string,
        OCCUPATICE: string,
        AGE: number | undefined,
        SEX: "MALE" | "FEMALE" | "OTHER" | "NONE",
        RESIDENCE: string,
        BIRTHPLACE: string,
        IMAGE: {
            SRC: undefined | string,
            TITLE: undefined | string,
        }
    },
    CHARACTERISTICS: {
        STR: TCharacteristicsValue,
        DEX: TCharacteristicsValue,
        POW: TCharacteristicsValue,
        CON: TCharacteristicsValue,
        APP: TCharacteristicsValue,
        EDU: TCharacteristicsValue,
        SIZ: TCharacteristicsValue,
        INT: TCharacteristicsValue,
        MOVE: TCharacteristicsValue,
        DMG_BONUS: string,
        BUILD: string,
        DODGE: TCharacteristicsValue,
        AGE_MODS_ADDED: boolean,
    },
    SECONDARY_STATS: {
        HP: {
            M_WOUND: boolean,
            MAX_HP: number | undefined,
            DYING: boolean,
            UNCONSCIOUS: boolean,
            INITIAL_VALUE: number | undefined,
            ADDED_VALUE: number
        },
        SANITY: {
            TEMP_INSANE: boolean,
            INDEF_INSANE: boolean,
            START_SANITY: number | undefined,
            MAX_SANITY: number | undefined,
            INITIAL_VALUE: number | undefined,
            ADDED_VALUE: number
        },
        LUCK: TCharacteristicsValue,
        MP: {
            MAX_MP: number | undefined,
            INITIAL_VALUE: number | undefined,
            ADDED_VALUE: number
        }
    }
}

const CharacteristicsValue: TCharacteristicsValue = {
    INITIAL_VALUE: undefined,
    ADDED_VALUE: 0
}

const InitialPlayerState = (id?: string): TPlayerState => {
    let state: TPlayerState = {
        CHARACTER_ID: md5(Date.now().toString()),
        CHARACTER_INFO: {
            NAME: "",
            PLAYER: "",
            OCCUPATICE: "",
            AGE: undefined,
            SEX: "NONE",
            RESIDENCE: "",
            BIRTHPLACE: "",
            IMAGE: {
                SRC: undefined,
                TITLE: undefined
            }
        },
        CHARACTERISTICS: {
            STR: { ...CharacteristicsValue },
            DEX: { ...CharacteristicsValue },
            POW: { ...CharacteristicsValue },
            CON: { ...CharacteristicsValue },
            APP: { ...CharacteristicsValue },
            EDU: { ...CharacteristicsValue },
            SIZ: { ...CharacteristicsValue },
            INT: { ...CharacteristicsValue },
            MOVE: { ...CharacteristicsValue },
            DMG_BONUS: "",
            BUILD: "",
            DODGE: { ...CharacteristicsValue },
            AGE_MODS_ADDED: false
        },
        SECONDARY_STATS: {
            HP: {
                M_WOUND: false,
                MAX_HP: undefined,
                DYING: false,
                UNCONSCIOUS: false,
                INITIAL_VALUE: undefined,
                ADDED_VALUE: 0
            },
            SANITY: {
                TEMP_INSANE: false,
                INDEF_INSANE: false,
                START_SANITY: undefined,
                MAX_SANITY: undefined,
                INITIAL_VALUE: undefined,
                ADDED_VALUE: 0
            },
            LUCK: { ...CharacteristicsValue },
            MP: {
                MAX_MP: undefined,
                INITIAL_VALUE: undefined,
                ADDED_VALUE: 0
            }
        }
    }
    if (id) {
        state.CHARACTER_ID = id;
        let savedCharacters = JSON.parse(window.localStorage.CALL_OF_CTHULHU);
        if (savedCharacters.LOCAL_SAVES === undefined) {
            savedCharacters.LOCAL_SAVES = {};
        } else if (savedCharacters.LOCAL_SAVES[id]) {
            let keys = Object.keys(state);
            for (let key of keys) {
                if (savedCharacters.LOCAL_SAVES[id][key]) {
                    // @ts-ignore
                    state[key] = savedCharacters.LOCAL_SAVES[id][key];
                }
            }
        }
    }
    return state;
}

function setDmgBonus(STR: number, SIZ: number): string {
    let value = STR + SIZ;
    if (value >= 2 && value <= 64) {
        return "-2";
    } else if (value >= 65 && value <= 84) {
        return "-1";
    } else if (value >= 85 && value <= 124) {
        return "None";
    } else if (value >= 125 && value <= 164) {
        return "+1D4";
    } else if (value >= 165) {
        return "+1D6";
    }
    return "0"
}

function setBuildStat(STR: number, SIZ: number): string {
    let value = STR + SIZ;
    if (value >= 2 && value <= 64) {
        return "-2";
    } else if (value >= 65 && value <= 84) {
        return "-1";
    } else if (value >= 85 && value <= 124) {
        return "0";
    } else if (value >= 125 && value <= 164) {
        return "+1";
    } else if (value >= 165) {
        return "+2";
    }
    return "0";
}

function setInitialHP(SIZ: number, CON: number): number {
    return Math.floor((SIZ + CON) / 10);
}



function playerReducer(state: TPlayerState, action: TAction): TPlayerState {
    switch (action.type) {
        // Character info setting
        case PlayerActions.SET_CHARACTER_INFO.NAME:
            state.CHARACTER_INFO.NAME = action.value;
            break;

        case PlayerActions.SET_CHARACTER_INFO.PLAYER:
            state.CHARACTER_INFO.PLAYER = action.value;
            break

        case PlayerActions.SET_CHARACTER_INFO.OCCUPATICE:
            state.CHARACTER_INFO.OCCUPATICE = action.value;
            break

        case PlayerActions.SET_CHARACTER_INFO.AGE:
            state.CHARACTER_INFO.AGE = action.value;
            break

        case PlayerActions.SET_CHARACTER_INFO.SEX:
            state.CHARACTER_INFO.SEX = action.value;
            break

        case PlayerActions.SET_CHARACTER_INFO.RESIDENCE:
            state.CHARACTER_INFO.RESIDENCE = action.value;
            break

        case PlayerActions.SET_CHARACTER_INFO.BIRTHPLACE:
            state.CHARACTER_INFO.BIRTHPLACE = action.value;
            break;

        case PlayerActions.SET_CHARACTER_INFO.IMAGE:
            if (action.value.SRC && action.value.TITLE) {
                state.CHARACTER_INFO.IMAGE.SRC = action.value.SRC;
                state.CHARACTER_INFO.IMAGE.TITLE = action.value.TITLE;
            }
            break;

        // Characteristics setting
        case PlayerActions.SET_CHARACTERISTICS.STR:
            if (state.CHARACTERISTICS.STR.INITIAL_VALUE === undefined) {
                state.CHARACTERISTICS.STR.INITIAL_VALUE = action.value;
            } else {
                state.CHARACTERISTICS.STR.ADDED_VALUE = action.value - state.CHARACTERISTICS.STR.INITIAL_VALUE;
            }
            break;

        case PlayerActions.SET_CHARACTERISTICS.DEX:
            if (state.CHARACTERISTICS.DEX.INITIAL_VALUE === undefined) {
                state.CHARACTERISTICS.DEX.INITIAL_VALUE = action.value;
            } else {
                state.CHARACTERISTICS.DEX.ADDED_VALUE = action.value - state.CHARACTERISTICS.DEX.INITIAL_VALUE;
            }
            break;
        case PlayerActions.SET_CHARACTERISTICS.POW:
            if (state.CHARACTERISTICS.POW.INITIAL_VALUE === undefined) {
                state.CHARACTERISTICS.POW.INITIAL_VALUE = action.value;
            } else {
                state.CHARACTERISTICS.POW.ADDED_VALUE = action.value - state.CHARACTERISTICS.POW.INITIAL_VALUE;
            }
            break;
        case PlayerActions.SET_CHARACTERISTICS.CON:
            if (state.CHARACTERISTICS.CON.INITIAL_VALUE === undefined) {
                state.CHARACTERISTICS.CON.INITIAL_VALUE = action.value;
            } else {
                state.CHARACTERISTICS.CON.ADDED_VALUE = action.value - state.CHARACTERISTICS.CON.INITIAL_VALUE;
            }
            break;
        case PlayerActions.SET_CHARACTERISTICS.APP:
            if (state.CHARACTERISTICS.APP.INITIAL_VALUE === undefined) {
                state.CHARACTERISTICS.APP.INITIAL_VALUE = action.value;
            } else {
                state.CHARACTERISTICS.APP.ADDED_VALUE = action.value - state.CHARACTERISTICS.APP.INITIAL_VALUE;
            }
            break;
        case PlayerActions.SET_CHARACTERISTICS.EDU:
            if (state.CHARACTERISTICS.EDU.INITIAL_VALUE === undefined) {
                state.CHARACTERISTICS.EDU.INITIAL_VALUE = action.value;
            } else {
                state.CHARACTERISTICS.EDU.ADDED_VALUE = action.value - state.CHARACTERISTICS.EDU.INITIAL_VALUE;
            }
            break;
        case PlayerActions.SET_CHARACTERISTICS.SIZ:
            if (state.CHARACTERISTICS.SIZ.INITIAL_VALUE === undefined) {
                state.CHARACTERISTICS.SIZ.INITIAL_VALUE = action.value;
            } else {
                state.CHARACTERISTICS.SIZ.ADDED_VALUE = action.value - state.CHARACTERISTICS.SIZ.INITIAL_VALUE;
            }
            break;
        case PlayerActions.SET_CHARACTERISTICS.INT:
            if (state.CHARACTERISTICS.INT.INITIAL_VALUE === undefined) {
                state.CHARACTERISTICS.INT.INITIAL_VALUE = action.value;
            } else {
                state.CHARACTERISTICS.INT.ADDED_VALUE = action.value - state.CHARACTERISTICS.INT.INITIAL_VALUE;
            }
            break;
        case PlayerActions.SET_CHARACTERISTICS.MOVE:
            if (state.CHARACTERISTICS.MOVE.INITIAL_VALUE === undefined) {
                state.CHARACTERISTICS.MOVE.INITIAL_VALUE = action.value;
            } else {
                state.CHARACTERISTICS.MOVE.ADDED_VALUE = action.value - state.CHARACTERISTICS.MOVE.INITIAL_VALUE;
            }
            break;
        case PlayerActions.SET_CHARACTERISTICS.DMG_BONUS:
            state.CHARACTERISTICS.DMG_BONUS = action.value;
            break;
        case PlayerActions.SET_CHARACTERISTICS.BUILD:
            state.CHARACTERISTICS.BUILD = action.value;
            break;
        case PlayerActions.SET_CHARACTERISTICS.DODGE:
            if (state.CHARACTERISTICS.DODGE.INITIAL_VALUE === undefined) {
                state.CHARACTERISTICS.DODGE.INITIAL_VALUE = action.value;
            } else {
                state.CHARACTERISTICS.DODGE.ADDED_VALUE = action.value - state.CHARACTERISTICS.DODGE.INITIAL_VALUE;
            }
            break;
        case PlayerActions.SET_CHARACTERISTICS.SET_AGE_MODS:
            // TypeScript is stupid again, cant make this a function...
            if (
                state.CHARACTERISTICS.STR.INITIAL_VALUE !== undefined &&
                state.CHARACTERISTICS.DEX.INITIAL_VALUE !== undefined &&
                state.CHARACTERISTICS.POW.INITIAL_VALUE !== undefined &&
                state.CHARACTERISTICS.CON.INITIAL_VALUE !== undefined &&
                state.CHARACTERISTICS.APP.INITIAL_VALUE !== undefined &&
                state.CHARACTERISTICS.EDU.INITIAL_VALUE !== undefined &&
                state.CHARACTERISTICS.SIZ.INITIAL_VALUE !== undefined &&
                state.CHARACTERISTICS.INT.INITIAL_VALUE !== undefined &&
                state.CHARACTERISTICS.MOVE.INITIAL_VALUE !== undefined
            ) {
                state.SECONDARY_STATS.MP.INITIAL_VALUE = Math.floor((state.CHARACTERISTICS.POW.INITIAL_VALUE + state.CHARACTERISTICS.POW.ADDED_VALUE) / 5);
                state.SECONDARY_STATS.SANITY.INITIAL_VALUE = state.CHARACTERISTICS.POW.INITIAL_VALUE + state.CHARACTERISTICS.POW.ADDED_VALUE;
                state.SECONDARY_STATS.SANITY.MAX_SANITY = state.CHARACTERISTICS.POW.INITIAL_VALUE + state.CHARACTERISTICS.POW.ADDED_VALUE;
                state.SECONDARY_STATS.SANITY.START_SANITY = state.CHARACTERISTICS.POW.INITIAL_VALUE + state.CHARACTERISTICS.POW.ADDED_VALUE;
                state.SECONDARY_STATS.HP.MAX_HP = setInitialHP(state.CHARACTERISTICS.SIZ.INITIAL_VALUE + state.CHARACTERISTICS.SIZ.ADDED_VALUE, state.CHARACTERISTICS.CON.INITIAL_VALUE + state.CHARACTERISTICS.CON.ADDED_VALUE);
                state.SECONDARY_STATS.HP.INITIAL_VALUE = setInitialHP(state.CHARACTERISTICS.SIZ.INITIAL_VALUE + state.CHARACTERISTICS.SIZ.ADDED_VALUE, state.CHARACTERISTICS.CON.INITIAL_VALUE + state.CHARACTERISTICS.CON.ADDED_VALUE);
                state.CHARACTERISTICS.DMG_BONUS = setDmgBonus(state.CHARACTERISTICS.STR.INITIAL_VALUE + state.CHARACTERISTICS.STR.ADDED_VALUE, state.CHARACTERISTICS.SIZ.INITIAL_VALUE + state.CHARACTERISTICS.SIZ.ADDED_VALUE);
                state.CHARACTERISTICS.BUILD = setBuildStat(state.CHARACTERISTICS.STR.INITIAL_VALUE + state.CHARACTERISTICS.STR.ADDED_VALUE, state.CHARACTERISTICS.SIZ.INITIAL_VALUE + state.CHARACTERISTICS.SIZ.ADDED_VALUE);
                state.CHARACTERISTICS.DODGE.INITIAL_VALUE = Math.floor((state.CHARACTERISTICS.DEX.INITIAL_VALUE + state.CHARACTERISTICS.DEX.ADDED_VALUE) / 2);
                state.CHARACTERISTICS.AGE_MODS_ADDED = true;
            }
            break;

        // Secondary stats setting
        case PlayerActions.SET_SECONDARY_STATS.HP.M_WOUND:
            state.SECONDARY_STATS.HP.M_WOUND = action.value;
            break;
        case PlayerActions.SET_SECONDARY_STATS.HP.MAX_HP:
            state.SECONDARY_STATS.HP.MAX_HP = action.value;
            break;
        case PlayerActions.SET_SECONDARY_STATS.HP.DYING:
            state.SECONDARY_STATS.HP.DYING = action.value;
            break;
        case PlayerActions.SET_SECONDARY_STATS.HP.UNCONSCIOUS:
            state.SECONDARY_STATS.HP.UNCONSCIOUS = action.value;
            break;
        case PlayerActions.SET_SECONDARY_STATS.HP.SET_HP:
            if (state.SECONDARY_STATS.HP.INITIAL_VALUE === undefined) {
                state.SECONDARY_STATS.HP.INITIAL_VALUE = action.value;
            } else {
                state.SECONDARY_STATS.HP.ADDED_VALUE = action.value - state.SECONDARY_STATS.HP.INITIAL_VALUE;
            }
            break;
        case PlayerActions.SET_SECONDARY_STATS.SANITY.TEMP_INSANE:
            state.SECONDARY_STATS.SANITY.TEMP_INSANE = action.value;
            break;
        case PlayerActions.SET_SECONDARY_STATS.SANITY.INDEF_INSANE:
            state.SECONDARY_STATS.SANITY.INDEF_INSANE = action.value;
            break;
        case PlayerActions.SET_SECONDARY_STATS.SANITY.SET_SANITY:
            if (state.SECONDARY_STATS.SANITY.INITIAL_VALUE === undefined) {
                state.SECONDARY_STATS.SANITY.INITIAL_VALUE = action.value;
            } else {
                state.SECONDARY_STATS.SANITY.ADDED_VALUE = action.value - state.SECONDARY_STATS.SANITY.INITIAL_VALUE;
            }
            break;
        case PlayerActions.SET_SECONDARY_STATS.SANITY.MAX_SANITY:
            state.SECONDARY_STATS.SANITY.MAX_SANITY = action.value;
            break;
        case PlayerActions.SET_SECONDARY_STATS.SANITY.START_SANITY:
            state.SECONDARY_STATS.SANITY.START_SANITY = action.value;
            break;
        case PlayerActions.SET_SECONDARY_STATS.LUCK:
            if (state.SECONDARY_STATS.LUCK.INITIAL_VALUE === undefined) {
                state.SECONDARY_STATS.LUCK.INITIAL_VALUE = action.value;
            } else {
                state.SECONDARY_STATS.LUCK.ADDED_VALUE = action.value - state.SECONDARY_STATS.LUCK.INITIAL_VALUE;
            }
            break;
        case PlayerActions.SET_SECONDARY_STATS.MP.SET_MP:
            if (state.SECONDARY_STATS.MP.INITIAL_VALUE === undefined) {
                state.SECONDARY_STATS.MP.INITIAL_VALUE = action.value;
            } else {
                state.SECONDARY_STATS.MP.ADDED_VALUE = action.value - state.SECONDARY_STATS.MP.INITIAL_VALUE;
            }
            break;
        case PlayerActions.SET_SECONDARY_STATS.MP.MAX_MP:
            state.SECONDARY_STATS.MP.MAX_MP = action.value;
            break;
        default:
            break;
    }

    let savedCharacters = JSON.parse(window.localStorage.CALL_OF_CTHULHU);
    if (savedCharacters.LOCAL_SAVES === undefined) {
        savedCharacters.LOCAL_SAVES = {};
    }
    savedCharacters.LOCAL_SAVES[state.CHARACTER_ID] = { ...savedCharacters.LOCAL_SAVES[state.CHARACTER_ID], ...state };
    localStorage.setItem('CALL_OF_CTHULHU', JSON.stringify(savedCharacters));
    return { ...state };
}

const PlayerContext = createContext<{ state: TPlayerState, dispatch: React.Dispatch<TAction> }>({ state: InitialPlayerState(), dispatch: () => { } });

export {
    playerReducer,
    InitialPlayerState,
    PlayerContext
}

export type { TPlayerState }