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

const BasicSkill: TBasicSkill = {
    CHECKED: false,
    VALUE: undefined
}

const CustomSkill: TCustomSkill = {
    CHECKED: false,
    VALUE: undefined,
    CUSTOM_TEXT: ""
}

const InitialInvestigatorSkillsState: TInvestigatorSkillsState = {
    ACCOUNTING: { ...BasicSkill },
    FAST_TALK: { ...BasicSkill },
    LAW: { ...BasicSkill },
    SCIENCE: {...CustomSkill},
    ANTHROPOLOGY: { ...BasicSkill },
    FIGHTING_BRAWL: { ...BasicSkill },
    LIBRARY_USE: { ...BasicSkill },
    CUSTOM_1: {...CustomSkill},
    CUSTOM_2: {...CustomSkill},
    CUSTOM_3: {...CustomSkill},
    CUSTOM_4: {...CustomSkill},
    CUSTOM_5: {...CustomSkill},
    CUSTOM_6: {...CustomSkill},
    CUSTOM_7: {...CustomSkill},
    CUSTOM_8: {...CustomSkill},
    CUSTOM_9: {...CustomSkill},
    CUSTOM_10: {...CustomSkill},
    CUSTOM_11: {...CustomSkill},
    CUSTOM_12: {...CustomSkill},
    CUSTOM_13: {...CustomSkill},
    CUSTOM_14: {...CustomSkill},
    APPRAISE: { ...BasicSkill },
    LISTEN: { ...BasicSkill },
    ARCHAEOLOGY: { ...BasicSkill },
    LOCKSMITH: { ...BasicSkill },
    SLEIGHT_OF_HAND: { ...BasicSkill },
    ART_CRAFT: {...CustomSkill},
    FIREARMS_HANDGUN: { ...BasicSkill },
    MECH_REPAIR: { ...BasicSkill },
    SPOT_HIDDEN: { ...BasicSkill },
    FIREARMS_RIFLE_SHOTGUN: { ...BasicSkill },
    MEDICINE: { ...BasicSkill },
    STEALTH: { ...BasicSkill },
    NATURAL_WORLD: { ...BasicSkill },
    SURVIVAL: {...CustomSkill},
    CHARM: { ...BasicSkill },
    FIRST_AID: { ...BasicSkill },
    NAVIGATE: { ...BasicSkill },
    SWIM: { ...BasicSkill },
    CLIMB: { ...BasicSkill },
    HISTORY: { ...BasicSkill },
    OCCULT: { ...BasicSkill },
    THROW: { ...BasicSkill },
    CREDIT_RATING: {
        VALUE: undefined
    },
    INTIMIDATE: { ...BasicSkill },
    OP_HV_MACHINE: { ...BasicSkill },
    TRACK: { ...BasicSkill },
    CTHULHU_MYTHOS: {
        VALUE: undefined
    },
    JUMP: { ...BasicSkill },
    PERSUADE: { ...BasicSkill },
    DISGUISE: { ...BasicSkill },
    LANGUAGE_OTHER: {...CustomSkill},
    PILOT: {...CustomSkill},
    DODGE: {
        CHECKED: false
    },
    PSYCHOLOGY: { ...BasicSkill },
    DRIVE_AUTO: { ...BasicSkill },
    PSYCHOANALYSIS: { ...BasicSkill },
    ELEC_REPAIR: { ...BasicSkill },
    LANGUAGE_OWN: {
        CHECKED: false
    },
    RIDE: { ...BasicSkill }
}

function investigatorSkillsReducer(state: TInvestigatorSkillsState, action: TAction): TInvestigatorSkillsState {
    if (typeof (action.value) === "string") {
        // @ts-ignore
        state[action.type].CUSTOM_TEXT = action.value;
    } else if (typeof (action.value) === "number") {
        // @ts-ignore
        state[action.type].VALUE = action.value;
    } else if (typeof (action.value) === "boolean") {
        // @ts-ignore
        state[action.type].CHECKED = action.value;
    }
    return { ...state };
}

const InvestigatorSkillsContext = createContext<{ state: TInvestigatorSkillsState, dispatch: React.Dispatch<TAction> }>({ state: InitialInvestigatorSkillsState, dispatch: () => { } });

export {
    investigatorSkillsReducer,
    InitialInvestigatorSkillsState,
    InvestigatorSkillsContext
}