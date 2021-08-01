import React, { useContext } from 'react';
import { WeaponsAndGearActions } from '../../../../../actions';
import InfoBox from '../../../../../components/InfoBox';
import { WeaponsAndGearContext } from '../../../../../reducers/WeaponsAndGearReducer';
import './GearAndPossessions.css';

const GearAndPossessions: React.FC = () => {
    const { state, dispatch } = useContext(WeaponsAndGearContext);

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
            defaultValue={state.GEAR_AND_POSSESSIONS[gear]}
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
                inputs.push(<input className={weapon} key={weapon} defaultValue={state.WEAPONS[weapon].NAME} type="text" size={1} />);
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