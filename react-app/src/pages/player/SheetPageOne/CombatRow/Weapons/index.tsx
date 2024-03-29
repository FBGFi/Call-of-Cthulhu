import React, { useContext, useState } from 'react';
import { WeaponsAndGearActions } from '../../../../../actions';
import InfoBox from '../../../../../components/InfoBox';
import { AppContext } from '../../../../../reducers';
import { InvestigatorSkillsContext } from '../../../../../reducers/InvestigatorSkillsReducer';
import { WeaponsAndGearContext } from '../../../../../reducers/WeaponsAndGearReducer';
import './Weapons.css';


type TWeaponKey = "WEAPON1" | "WEAPON2" | "WEAPON3" | "WEAPON4" | "WEAPON5";
type TWeaponField = "NAME" | "REGULAR" | "HARD" | "EXTREME" | "DAMAGE" | "RANGE" | "ATTACKS" | "AMMO" | "MALF";

type WeaponInputProps = {
    value: string | undefined;
    onBlur: (e: React.FocusEvent<HTMLInputElement>, key: TWeaponKey, field: TWeaponField) => void;
    weaponKey: TWeaponKey;
    weaponField: TWeaponField;
}

const WeaponInput: React.FC<WeaponInputProps> = (props) => {
    const appState = useContext(AppContext).state;
    const [typing, isTyping] = useState(false);
    return (
        <input
            onChange={() => { }}
            className={`${props.weaponKey}-${props.weaponField}`}
            value={!typing ? props.value : undefined}
            onBlur={(e) => {
                props.onBlur(e, props.weaponKey, props.weaponField);
                isTyping(false);
            }}
            onFocus={() => isTyping(true)}
            size={1}
            type="text" />
    );
}

const UnarmedRolls: React.FC = () => {
    const { state } = useContext(InvestigatorSkillsContext);
    const appState = useContext(AppContext).state;
    return (
        <>
            <input 
                value={appState.CLIENT === "HOST" && state.FIGHTING_BRAWL.CHECKED && state.FIGHTING_BRAWL.VALUE ? state.FIGHTING_BRAWL.VALUE : undefined} 
                defaultValue={appState.CLIENT === "PLAYER" && state.FIGHTING_BRAWL.CHECKED && state.FIGHTING_BRAWL.VALUE ? state.FIGHTING_BRAWL.VALUE : undefined} 
                size={1}
                onChange={() => {}}
                type="text" />
            <input 
                value={appState.CLIENT === "HOST" && state.FIGHTING_BRAWL.CHECKED && state.FIGHTING_BRAWL.VALUE ? Math.floor(state.FIGHTING_BRAWL.VALUE / 2) : undefined} 
                defaultValue={appState.CLIENT === "PLAYER" && state.FIGHTING_BRAWL.CHECKED && state.FIGHTING_BRAWL.VALUE ? Math.floor(state.FIGHTING_BRAWL.VALUE / 2) : undefined} 
                size={1} 
                onChange={() => {}}
                type="text" />
            <input 
                value={appState.CLIENT === "HOST" && state.FIGHTING_BRAWL.CHECKED && state.FIGHTING_BRAWL.VALUE ? Math.floor(state.FIGHTING_BRAWL.VALUE / 5) : undefined} 
                defaultValue={appState.CLIENT === "PLAYER" && state.FIGHTING_BRAWL.CHECKED && state.FIGHTING_BRAWL.VALUE ? Math.floor(state.FIGHTING_BRAWL.VALUE / 5) : undefined} 
                size={1} 
                onChange={() => {}}
                type="text" />
        </>
    );
}

const Weapons: React.FC = () => {
    const { state, dispatch } = useContext(WeaponsAndGearContext);

    const setValueForReducer = (
        e: React.FocusEvent<HTMLInputElement>,
        key: TWeaponKey,
        field: TWeaponField
    ) => {
        dispatch({ type: WeaponsAndGearActions.SET_WEAPON[key][field], value: e.target.value });
    }

    return (
        <InfoBox title="Weapons" className='Weapons'>
            <div className="weapon-container">

                <span>Weapon</span>
                <span>Regular</span>
                <span>Hard</span>
                <span>Extreme</span>
                <span>Damage</span>
                <span>Range</span>
                <span>Attacks</span>
                <span>Ammo</span>
                <span>Malf</span>

                <span>Unarmed</span>
                <UnarmedRolls />
                <span>1D3 + DB</span>
                <span>-</span>
                <span>1</span>
                <span>-</span>
                <span>-</span>

                {Object.keys(state.WEAPONS.WEAPON1).map((weaponKey) => {
                    return <WeaponInput
                        key={'WEAPON1-' + weaponKey}
                        value={state.WEAPONS.WEAPON1[weaponKey]}
                        onBlur={setValueForReducer}
                        weaponKey="WEAPON1"
                        // @ts-ignore
                        weaponField={weaponKey} />
                })}

                {Object.keys(state.WEAPONS.WEAPON2).map((weaponKey) => {
                    return <WeaponInput
                        key={'WEAPON2-' + weaponKey}
                        value={state.WEAPONS.WEAPON2[weaponKey]}
                        onBlur={setValueForReducer}
                        weaponKey="WEAPON2"
                        // @ts-ignore
                        weaponField={weaponKey} />
                })}

                {Object.keys(state.WEAPONS.WEAPON3).map((weaponKey) => {
                    return <WeaponInput
                        key={'WEAPON3-' + weaponKey}
                        value={state.WEAPONS.WEAPON3[weaponKey]}
                        onBlur={setValueForReducer}
                        weaponKey="WEAPON3"
                        // @ts-ignore
                        weaponField={weaponKey} />
                })}

                {Object.keys(state.WEAPONS.WEAPON4).map((weaponKey) => {
                    return <WeaponInput
                        key={'WEAPON4-' + weaponKey}
                        value={state.WEAPONS.WEAPON4[weaponKey]}
                        onBlur={setValueForReducer}
                        weaponKey="WEAPON4"
                        // @ts-ignore
                        weaponField={weaponKey} />
                })}

                {Object.keys(state.WEAPONS.WEAPON5).map((weaponKey) => {
                    return <WeaponInput
                        key={'WEAPON5-' + weaponKey}
                        value={state.WEAPONS.WEAPON5[weaponKey]}
                        onBlur={setValueForReducer}
                        weaponKey="WEAPON5"
                        // @ts-ignore
                        weaponField={weaponKey} />
                })}
            </div>
        </InfoBox>
    );
}

export default Weapons;