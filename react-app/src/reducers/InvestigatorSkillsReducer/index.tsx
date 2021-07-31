import React, { createContext } from 'react';
import { InvestigatorSkillsActions } from '../../actions';
import { TInvestigatorSkill } from '../../constants/types';

type TAction = {
    type: TInvestigatorSkill,
    value: boolean | number | string
}

type TBasicSkill = {
    CHECKED: boolean;
    VALUE: number | undefined;
}

type TCustomSkill = {
    CHECKED: boolean;
    VALUE: number | undefined;
    CUSTOM_TEXT: string;
}

type TInvestigatorSkillsState = {
    ACCOUNTING: TBasicSkill,
    FAST_TALK: TBasicSkill,
    LAW: TBasicSkill,
    SCIENCE: TCustomSkill,
    ANTHROPOLOGY: TBasicSkill,
    FIGHTING_BRAWL: TBasicSkill,
    LIBRARY_USE: TBasicSkill,
    CUSTOM_1: TCustomSkill,
    CUSTOM_2: TCustomSkill,
    CUSTOM_3: TCustomSkill,
    CUSTOM_4: TCustomSkill,
    CUSTOM_5: TCustomSkill,
    CUSTOM_6: TCustomSkill,
    CUSTOM_7: TCustomSkill,
    CUSTOM_8: TCustomSkill,
    CUSTOM_9: TCustomSkill,
    CUSTOM_10: TCustomSkill,
    CUSTOM_11: TCustomSkill,
    CUSTOM_12: TCustomSkill,
    CUSTOM_13: TCustomSkill,
    CUSTOM_14: TCustomSkill,
    APPRAISE: TBasicSkill,
    LISTEN: TBasicSkill,
    ARCHAEOLOGY: TBasicSkill,
    LOCKSMITH: TBasicSkill,
    SLEIGHT_OF_HAND: TBasicSkill,
    ART_CRAFT: TCustomSkill,
    FIREARMS_HANDGUN: TBasicSkill,
    MECH_REPAIR: TBasicSkill,
    SPOT_HIDDEN: TBasicSkill,
    FIREARMS_RIFLE_SHOTGUN: TBasicSkill,
    MEDICINE: TBasicSkill,
    STEALTH: TBasicSkill,
    NATURAL_WORLD: TBasicSkill,
    SURVIVAL: TCustomSkill,
    CHARM: TBasicSkill,
    FIRST_AID: TBasicSkill,
    NAVIGATE: TBasicSkill,
    SWIM: TBasicSkill,
    CLIMB: TBasicSkill,
    HISTORY: TBasicSkill,
    OCCULT: TBasicSkill,
    THROW: TBasicSkill,
    CREDIT_RATING: {
        VALUE: number | undefined;
    },
    INTIMIDATE: TBasicSkill,
    OP_HV_MACHINE: TBasicSkill,
    TRACK: TBasicSkill,
    CTHULHU_MYTHOS: {
        VALUE: number | undefined;
    },
    JUMP: TBasicSkill,
    PERSUADE: TBasicSkill,
    DISGUISE: TBasicSkill,
    LANGUAGE_OTHER: TCustomSkill,
    PILOT: TCustomSkill,
    DODGE: {
        CHECKED: boolean
    },
    PSYCHOLOGY: TBasicSkill,
    DRIVE_AUTO: TBasicSkill,
    PSYCHOANALYSIS: TBasicSkill,
    ELEC_REPAIR: TBasicSkill,
    LANGUAGE_OWN: {
        CHECKED: boolean
    },
    RIDE: TBasicSkill
}

const InitialInvestigatorSkillsState: TInvestigatorSkillsState = {
    ACCOUNTING: {
        CHECKED: false,
        VALUE: undefined
    },
    FAST_TALK: {
        CHECKED: false,
        VALUE: undefined
    },
    LAW: {
        CHECKED: false,
        VALUE: undefined
    },
    SCIENCE: {
        CHECKED: false,
        VALUE: undefined,
        CUSTOM_TEXT: ""
    },
    ANTHROPOLOGY: {
        CHECKED: false,
        VALUE: undefined
    },
    FIGHTING_BRAWL: {
        CHECKED: false,
        VALUE: undefined
    },
    LIBRARY_USE: {
        CHECKED: false,
        VALUE: undefined
    },
    CUSTOM_1: {
        CHECKED: false,
        VALUE: undefined,
        CUSTOM_TEXT: ""
    },
    CUSTOM_2: {
        CHECKED: false,
        VALUE: undefined,
        CUSTOM_TEXT: ""
    },
    CUSTOM_3: {
        CHECKED: false,
        VALUE: undefined,
        CUSTOM_TEXT: ""
    },
    CUSTOM_4: {
        CHECKED: false,
        VALUE: undefined,
        CUSTOM_TEXT: ""
    },
    CUSTOM_5: {
        CHECKED: false,
        VALUE: undefined,
        CUSTOM_TEXT: ""
    },
    CUSTOM_6: {
        CHECKED: false,
        VALUE: undefined,
        CUSTOM_TEXT: ""
    },
    CUSTOM_7: {
        CHECKED: false,
        VALUE: undefined,
        CUSTOM_TEXT: ""
    },
    CUSTOM_8: {
        CHECKED: false,
        VALUE: undefined,
        CUSTOM_TEXT: ""
    },
    CUSTOM_9: {
        CHECKED: false,
        VALUE: undefined,
        CUSTOM_TEXT: ""
    },
    CUSTOM_10: {
        CHECKED: false,
        VALUE: undefined,
        CUSTOM_TEXT: ""
    },
    CUSTOM_11: {
        CHECKED: false,
        VALUE: undefined,
        CUSTOM_TEXT: ""
    },
    CUSTOM_12: {
        CHECKED: false,
        VALUE: undefined,
        CUSTOM_TEXT: ""
    },
    CUSTOM_13: {
        CHECKED: false,
        VALUE: undefined,
        CUSTOM_TEXT: ""
    },
    CUSTOM_14: {
        CHECKED: false,
        VALUE: undefined,
        CUSTOM_TEXT: ""
    },
    APPRAISE: {
        CHECKED: false,
        VALUE: undefined
    },
    LISTEN: {
        CHECKED: false,
        VALUE: undefined
    },
    ARCHAEOLOGY: {
        CHECKED: false,
        VALUE: undefined
    },
    LOCKSMITH: {
        CHECKED: false,
        VALUE: undefined
    },
    SLEIGHT_OF_HAND: {
        CHECKED: false,
        VALUE: undefined
    },
    ART_CRAFT: {
        CHECKED: false,
        VALUE: undefined,
        CUSTOM_TEXT: ""
    },
    FIREARMS_HANDGUN: {
        CHECKED: false,
        VALUE: undefined
    },
    MECH_REPAIR: {
        CHECKED: false,
        VALUE: undefined
    },
    SPOT_HIDDEN: {
        CHECKED: false,
        VALUE: undefined
    },
    FIREARMS_RIFLE_SHOTGUN: {
        CHECKED: false,
        VALUE: undefined
    },
    MEDICINE: {
        CHECKED: false,
        VALUE: undefined
    },
    STEALTH: {
        CHECKED: false,
        VALUE: undefined
    },
    NATURAL_WORLD: {
        CHECKED: false,
        VALUE: undefined
    },
    SURVIVAL: {
        CHECKED: false,
        VALUE: undefined,
        CUSTOM_TEXT: ""
    },
    CHARM: {
        CHECKED: false,
        VALUE: undefined
    },
    FIRST_AID: {
        CHECKED: false,
        VALUE: undefined
    },
    NAVIGATE: {
        CHECKED: false,
        VALUE: undefined
    },
    SWIM: {
        CHECKED: false,
        VALUE: undefined
    },
    CLIMB: {
        CHECKED: false,
        VALUE: undefined
    },
    HISTORY: {
        CHECKED: false,
        VALUE: undefined
    },
    OCCULT: {
        CHECKED: false,
        VALUE: undefined
    },
    THROW: {
        CHECKED: false,
        VALUE: undefined
    },
    CREDIT_RATING: {
        VALUE: undefined
    },
    INTIMIDATE: {
        CHECKED: false,
        VALUE: undefined
    },
    OP_HV_MACHINE: {
        CHECKED: false,
        VALUE: undefined
    },
    TRACK: {
        CHECKED: false,
        VALUE: undefined
    },
    CTHULHU_MYTHOS: {
        VALUE: undefined
    },
    JUMP: {
        CHECKED: false,
        VALUE: undefined
    },
    PERSUADE: {
        CHECKED: false,
        VALUE: undefined
    },
    DISGUISE: {
        CHECKED: false,
        VALUE: undefined
    },
    LANGUAGE_OTHER: {
        CHECKED: false,
        VALUE: undefined,
        CUSTOM_TEXT: ""
    },
    PILOT: {
        CHECKED: false,
        VALUE: undefined,
        CUSTOM_TEXT: ""
    },
    DODGE: {
        CHECKED: false
    },
    PSYCHOLOGY: {
        CHECKED: false,
        VALUE: undefined
    },
    DRIVE_AUTO: {
        CHECKED: false,
        VALUE: undefined
    },
    PSYCHOANALYSIS: {
        CHECKED: false,
        VALUE: undefined
    },
    ELEC_REPAIR: {
        CHECKED: false,
        VALUE: undefined
    },
    LANGUAGE_OWN: {
        CHECKED: false
    },
    RIDE: {
        CHECKED: false,
        VALUE: undefined
    }
}

function investigatorSkillsReducer(state: TInvestigatorSkillsState, action: TAction): TInvestigatorSkillsState {
    if (typeof (action.value) === "string") {
        console.log('Setting value to ' + action.type);
        
        // @ts-ignore
        state[action.type].CUSTOM_TEXT = action.value;
    } else if (typeof (action.value) === "number") {
        console.log('Setting value to ' + action.type);
        
        // @ts-ignore
        state[action.type].VALUE = action.value;
    } else if (typeof (action.value) === "boolean") {
        // @ts-ignore
        state[action.type].CHECKED = action.value;
    }
    return Object.create(state);
}

const InvestigatorSkillsContext = createContext<{ state: TInvestigatorSkillsState, dispatch: React.Dispatch<TAction> }>({ state: InitialInvestigatorSkillsState, dispatch: () => { } });

export {
    investigatorSkillsReducer,
    InitialInvestigatorSkillsState,
    InvestigatorSkillsContext
}