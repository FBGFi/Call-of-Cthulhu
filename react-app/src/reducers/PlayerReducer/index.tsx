import React, { createContext } from 'react';
import { PlayerActions } from "../../actions";
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
        BIRTHPLACE: string
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
        AGE_MODS_ADDED: boolean,
    }
}

const InitialPlayerState: TPlayerState = {
    CHARACTER_ID: "",
    CHARACTER_INFO: {
        NAME: "",
        PLAYER: "",
        OCCUPATICE: "",
        AGE: undefined,
        SEX: "NONE",
        RESIDENCE: "",
        BIRTHPLACE: "",
    },
    CHARACTERISTICS: {
        STR: {
            INITIAL_VALUE: undefined,
            ADDED_VALUE: 0
        },
        DEX: {
            INITIAL_VALUE: undefined,
            ADDED_VALUE: 0
        },
        POW: {
            INITIAL_VALUE: undefined,
            ADDED_VALUE: 0
        },
        CON: {
            INITIAL_VALUE: undefined,
            ADDED_VALUE: 0
        },
        APP: {
            INITIAL_VALUE: undefined,
            ADDED_VALUE: 0
        },
        EDU: {
            INITIAL_VALUE: undefined,
            ADDED_VALUE: 0
        },
        SIZ: {
            INITIAL_VALUE: undefined,
            ADDED_VALUE: 0
        },
        INT: {
            INITIAL_VALUE: undefined,
            ADDED_VALUE: 0
        },
        MOVE: {
            INITIAL_VALUE: undefined,
            ADDED_VALUE: 0
        },
        AGE_MODS_ADDED: false
    }
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
        case PlayerActions.SET_CHARACTERISTICS.SET_AGE_MODS:
            state.CHARACTERISTICS.AGE_MODS_ADDED = true;
            break;

        default:
            break;
    }
    return Object.create(state);
}

const PlayerContext = createContext<{ state: TPlayerState, dispatch: React.Dispatch<TAction> }>({ state: InitialPlayerState, dispatch: () => { } });

export {
    playerReducer,
    InitialPlayerState,
    PlayerContext
}
