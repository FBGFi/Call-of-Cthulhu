import React, { useContext } from 'react';
import { FellowInvestigatorsActions } from '../../../../../actions';
import InfoBox from '../../../../../components/InfoBox';
import { AppContext } from '../../../../../reducers';
import { FellowInvestigatorsContext } from '../../../../../reducers/FellowInvestigatorsReducer';
import './FellowInvestigators.css';

type FellowInvestigatorProps = {
    playerKey: "PLAYER_1" | "PLAYER_2" | "PLAYER_3" | "PLAYER_4" | "PLAYER_5" | "PLAYER_6" | "PLAYER_7" | "PLAYER_8"
}

const FellowInvestigator: React.FC<FellowInvestigatorProps> = (props) => {
    const { state, dispatch } = useContext(FellowInvestigatorsContext);
    const appState = useContext(AppContext).state;

    const setCharForReducer = (e: React.FocusEvent<HTMLInputElement>) => {
        dispatch({type: FellowInvestigatorsActions[props.playerKey].SET_CHAR, value: e.target.value});
    }

    const setPlayerForReducer = (e: React.FocusEvent<HTMLInputElement>) => {
        dispatch({type: FellowInvestigatorsActions[props.playerKey].SET_PLAYER, value: e.target.value});
    }

    return (
        <div className={`player-container ${props.playerKey}`}>
            <div className="row">
                <span>Char.</span>
                <input 
                    onBlur={setCharForReducer} 
                    defaultValue={appState.CLIENT === 'PLAYER' ? state[props.playerKey].CHAR : undefined} 
                    value={appState.CLIENT === 'HOST' ? state[props.playerKey].CHAR : undefined} 
                    type="text" 
                    size={1} />
            </div>
            <div className="row">
                <span>Player.</span>
                <input 
                    onBlur={setPlayerForReducer} 
                    defaultValue={appState.CLIENT === 'PLAYER' ? state[props.playerKey].PLAYER : undefined} 
                    value={appState.CLIENT === 'HOST' ? state[props.playerKey].PLAYER : undefined} 
                    type="text" 
                    size={1} />
            </div>
        </div>
    );
}

const FellowInvestigators: React.FC = () => {
    return (
        <InfoBox title="Fellow Investigators" className='FellowInvestigators'>
            <div className="investigator-container">
                    <FellowInvestigator playerKey="PLAYER_1" />
                    <FellowInvestigator playerKey="PLAYER_2" />
                    <FellowInvestigator playerKey="PLAYER_3" />
                    <FellowInvestigator playerKey="PLAYER_4" />

                    <div className="me-container">
                        <h1>ME</h1>
                    </div>

                    <FellowInvestigator playerKey="PLAYER_5" />
                    <FellowInvestigator playerKey="PLAYER_6" />
                    <FellowInvestigator playerKey="PLAYER_7" />
                    <FellowInvestigator playerKey="PLAYER_8" />
            </div>
        </InfoBox>
    );
}

export default FellowInvestigators;