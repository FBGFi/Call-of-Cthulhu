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
        MOVE: TCharacteristicsValue
    }
}

const InitialCharacteristicsValue: TCharacteristicsValue = {
    INITIAL_VALUE: undefined,
    ADDED_VALUE: 0
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
        STR: Object.create(InitialCharacteristicsValue),
        DEX: Object.create(InitialCharacteristicsValue),
        POW: Object.create(InitialCharacteristicsValue),
        CON: Object.create(InitialCharacteristicsValue),
        APP: Object.create(InitialCharacteristicsValue),
        EDU: Object.create(InitialCharacteristicsValue),
        SIZ: Object.create(InitialCharacteristicsValue),
        INT: Object.create(InitialCharacteristicsValue),
        MOVE: Object.create(InitialCharacteristicsValue)
    }
}

function playerReducer(state: TPlayerState, action: TAction): TPlayerState {
    switch (action.type) {
        // Character info setting
        case PlayerActions.SET_CHARACTER_INFO.NAME:
            return {...state, ...{CHARACTER_INFO:{...state.CHARACTER_INFO, ...{NAME: action.value}}}};   

        case PlayerActions.SET_CHARACTER_INFO.PLAYER:
            return {...state, ...{CHARACTER_INFO:{...state.CHARACTER_INFO, ...{PLAYER: action.value}}}};   

        case PlayerActions.SET_CHARACTER_INFO.OCCUPATICE:
            return {...state, ...{CHARACTER_INFO:{...state.CHARACTER_INFO, ...{OCCUPATICE: action.value}}}};  

        case PlayerActions.SET_CHARACTER_INFO.AGE:
            return {...state, ...{CHARACTER_INFO:{...state.CHARACTER_INFO, ...{AGE: action.value}}}};   

        case PlayerActions.SET_CHARACTER_INFO.SEX:
            return {...state, ...{CHARACTER_INFO:{...state.CHARACTER_INFO, ...{SEX: action.value}}}};   

        case PlayerActions.SET_CHARACTER_INFO.RESIDENCE:
            return {...state, ...{CHARACTER_INFO:{...state.CHARACTER_INFO, ...{RESIDENCE: action.value}}}};   

        case PlayerActions.SET_CHARACTER_INFO.BIRTHPLACE:
            return {...state, ...{CHARACTER_INFO:{...state.CHARACTER_INFO, ...{BIRTHPLACE: action.value}}}};   

        // Characteristics setting
        case PlayerActions.SET_CHARACTERISTICS.STR:
            if(state.CHARACTERISTICS.STR === undefined) return state;
            return {...state, ...{CHARACTERISTICS:{...state.CHARACTERISTICS, ...{STR: action.value}}}};
        default:
            return state;
    }
}

const PlayerContext = createContext<{state: TPlayerState, dispatch: React.Dispatch<TAction>}>({state: InitialPlayerState, dispatch: () => {}});

export {
    playerReducer,
    InitialPlayerState,
    PlayerContext
}
