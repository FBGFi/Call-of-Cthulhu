import React from 'react';
import { Link } from 'react-router-dom';
import SavedCharacters from '../SavedCharacters';
import './ChooseLocalPlayer.css';

const ChooseLocalPlayer: React.FC = () => {
    return (
        <div className='ChooseLocalPlayer'>
            <SavedCharacters />

            <Link to='/local/game'>
                <button>New Character</button>
            </Link>
        </div>
    );
}

export default ChooseLocalPlayer;