import React, { createContext } from 'react';
import { FellowInvestigatorsActions } from '../../actions';

type TAction = {
    type: string;
    value: any;
}

type TPlayer = {
    CHAR: string;
    PLAYER: string;
}

type TFellowInvestigatorsState = {
    [key: string]: any;
    CHARACTER_ID: string;
    PLAYER_1: TPlayer;
    PLAYER_2: TPlayer;
    PLAYER_3: TPlayer;
    PLAYER_4: TPlayer;
    PLAYER_5: TPlayer;
    PLAYER_6: TPlayer;
    PLAYER_7: TPlayer;
    PLAYER_8: TPlayer;
}

const Player: TPlayer = {
    CHAR: "",
    PLAYER: ""
}

const InitialFellowInvestigatorsState = (id?: string): TFellowInvestigatorsState => {
    let state: TFellowInvestigatorsState = {
        CHARACTER_ID: "",
        PLAYER_1: { ...Player },
        PLAYER_2: { ...Player },
        PLAYER_3: { ...Player },
        PLAYER_4: { ...Player },
        PLAYER_5: { ...Player },
        PLAYER_6: { ...Player },
        PLAYER_7: { ...Player },
        PLAYER_8: { ...Player }
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

function fellowInvestigatorsReducer(state: TFellowInvestigatorsState, action: TAction): TFellowInvestigatorsState {
    switch (action.type) {
        case FellowInvestigatorsActions.SET_EVERYTHING:
            for(let key in state){
                if(action.value[key]){
                    state[key] = action.value[key];
                }
            }
            break;
        case FellowInvestigatorsActions.PLAYER_1.SET_CHAR:
            state.PLAYER_1.CHAR = action.value;
            break;
        case FellowInvestigatorsActions.PLAYER_1.SET_PLAYER:
            state.PLAYER_1.PLAYER = action.value;
            break;

        case FellowInvestigatorsActions.PLAYER_2.SET_CHAR:
            state.PLAYER_2.CHAR = action.value;
            break;
        case FellowInvestigatorsActions.PLAYER_2.SET_PLAYER:
            state.PLAYER_2.PLAYER = action.value;
            break;

        case FellowInvestigatorsActions.PLAYER_3.SET_CHAR:
            state.PLAYER_3.CHAR = action.value;
            break;
        case FellowInvestigatorsActions.PLAYER_3.SET_PLAYER:
            state.PLAYER_3.PLAYER = action.value;
            break;

        case FellowInvestigatorsActions.PLAYER_4.SET_CHAR:
            state.PLAYER_4.CHAR = action.value;
            break;
        case FellowInvestigatorsActions.PLAYER_4.SET_PLAYER:
            state.PLAYER_4.PLAYER = action.value;
            break;

        case FellowInvestigatorsActions.PLAYER_5.SET_CHAR:
            state.PLAYER_5.CHAR = action.value;
            break;
        case FellowInvestigatorsActions.PLAYER_5.SET_PLAYER:
            state.PLAYER_5.PLAYER = action.value;
            break;

        case FellowInvestigatorsActions.PLAYER_6.SET_CHAR:
            state.PLAYER_6.CHAR = action.value;
            break;
        case FellowInvestigatorsActions.PLAYER_6.SET_PLAYER:
            state.PLAYER_6.PLAYER = action.value;
            break;

        case FellowInvestigatorsActions.PLAYER_7.SET_CHAR:
            state.PLAYER_7.CHAR = action.value;
            break;
        case FellowInvestigatorsActions.PLAYER_7.SET_PLAYER:
            state.PLAYER_7.PLAYER = action.value;
            break;

        case FellowInvestigatorsActions.PLAYER_8.SET_CHAR:
            state.PLAYER_8.CHAR = action.value;
            break;
        case FellowInvestigatorsActions.PLAYER_8.SET_PLAYER:
            state.PLAYER_8.PLAYER = action.value;
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

const FellowInvestigatorsContext = createContext<{ state: TFellowInvestigatorsState, dispatch: React.Dispatch<TAction> }>({ state: InitialFellowInvestigatorsState(), dispatch: () => { } });

export {
    fellowInvestigatorsReducer,
    InitialFellowInvestigatorsState,
    FellowInvestigatorsContext
}


export type { TFellowInvestigatorsState }