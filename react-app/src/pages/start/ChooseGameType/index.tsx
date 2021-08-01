import React from 'react';
import { Link } from 'react-router-dom';
import './ChooseGameType.css';

const ChooseGameType: React.FC = () => {

    return (
        <div className='ChooseGameType'>
            <Link to='/local'>
                <button>Local Game</button>
            </Link>
            <Link to='/hosted'>
                <button>Hosted Game</button>
            </Link>
            <Link to='/host'>
                <button>Host a Game</button>
            </Link>
        </div>
    );
}

export default ChooseGameType;