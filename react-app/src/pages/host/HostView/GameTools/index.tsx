import React from 'react';
import ConnectedPlayers from './ConnectedPlayers';
import './GameTools.css';
import HostChat from './HostChat';
import LocalStorageCharacters from './LocalStorageCharacters';

const GameTools: React.FC = () => {
    return (
        <div className='GameTools'>
            <ConnectedPlayers />
            <LocalStorageCharacters />
            <HostChat />
        </div>
    );
}

export default GameTools;