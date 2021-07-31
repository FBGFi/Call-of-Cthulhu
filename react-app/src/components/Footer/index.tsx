import React, { useContext } from 'react';
import './Footer.css';

import DiceContainer from './DiceContainer';
import AgeModAlert from './AgeModAlert';
import { PlayerContext } from '../../reducers/PlayerReducer';


const Footer: React.FC = () => {
    const {state, dispatch} = useContext(PlayerContext);

    const ageModsNotAdded = (): boolean => {
        return state.CHARACTER_INFO.AGE !== undefined && !state.CHARACTERISTICS.AGE_MODS_ADDED;
    }

    return (
        <footer className='Footer'>
            <DiceContainer />
            {ageModsNotAdded() ? <AgeModAlert /> : null}
        </footer>
    );
}

export default Footer;