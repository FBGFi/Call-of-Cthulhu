import React, { useContext } from 'react';
import { GameHostContext } from '../../../../../reducers/GameHostReducer';
import ConnectedPlayer from './ConnectedPlayer';
import './ConnectedPlayers.css';

const ConnectedPlayers: React.FC = () => {
    const { state } = useContext(GameHostContext);

    const renderPlayers = (): JSX.Element[] => {
        let players: JSX.Element[] = [];
        
        for(let id in state.PLAYERS) {
            players.push(
                <ConnectedPlayer 
                    key={id}
                    player={state.PLAYERS[id].CHARACTER_INFO.PLAYER}
                    character={state.PLAYERS[id].CHARACTER_INFO.NAME}
                    playerId={id} />
                );            
        }

        return players;
    }

    return (
        <div className='ConnectedPlayers'>
            <div className="title-container">
                <h2>Connected Players</h2>
            </div>
            <div className="players">
                {renderPlayers()}
            </div>
        </div>
    );
}

export default ConnectedPlayers;