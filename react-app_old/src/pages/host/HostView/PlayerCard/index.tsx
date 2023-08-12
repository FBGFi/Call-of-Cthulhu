import React from 'react';
import './PlayerCard.css';

import { Link } from 'react-router-dom';

type PlayerCardProps = {
    character: string;
    player: string;
    playerId: string;
    playerImg: string | undefined;
}

const PlayerCard: React.FC<PlayerCardProps> = (props) => {
    return (
        <div className='PlayerCard'>
            <Link to={'/host/game/' + props.playerId}>
                <img src={props.playerImg} />
                <div className="player-name-container">
                    <h3>{props.character} - {props.player}</h3>
                </div>
            </Link>
        </div>
    );
}

export default PlayerCard;