import React, { createContext } from 'react';
import actions from '../actions';

type TAction = {
    type: string;
    value?: any;
}

type TState = {
    CLIENT: "HOST" | "PLAYER",
}

const InitialState: TState = {
    CLIENT: "PLAYER",

}

function appReducer(state: TState, action: TAction): TState {
    switch (action.type){
        case actions.SET_CLIENT:
            state.CLIENT = action.value;
            break;
        default:
            break;
    }
    return {...state};
}

const AppContext = createContext<{state: TState, dispatch: React.Dispatch<TAction>}>({state: InitialState, dispatch: () => {}});

export { InitialState, AppContext, appReducer };