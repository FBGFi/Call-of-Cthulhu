import React, { createContext } from 'react';
import { FellowInvestigatorsActions } from '../../actions';

type TAction = {
    type: string;
    value: string;
}

type TPlayer = {
    CHAR: string;
    PLAYER: string;
}

type TFellowInvestigatorsState = {
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

const InitialFellowInvestigatorsState: TFellowInvestigatorsState = {
    PLAYER_1: {...Player},
    PLAYER_2: {...Player},
    PLAYER_3: {...Player},
    PLAYER_4: {...Player},
    PLAYER_5: {...Player},
    PLAYER_6: {...Player},
    PLAYER_7: {...Player},
    PLAYER_8: {...Player}
}

function fellowInvestigatorsReducer(state: TFellowInvestigatorsState, action: TAction): TFellowInvestigatorsState {
    switch (action.type) {
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
    return {...state};
}

const FellowInvestigatorsContext = createContext<{ state: TFellowInvestigatorsState, dispatch: React.Dispatch<TAction> }>({ state: InitialFellowInvestigatorsState, dispatch: () => { } });

export {
    fellowInvestigatorsReducer,
    InitialFellowInvestigatorsState,
    FellowInvestigatorsContext
}