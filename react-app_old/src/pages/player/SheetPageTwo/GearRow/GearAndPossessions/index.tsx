import React, { useContext, useState } from 'react';
import { WeaponsAndGearActions } from '../../../../../actions';
import InfoBox from '../../../../../components/InfoBox';
import { AppContext } from '../../../../../reducers';
import { WeaponsAndGearContext } from '../../../../../reducers/WeaponsAndGearReducer';
import './GearAndPossessions.css';

type WeaponInputProps = {
    weapon: 'WEAPON1' | 'WEAPON2' | 'WEAPON3' | 'WEAPON4' | 'WEAPON5';
    onBlur: (e: React.FocusEvent<HTMLInputElement>, weapon: string) => void;
    value: string | undefined;
}

const WeaponInput: React.FC<WeaponInputProps> = (props) => {
    const [typing, isTyping] = useState(false);
    return (
        <input
            className={props.value}
            key={props.value}
            onFocus={() => isTyping(true)}
            onBlur={(e) => {
                props.onBlur(e, props.weapon);
                isTyping(false);
            }}
            value={props.value}
            type="text"
            size={1} />);
}

const GearAndPossessions: React.FC = () => {
    const { state, dispatch } = useContext(WeaponsAndGearContext);
    const appState = useContext(AppContext).state;

    const setValueForReducer = (e: React.FocusEvent<HTMLInputElement>, gearKey: string) => {
        // @ts-ignore
        dispatch({ type: WeaponsAndGearActions.SET_GEAR_AND_POSSESSIONS[gearKey], value: e.target.value })
    }

    const findIndexOfItemInArray = (item: string, comparison: string): boolean => item === comparison;

    const pushGearItem = (gear: string): JSX.Element => {
        return (<input
            key={gear}
            className={gear}
            // @ts-ignore
            defaultValue={appState.CLIENT === 'PLAYER' ? state.GEAR_AND_POSSESSIONS[gear] : undefined}
            // @ts-ignore
            value={appState.CLIENT === 'HOST' ? state.GEAR_AND_POSSESSIONS[gear] : undefined}
            onBlur={(e) => setValueForReducer(e, gear)}
            type="text"
            size={1} />);
    }

    const renderInputs = (): JSX.Element[] => {
        let numOfInputs = 20;
        let inputs: JSX.Element[] = [];

        // Check if there are weapons, push them at start
        for (let weapon in state.WEAPONS) {
            // @ts-ignore
            if (state.WEAPONS[weapon].NAME !== "") {
                // @ts-ignore
                inputs.push(
                    <WeaponInput
                        onBlur={(e, weapon) => {
                            // @ts-ignore
                            dispatch({ type: WeaponsAndGearActions.SET_WEAPON[weapon].NAME, value: e.target.value });
                        }}
                        // @ts-ignore
                        value={state.WEAPONS[weapon].NAME}
                        // @ts-ignore
                        weapon={weapon} />
                );
            }
        }

        // Start pushing Possessions at index after the last of weapons
        let i = inputs.length;
        for (let gear in state.GEAR_AND_POSSESSIONS) {
            // Here we reached limit of inputs, do some checks
            if (i >= numOfInputs) {
                // Find the remaining keys
                let gearKeys = Object.keys(state.GEAR_AND_POSSESSIONS);
                let currentIndex = gearKeys.findIndex((item) => findIndexOfItemInArray(item, gear));
                gearKeys.splice(0, currentIndex);

                // Check if there are values set for the rest of the keys
                for (let gear of gearKeys) {
                    // @ts-ignore
                    if (state.GEAR_AND_POSSESSIONS[gear] !== "") {
                        inputs.push(pushGearItem(gear));
                    }
                }
                break;
            }
            // @ts-ignore
            if (state.GEAR_AND_POSSESSIONS[gear] !== "") {
                inputs.push(pushGearItem(gear));
            } else {
                inputs.push(<input onBlur={(e) => setValueForReducer(e, gear)} className={gear} key={gear} type="text" size={1} />);
            }
            i++;
        }
        return inputs;
    }

    return (
        <InfoBox title="Gear & Possessions" className='GearAndPossessions'>
            <div className="gear-container">
                {renderInputs()}
            </div>
        </InfoBox>
    );
}

export default GearAndPossessions;