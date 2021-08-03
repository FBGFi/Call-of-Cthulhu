import React, { useReducer } from 'react';
import { Route, useLocation } from 'react-router-dom';
import InfoBox from '../../components/InfoBox';
import { hostedGameReducer, InitialHostedGameState, HostedGameContext } from '../../reducers/HostedGameReducer';
import HostedGame from '../game/HostedGame';
import ChooseGameType from './ChooseGameType';
import ChooseHostedGame from './ChooseHostedGame';
import ChooseLocalPlayer from './ChooseLocalPlayer';
import './StartPage.css';

const StartPage: React.FC = () => {
    const [state, dispatch] = useReducer(hostedGameReducer, InitialHostedGameState);
    const location = useLocation();
    return (
        <div className={'StartPage ' + location.pathname}>

            <Route path="/" exact>
                <InfoBox title='Call of Cthulhu' className='start-container'>
                    <ChooseGameType />
                </InfoBox>
            </Route>

            <Route path="/local" exact>
                <InfoBox title='Call of Cthulhu' className='start-container'>
                    <ChooseLocalPlayer />
                </InfoBox>
            </Route>
            <HostedGameContext.Provider value={{ state, dispatch }}>
                <Route path="/hosted" exact>
                    <InfoBox title='Call of Cthulhu' className='start-container'>
                        <ChooseHostedGame />
                    </InfoBox>
                </Route>
                <Route path="/hosted/game/:playerId" component={HostedGame} />
            </ HostedGameContext.Provider>
        </div>
    );
}

export default StartPage;