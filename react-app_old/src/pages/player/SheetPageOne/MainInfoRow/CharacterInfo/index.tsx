import React, { useContext, useState } from 'react';
import InfoBox from '../../../../../components/InfoBox';
import { PlayerContext } from '../../../../../reducers/PlayerReducer';
import { PlayerActions } from '../../../../../actions';
import './CharacterInfo.css';
import { AppContext } from '../../../../../reducers';

const CharacterInfo: React.FC = () => {
    const { state, dispatch } = useContext(PlayerContext);
    const appState = useContext(AppContext).state;
    const [typing, isTyping] = useState(false);

    const setValueForReducer = (e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, field: string) => {
        if (Object.keys(PlayerActions.SET_CHARACTER_INFO).includes(field)) {
            // @ts-ignore
            dispatch({ type: PlayerActions.SET_CHARACTER_INFO[field], value: e.target.value });
        }
    }

    return (
        <InfoBox className='CharacterInfo' title='1920s Era Investigator'>
            <form>
                <div className="form-row">
                    <span>Name</span>
                    <input 
                        onChange={() => {}}
                        onBlur={(e) => setValueForReducer(e, "NAME")} 
                        defaultValue={appState.CLIENT === 'PLAYER' ? state.CHARACTER_INFO.NAME : undefined} 
                        value={appState.CLIENT === 'HOST' ? state.CHARACTER_INFO.NAME : undefined} 
                        type="text" />
                </div>
                <div className="form-row">
                    <span>Player</span>
                    <input 
                        onChange={() => {}}
                        onBlur={(e) => {
                            setValueForReducer(e, "PLAYER");
                            isTyping(false);
                        }} 
                        onFocus={() => isTyping(true)}
                        // for some reason default value wouldnt work on character creation sometimes
                        value={state.CHARACTER_INFO.PLAYER !== "" && !typing ? state.CHARACTER_INFO.PLAYER : undefined} 
                        type="text" />
                </div>
                <div className="form-row">
                    <span>Occupatice</span>
                    <input 
                        onChange={() => {}}
                        onBlur={(e) => setValueForReducer(e, "OCCUPATICE")} 
                        defaultValue={appState.CLIENT === 'PLAYER' ? state.CHARACTER_INFO.OCCUPATICE : undefined} 
                        value={appState.CLIENT === 'HOST' ? state.CHARACTER_INFO.OCCUPATICE : undefined} 
                        type="text" />
                </div>
                <div className="form-row split-row">
                    <div className="form-column">
                        <span>Age</span>
                        <input 
                            onChange={() => {}}
                            onBlur={(e) => setValueForReducer(e, "AGE")} 
                            defaultValue={appState.CLIENT === 'PLAYER' ? state.CHARACTER_INFO.AGE : undefined} 
                            value={appState.CLIENT === 'HOST' ? state.CHARACTER_INFO.AGE : undefined} 
                            type="number" />
                    </div>
                    <div className="form-column">
                        <span>Sex</span>
                        <select 
                            onChange={(e) => setValueForReducer(e, "SEX")} 
                            value={appState.CLIENT === 'HOST' ? state.CHARACTER_INFO.SEX : undefined} 
                            defaultValue={appState.CLIENT === 'PLAYER' ? state.CHARACTER_INFO.SEX : undefined}>
                            <option value="NONE" style={{ display: "none" }}></option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <span>Residence</span>
                    <input 
                        onBlur={(e) => setValueForReducer(e, "RESIDENCE")} 
                        defaultValue={appState.CLIENT === 'PLAYER' ? state.CHARACTER_INFO.RESIDENCE : undefined} 
                        value={appState.CLIENT === 'HOST' ? state.CHARACTER_INFO.RESIDENCE : undefined} 
                        type="text" />
                </div>
                <div className="form-row">
                    <span>Birthplace</span>
                    <input 
                        onBlur={(e) => setValueForReducer(e, "BIRTHPLACE")} 
                        defaultValue={appState.CLIENT === 'PLAYER' ? state.CHARACTER_INFO.BIRTHPLACE : undefined} 
                        value={appState.CLIENT === 'HOST' ? state.CHARACTER_INFO.BIRTHPLACE : undefined} 
                        type="text" />
                </div>
            </form>
        </InfoBox>
    );
}

export default CharacterInfo;