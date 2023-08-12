import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import SavedCharacters from '../SavedCharacters';
import './ChooseLocalPlayer.css';

const ChooseLocalPlayer: React.FC = () => {
    const [maxCharsReached, isMaxCharsReached] = useState(true);

    const checkIfStorageExceeded = () => {
        // Max 4MB of characters to save
        if (window.localStorage.CALL_OF_CTHULHU && window.localStorage.CALL_OF_CTHULHU.length < 5500000) {
            isMaxCharsReached(false);
        } else {
            window.alert('Maximum number of saved characters reached');
        }
    }

    if (!maxCharsReached) {
        return <Redirect to='/local/game' />
    }

    return (
        <div className='ChooseLocalPlayer'>
            <SavedCharacters />
            <button onClick={checkIfStorageExceeded}>New Character</button>
            <Link to='/'>
                <button>Back</button>
            </Link>
        </div>
    );
}

export default ChooseLocalPlayer;