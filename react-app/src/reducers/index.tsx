import React, { createContext } from 'react';

type TAction = {

}

type TState = {
    CLIENT: "HOST" | "PLAYER"
}

const InitialState: TState = {
    CLIENT: "PLAYER"
}

function appReducer(state: TState, action: TAction): TState {
    return state;
}

const AppContext = createContext<{state: TState, dispatch: React.Dispatch<TAction>}>({state: InitialState, dispatch: () => {}});

export { InitialState, AppContext, appReducer };