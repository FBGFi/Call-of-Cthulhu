import React, { createContext } from 'react';
import { BackstoryActions } from '../../actions';

type TAction = {
    type: string;
    value: string;
}

type TBackstoryState = {
    CHARACTER_ID: string;
    PERSONAL_DESCRIPTION: string;
    TRAITS: string;
    IDEOLOGY_BELIEFS: string;
    INJURIES_SCARS: string;
    SIGNIFICANT_PEOPLE: string;
    PHOBIAS_MANIAS: string;
    MEANINGFUL_LOCATIONS: string;
    ARCANE_TOMES_SPELLS_ARTIFACTS: string;
    TREASURED_POSSESSIONS: string;
    ENCOUNTERS_WITH_STRANGE_ENTITIES: string;
}

const InitialBackstoryState = (id?: string): TBackstoryState => {
    let state: TBackstoryState = {
        CHARACTER_ID: "",
        PERSONAL_DESCRIPTION: "",
        TRAITS: "",
        IDEOLOGY_BELIEFS: "",
        INJURIES_SCARS: "",
        SIGNIFICANT_PEOPLE: "",
        PHOBIAS_MANIAS: "",
        MEANINGFUL_LOCATIONS: "",
        ARCANE_TOMES_SPELLS_ARTIFACTS: "",
        TREASURED_POSSESSIONS: "",
        ENCOUNTERS_WITH_STRANGE_ENTITIES: "",
    };
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

function backstoryReducer(state: TBackstoryState, action: TAction): TBackstoryState {
    switch (action.type) {
        case BackstoryActions.PERSONAL_DESCRIPTION:
            state.PERSONAL_DESCRIPTION = action.value;
            break;
        case BackstoryActions.TRAITS:
            state.TRAITS = action.value;
            break;
        case BackstoryActions.IDEOLOGY_BELIEFS:
            state.IDEOLOGY_BELIEFS = action.value;
            break;
        case BackstoryActions.INJURIES_SCARS:
            state.INJURIES_SCARS = action.value;
            break;
        case BackstoryActions.SIGNIFICANT_PEOPLE:
            state.SIGNIFICANT_PEOPLE = action.value;
            break;
        case BackstoryActions.PHOBIAS_MANIAS:
            state.PHOBIAS_MANIAS = action.value;
            break;
        case BackstoryActions.MEANINGFUL_LOCATIONS:
            state.MEANINGFUL_LOCATIONS = action.value;
            break;
        case BackstoryActions.ARCANE_TOMES_SPELLS_ARTIFACTS:
            state.ARCANE_TOMES_SPELLS_ARTIFACTS = action.value;
            break;
        case BackstoryActions.TREASURED_POSSESSIONS:
            state.TREASURED_POSSESSIONS = action.value;
            break;
        case BackstoryActions.ENCOUNTERS_WITH_STRANGE_ENTITIES:
            state.ENCOUNTERS_WITH_STRANGE_ENTITIES = action.value;
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

const BackstoryContext = createContext<{ state: TBackstoryState, dispatch: React.Dispatch<TAction> }>({ state: InitialBackstoryState(), dispatch: () => { } });

export {
    backstoryReducer,
    InitialBackstoryState,
    BackstoryContext
}

export type { TBackstoryState }