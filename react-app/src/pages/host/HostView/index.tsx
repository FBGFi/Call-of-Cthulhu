import React, { useContext } from 'react';
import { GameHostContext } from '../../../reducers/GameHostReducer';
import GameTools from './GameTools';
import './HostView.css';
import PlayerCard from './PlayerCard';

const HostView: React.FC = () => {
    const {state} = useContext(GameHostContext);
    
    const renderPlayerCards = () : JSX.Element[] => {
        let cards: JSX.Element[] = [];

        for(let id in state.PLAYERS) {
            cards.push(
                <PlayerCard 
                    key={id}
                    player={state.PLAYERS[id].CHARACTER_INFO.PLAYER}
                    character={state.PLAYERS[id].CHARACTER_INFO.NAME}
                    playerId={id} />
                );            
        }


        return cards;
    }

    return (
        <div className='HostView'>
            <div className="player-card-container">
                {renderPlayerCards()}
            </div>
            <GameTools />
        </div>
    );
}

export default HostView;