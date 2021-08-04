import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppActions from '../../../actions';
import { AppContext } from '../../../reducers';
import './ChooseGameType.css';

const ChooseGameType: React.FC = () => {
    const { dispatch } = useContext(AppContext);
    return (
        <div className='ChooseGameType'>
            <Link to='/local'>
                <button onClick={() => {
                    dispatch({type: AppActions.SET_CLIENT, value: 'PLAYER'});
                }}>Local Game</button>
            </Link>
            <Link to='/hosted'>
                <button onClick={() => {
                    dispatch({type: AppActions.SET_CLIENT, value: 'PLAYER'});
                    }}>Join a Game</button>
            </Link>
            <Link to='/host'>
                <button onClick={() => {
                    dispatch({type: AppActions.SET_CLIENT, value: 'HOST'});
                    }}>Host a Game</button>
            </Link>
        </div>
    );
}

export default ChooseGameType;