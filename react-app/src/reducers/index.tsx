import React, { createContext } from 'react';
import actions from '../actions';

type TAction = {

}

type TState = {
    CLIENT: "HOST" | "PLAYER",
    PLAYER: {
        CHARACTER_ID: string,
        CHARACTER_INFO: {
            NAME: string,
            PLAYER: string,
            OCCUPATICE: string,
            AGE: number | null,
            SEX: "MALE" | "FEMALE" | "OTHER" | "NONE",
            RESIDENCE: string,
            BIRTHPLACE: string
        },
        CHARACTERISTICS: {
            STR: number | null,
            DEX: number | null,
            POW: number | null,
            CON: number | null,
            APP: number | null,
            EDU: number | null,
            SIZ: number | null,
            INT: number | null,
            MOVE: number | null
        }

    }
}

const InitialState: TState = {
    CLIENT: "PLAYER",
    PLAYER: {
        CHARACTER_ID: "",
        CHARACTER_INFO: {
            NAME: "",
            PLAYER: "",
            OCCUPATICE: "",
            AGE: null,
            SEX: "NONE",
            RESIDENCE: "",
            BIRTHPLACE: "",
        },
        CHARACTERISTICS: {
            STR: null,
            DEX: null,
            POW: null,
            CON: null,
            APP: null,
            EDU: null,
            SIZ: null,
            INT: null,
            MOVE: null
        }
    }
}

function reducer(state: TState, action: TAction): TState {
    return state;
}

export { InitialState }