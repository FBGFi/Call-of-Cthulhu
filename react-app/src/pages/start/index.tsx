import React from 'react';
import { Route } from 'react-router-dom';
import InfoBox from '../../components/InfoBox';
import ChooseGameType from './ChooseGameType';
import ChooseHostedGame from './ChooseHostedGame';
import ChooseLocalPlayer from './ChooseLocalPlayer';
import './StartPage.css';

const StartPage: React.FC = () => {
    return(
        <div className='StartPage'>
            <InfoBox title='Call of Cthulhu' className='start-container'>
                <Route path="/" exact component={ChooseGameType} />
                <Route path="/local" exact component={ChooseLocalPlayer} />
                <Route path="/hosted" exact component={ChooseHostedGame} />
            </InfoBox>
        </div>
    );
}

export default StartPage;