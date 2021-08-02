import React from 'react';
import './PlayerCard.css';

import profileImg from '../../../../assets/images/profile.jpg';
import { Link } from 'react-router-dom';

type PlayerCardProps = {
    character: string;
    player: string;
    playerId: string;
}

const PlayerCard: React.FC<PlayerCardProps> = (props) => {
    return (
        <div className='PlayerCard'>
            <Link to={'/host/game/' + props.playerId}>
                <img src={profileImg} alt="player" />
                <div className="player-name-container">
                    <h3>{props.character} - {props.player}</h3>
                </div>
            </Link>
        </div>
    );
}

export default PlayerCard;