import React, { createContext } from 'react';
import { BackstoryActions } from '../../actions';

type TAction = {
    type: string;
    value: string;
}

type TBackstoryState = {
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

const InitialBackstoryState: TBackstoryState = {
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
}

function backstoryReducer(state:TBackstoryState, action: TAction): TBackstoryState {
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
    return {...state};
}

const BackstoryContext = createContext<{ state: TBackstoryState, dispatch: React.Dispatch<TAction> }>({ state: InitialBackstoryState, dispatch: () => { } });

export {
    backstoryReducer,
    InitialBackstoryState,
    BackstoryContext
}