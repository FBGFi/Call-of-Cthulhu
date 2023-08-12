import React, { useContext } from 'react';
import './Footer.css';

import DiceContainer from './DiceContainer';
import AgeModAlert from './AgeModAlert';
import { PlayerContext } from '../../reducers/PlayerReducer';
import NotesContainer from './NotesContainer';

type FooterProps = {
    diceRollCallback?: (result: number) => void;
}

const Footer: React.FC<FooterProps> = (props) => {
    const { state } = useContext(PlayerContext);

    const ageModsNotAdded = (): boolean => {
        return state.CHARACTER_INFO.AGE !== undefined && !state.CHARACTERISTICS.AGE_MODS_ADDED;
    }

    return (
        <footer className='Footer'>
            <div className="inner-container">
                <div className="button-container">
                    <NotesContainer />
                    <DiceContainer diceRollCallback={props.diceRollCallback} />
                    {props.children}
                </div>
                {ageModsNotAdded() ? <AgeModAlert /> : null}
            </div>
        </footer>
    );
}

export default Footer;