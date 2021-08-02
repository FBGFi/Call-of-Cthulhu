import React, { useContext, useEffect } from 'react';
import { GameHostContext } from '../../../reducers/GameHostReducer';
import GameTools from './GameTools';
import './HostView.css';
import PlayerCard from './PlayerCard';
import publicIp from 'public-ip'
import { GameHostActions } from '../../../actions';

const HostView: React.FC = () => {
    const { state, dispatch } = useContext(GameHostContext);

    const renderPlayerCards = (): JSX.Element[] => {
        let cards: JSX.Element[] = [];

        for (let id in state.PLAYERS) {
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

    const getYourIp = async () => {
        let data = await publicIp.v4({
            fallbackUrls: ["https://ifconfig.co/ip"]
        });
        dispatch({type: GameHostActions.SET_HOST_IP, value: data});
    }

    useEffect(() => {
        getYourIp();
    }, []);

    return (
        <div className='HostView'>
            <div className="room-info-container">
                <span><b>Room address:</b> {state.IP_ADDRESS}:{state.PORT}</span>
                <span><b>Room code:</b> {state.ROOM_CODE}</span>
            </div>
            <div className="player-card-container">
                {renderPlayerCards()}
            </div>
            <GameTools />
        </div>
    );
}

export default HostView;