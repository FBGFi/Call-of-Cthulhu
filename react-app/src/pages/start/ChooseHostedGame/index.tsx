import React from 'react';
import './ChooseHostedGame.css';

const ChooseHostedGame: React.FC = () => {
    return(
        <div className='ChooseHostedGame'>
            <span>Room address and port</span>
            <input type="text" />
            <span>Room code</span>
            <input type="text" />
            <button>Join Game</button>
        </div>
    );
}

export default ChooseHostedGame;