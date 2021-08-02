import React from 'react';
import ConnectedPlayers from './ConnectedPlayers';
import './GameTools.css';
import HostChat from './HostChat';

const GameTools: React.FC = () => {
    return (
        <div className='GameTools'>
            <ConnectedPlayers />
            <HostChat />
        </div>
    );
}

export default GameTools;