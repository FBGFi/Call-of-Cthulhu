import React, { useContext } from 'react';
import { PlayerActions } from '../../../actions';
import { PlayerContext } from '../../../reducers/PlayerReducer';
import './AgeModAlert.css';

const ageMods: { [key: string]: string } = {
    "19": "Deduct 5 points among STR and SIZ. Deduct 5 points from EDU. Roll 3d6*5 twice to generate a Luck score and use the higher value.",
    "39": "Make an improvement check for EDU by rolling 1d100, if the result is higher than your current EDU, add 1d10 amount of points to your current EDU.",
    "49": "Make 2 improvement checks for EDU by rolling 1d100, if the result is higher than your current EDU, add 1d10 amount of points to your current EDU, and deduct 5 points among STR, CON or DEX, and reduce APP by 5.",
    "59": "Make 3 improvement checks for EDU by rolling 1d100, if the result is higher than your current EDU, add 1d10 amount of points to your current EDU, and deduct 10 points among STR, CON or DEX, and reduce APP by 10.",
    "69": "Make 4 improvement checks for EDU by rolling 1d100, if the result is higher than your current EDU, add 1d10 amount of points to your current EDU, and deduct 20 points among STR, CON or DEX, and reduce APP by 15.",
    "79": "Make 4 improvement checks for EDU by rolling 1d100, if the result is higher than your current EDU, add 1d10 amount of points to your current EDU, and deduct 40 points among STR, CON or DEX, and reduce APP by 20.",
    "89": "Make 4 improvement checks for EDU by rolling 1d100, if the result is higher than your current EDU, add 1d10 amount of points to your current EDU, and deduct 80 points among STR, CON or DEX, and reduce APP by 25."
};

const AgeModAlert: React.FC = () => {
    const { state, dispatch } = useContext(PlayerContext);

    const setValueForReducer = () => {
        dispatch({ type: PlayerActions.SET_CHARACTERISTICS.SET_AGE_MODS, value: true });
    }

    const getAgeModKey = (): string => {
        let keys = Object.keys(ageMods);
        let key = keys[keys.length - 1];
        for (let i = keys.length - 1; i >= 0; i--) {
            if (state.CHARACTER_INFO.AGE && state.CHARACTER_INFO.AGE <= parseInt(keys[i])) {
                key = keys[i];
            } else {
                break;
            }
        }
        return key;
    }

    return (
        <div className='AgeModAlert'>
            <h2>Apply age modifications</h2>
            <span>{ageMods[getAgeModKey()]}</span>
            <span><b>(Note that maximum EDU is 99)</b></span>
            <button onClick={setValueForReducer}>Done!</button>
        </div>
    );
}

export default AgeModAlert;