import React, { createContext } from 'react';
import { WeaponsAndGearActions } from '../../actions';

type TAction = {
    type: string;
    value: any;
}

type TWeapon = {
    [key: string]: string;
    NAME: string;
    REGULAR: string;
    HARD: string;
    EXTREME: string;
    DAMAGE: string;
    RANGE: string;
    ATTACKS: string;
    AMMO: string;
    MALF: string;
}

type TWeaponsAndGearState = {
    WEAPONS: {
        WEAPON1: TWeapon,
        WEAPON2: TWeapon,
        WEAPON3: TWeapon,
        WEAPON4: TWeapon,
        WEAPON5: TWeapon,
    },
    GEAR_AND_POSSESSIONS: {
        GEAR_AND_POSSESSIONS_1: string,
        GEAR_AND_POSSESSIONS_2: string,
        GEAR_AND_POSSESSIONS_3: string,
        GEAR_AND_POSSESSIONS_4: string,
        GEAR_AND_POSSESSIONS_5: string,
        GEAR_AND_POSSESSIONS_6: string,
        GEAR_AND_POSSESSIONS_7: string,
        GEAR_AND_POSSESSIONS_8: string,
        GEAR_AND_POSSESSIONS_9: string,
        GEAR_AND_POSSESSIONS_10: string,
        GEAR_AND_POSSESSIONS_11: string,
        GEAR_AND_POSSESSIONS_12: string,
        GEAR_AND_POSSESSIONS_13: string,
        GEAR_AND_POSSESSIONS_14: string,
        GEAR_AND_POSSESSIONS_15: string,
        GEAR_AND_POSSESSIONS_16: string,
        GEAR_AND_POSSESSIONS_17: string,
        GEAR_AND_POSSESSIONS_18: string,
        GEAR_AND_POSSESSIONS_19: string,
        GEAR_AND_POSSESSIONS_20: string,
    },
    CASH_AND_ASSETS: {
        SPENDING_LEVEL: string,
        CASH: string,
        ASSETS: {
            ASSET_1: string,
            ASSET_2: string,
            ASSET_3: string,
            ASSET_4: string,
            ASSET_5: string,
            ASSET_6: string,
            ASSET_7: string,
            ASSET_8: string,
        }
    }
}

const Weapon: TWeapon = {
    NAME: "",
    REGULAR: "",
    HARD: "",
    EXTREME: "",
    DAMAGE: "",
    RANGE: "",
    ATTACKS: "",
    AMMO: "",
    MALF: "",
}

const InitialWeaponsAndGearState: TWeaponsAndGearState = {
    WEAPONS: {
        WEAPON1: {...Weapon},
        WEAPON2: {...Weapon},
        WEAPON3: {...Weapon},
        WEAPON4: {...Weapon},
        WEAPON5: {...Weapon},
    },
    GEAR_AND_POSSESSIONS: {
        GEAR_AND_POSSESSIONS_1: "",
        GEAR_AND_POSSESSIONS_2: "",
        GEAR_AND_POSSESSIONS_3: "",
        GEAR_AND_POSSESSIONS_4: "",
        GEAR_AND_POSSESSIONS_5: "",
        GEAR_AND_POSSESSIONS_6: "",
        GEAR_AND_POSSESSIONS_7: "",
        GEAR_AND_POSSESSIONS_8: "",
        GEAR_AND_POSSESSIONS_9: "",
        GEAR_AND_POSSESSIONS_10: "",
        GEAR_AND_POSSESSIONS_11: "",
        GEAR_AND_POSSESSIONS_12: "",
        GEAR_AND_POSSESSIONS_13: "",
        GEAR_AND_POSSESSIONS_14: "",
        GEAR_AND_POSSESSIONS_15: "",
        GEAR_AND_POSSESSIONS_16: "",
        GEAR_AND_POSSESSIONS_17: "",
        GEAR_AND_POSSESSIONS_18: "",
        GEAR_AND_POSSESSIONS_19: "",
        GEAR_AND_POSSESSIONS_20: "",
    },
    CASH_AND_ASSETS: {
        SPENDING_LEVEL: "",
        CASH: "",
        ASSETS: {
            ASSET_1: "",
            ASSET_2: "",
            ASSET_3: "",
            ASSET_4: "",
            ASSET_5: "",
            ASSET_6: "",
            ASSET_7: "",
            ASSET_8: "",
        }
    }
}

function weaponsAndGearReducer(state: TWeaponsAndGearState, action: TAction): TWeaponsAndGearState {
    switch(action.type){
        // Setting weapons
        case WeaponsAndGearActions.SET_WEAPON.WEAPON1.NAME:
            state.WEAPONS.WEAPON1.NAME = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON1.REGULAR:
            state.WEAPONS.WEAPON1.REGULAR = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON1.HARD:
            state.WEAPONS.WEAPON1.HARD = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON1.EXTREME:
            state.WEAPONS.WEAPON1.EXTREME = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON1.DAMAGE:
            state.WEAPONS.WEAPON1.DAMAGE = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON1.RANGE:
            state.WEAPONS.WEAPON1.RANGE = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON1.ATTACKS:
            state.WEAPONS.WEAPON1.ATTACKS = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON1.AMMO:
            state.WEAPONS.WEAPON1.AMMO = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON1.MALF:
            state.WEAPONS.WEAPON1.MALF = action.value;
            break;

        case WeaponsAndGearActions.SET_WEAPON.WEAPON2.NAME:
            state.WEAPONS.WEAPON2.NAME = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON2.REGULAR:
            state.WEAPONS.WEAPON2.REGULAR = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON2.HARD:
            state.WEAPONS.WEAPON2.HARD = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON2.EXTREME:
            state.WEAPONS.WEAPON2.EXTREME = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON2.DAMAGE:
            state.WEAPONS.WEAPON2.DAMAGE = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON2.RANGE:
            state.WEAPONS.WEAPON2.RANGE = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON2.ATTACKS:
            state.WEAPONS.WEAPON2.ATTACKS = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON2.AMMO:
            state.WEAPONS.WEAPON2.AMMO = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON2.MALF:
            state.WEAPONS.WEAPON2.MALF = action.value;
            break;

        case WeaponsAndGearActions.SET_WEAPON.WEAPON3.NAME:
            state.WEAPONS.WEAPON3.NAME = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON3.REGULAR:
            state.WEAPONS.WEAPON3.REGULAR = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON3.HARD:
            state.WEAPONS.WEAPON3.HARD = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON3.EXTREME:
            state.WEAPONS.WEAPON3.EXTREME = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON3.DAMAGE:
            state.WEAPONS.WEAPON3.DAMAGE = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON3.RANGE:
            state.WEAPONS.WEAPON3.RANGE = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON3.ATTACKS:
            state.WEAPONS.WEAPON3.ATTACKS = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON3.AMMO:
            state.WEAPONS.WEAPON3.AMMO = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON3.MALF:
            state.WEAPONS.WEAPON3.MALF = action.value;
            break;

        case WeaponsAndGearActions.SET_WEAPON.WEAPON4.NAME:
            state.WEAPONS.WEAPON4.NAME = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON4.REGULAR:
            state.WEAPONS.WEAPON4.REGULAR = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON4.HARD:
            state.WEAPONS.WEAPON4.HARD = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON4.EXTREME:
            state.WEAPONS.WEAPON4.EXTREME = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON4.DAMAGE:
            state.WEAPONS.WEAPON4.DAMAGE = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON4.RANGE:
            state.WEAPONS.WEAPON4.RANGE = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON4.ATTACKS:
            state.WEAPONS.WEAPON4.ATTACKS = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON4.AMMO:
            state.WEAPONS.WEAPON4.AMMO = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON4.MALF:
            state.WEAPONS.WEAPON4.MALF = action.value;
            break;

        case WeaponsAndGearActions.SET_WEAPON.WEAPON5.NAME:
            state.WEAPONS.WEAPON5.NAME = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON5.REGULAR:
            state.WEAPONS.WEAPON5.REGULAR = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON5.HARD:
            state.WEAPONS.WEAPON5.HARD = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON5.EXTREME:
            state.WEAPONS.WEAPON5.EXTREME = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON5.DAMAGE:
            state.WEAPONS.WEAPON5.DAMAGE = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON5.RANGE:
            state.WEAPONS.WEAPON5.RANGE = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON5.ATTACKS:
            state.WEAPONS.WEAPON5.ATTACKS = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON5.AMMO:
            state.WEAPONS.WEAPON5.AMMO = action.value;
            break;
        case WeaponsAndGearActions.SET_WEAPON.WEAPON5.MALF:
            state.WEAPONS.WEAPON5.MALF = action.value;
            break;

        // Setting Gear and Possessions
        case WeaponsAndGearActions.SET_GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_1:
            state.GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_1 = action.value;
            break;
        case WeaponsAndGearActions.SET_GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_2:
            state.GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_2 = action.value;
            break;
        case WeaponsAndGearActions.SET_GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_3:
            state.GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_3 = action.value;
            break;
        case WeaponsAndGearActions.SET_GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_4:
            state.GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_4 = action.value;
            break;
        case WeaponsAndGearActions.SET_GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_5:
            state.GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_5 = action.value;
            break;
        case WeaponsAndGearActions.SET_GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_6:
            state.GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_6 = action.value;
            break;
        case WeaponsAndGearActions.SET_GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_7:
            state.GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_7 = action.value;
            break;
        case WeaponsAndGearActions.SET_GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_8:
            state.GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_8 = action.value;
            break;
        case WeaponsAndGearActions.SET_GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_9:
            state.GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_9 = action.value;
            break;
        case WeaponsAndGearActions.SET_GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_10:
            state.GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_10 = action.value;
            break;
        case WeaponsAndGearActions.SET_GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_11:
            state.GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_11 = action.value;
            break;
        case WeaponsAndGearActions.SET_GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_12:
            state.GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_12 = action.value;
            break;
        case WeaponsAndGearActions.SET_GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_13:
            state.GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_13 = action.value;
            break;
        case WeaponsAndGearActions.SET_GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_14:
            state.GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_14 = action.value;
            break;
        case WeaponsAndGearActions.SET_GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_15:
            state.GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_15 = action.value;
            break;
        case WeaponsAndGearActions.SET_GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_16:
            state.GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_16 = action.value;
            break;
        case WeaponsAndGearActions.SET_GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_17:
            state.GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_17 = action.value;
            break;
        case WeaponsAndGearActions.SET_GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_18:
            state.GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_18 = action.value;
            break;
        case WeaponsAndGearActions.SET_GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_19:
            state.GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_19 = action.value;
            break;
        case WeaponsAndGearActions.SET_GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_20:
            state.GEAR_AND_POSSESSIONS.GEAR_AND_POSSESSIONS_20 = action.value;
            break;
        
        // Setting Cash and Assets
        case WeaponsAndGearActions.SET_CASH_AND_ASSETS.SPENDING_LEVEL:
            state.CASH_AND_ASSETS.SPENDING_LEVEL = action.value;
            break;
        case WeaponsAndGearActions.SET_CASH_AND_ASSETS.CASH:
            state.CASH_AND_ASSETS.CASH = action.value;
            break;
        case WeaponsAndGearActions.SET_CASH_AND_ASSETS.ASSETS.SET_ASSET1:
            state.CASH_AND_ASSETS.ASSETS.ASSET_1 = action.value;
            break;
        case WeaponsAndGearActions.SET_CASH_AND_ASSETS.ASSETS.SET_ASSET2:
            state.CASH_AND_ASSETS.ASSETS.ASSET_2 = action.value;
            break;
        case WeaponsAndGearActions.SET_CASH_AND_ASSETS.ASSETS.SET_ASSET3:
            state.CASH_AND_ASSETS.ASSETS.ASSET_3 = action.value;
            break;
        case WeaponsAndGearActions.SET_CASH_AND_ASSETS.ASSETS.SET_ASSET4:
            state.CASH_AND_ASSETS.ASSETS.ASSET_4 = action.value;
            break;
        case WeaponsAndGearActions.SET_CASH_AND_ASSETS.ASSETS.SET_ASSET5:
            state.CASH_AND_ASSETS.ASSETS.ASSET_5 = action.value;
            break;
        case WeaponsAndGearActions.SET_CASH_AND_ASSETS.ASSETS.SET_ASSET6:
            state.CASH_AND_ASSETS.ASSETS.ASSET_6 = action.value;
            break;
        case WeaponsAndGearActions.SET_CASH_AND_ASSETS.ASSETS.SET_ASSET7:
            state.CASH_AND_ASSETS.ASSETS.ASSET_7 = action.value;
            break;
        case WeaponsAndGearActions.SET_CASH_AND_ASSETS.ASSETS.SET_ASSET8:
            state.CASH_AND_ASSETS.ASSETS.ASSET_8 = action.value;
            break;
        default:
            break;
    }
    return {...state};
}

const WeaponsAndGearContext = createContext<{ state: TWeaponsAndGearState, dispatch: React.Dispatch<TAction> }>({ state: InitialWeaponsAndGearState, dispatch: () => { } });

export {
    InitialWeaponsAndGearState,
    weaponsAndGearReducer,
    WeaponsAndGearContext
}