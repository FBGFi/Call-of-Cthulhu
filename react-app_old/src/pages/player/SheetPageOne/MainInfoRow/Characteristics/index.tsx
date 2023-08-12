import React, { useContext } from 'react';
import InfoBox from '../../../../../components/InfoBox';
import StatsInput from '../../../../../components/StatsInput';
import { PlayerContext } from '../../../../../reducers/PlayerReducer';
import { PlayerActions } from '../../../../../actions';
import './Characteristics.css';
import { AppContext } from '../../../../../reducers';

const Characteristics: React.FC = () => {
    const { state, dispatch } = useContext(PlayerContext);
    const appState = useContext(AppContext).state;

    const setValueForReducer = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {       
        if (Object.keys(PlayerActions.SET_CHARACTERISTICS).includes(field)) {
            // @ts-ignore
            dispatch({ type: PlayerActions.SET_CHARACTERISTICS[field], value: parseInt(e.target.value) });
        }
    }

    const getValue = (skill: 'STR' | 'DEX' | 'POW' | 'CON' | 'APP' | 'EDU' | 'SIZ' | 'INT' | 'MOVE'): number | undefined=> {
        if(state.CHARACTERISTICS[skill].INITIAL_VALUE){
            // @ts-ignore
            return state.CHARACTERISTICS[skill].INITIAL_VALUE + state.CHARACTERISTICS[skill].ADDED_VALUE;
        }
        return undefined;
    }

    return (
        <InfoBox className='Characteristics' title='Characteristics'>
            <div className="stat-row">
                <div className="stat-column">
                    <span>STR</span>
                    <StatsInput 
                        defaultValue={appState.CLIENT === 'PLAYER' ? getValue('STR') : undefined} 
                        value={appState.CLIENT === 'HOST' ? getValue('STR') : undefined}
                        onBlur={(e) => {setValueForReducer(e, "STR")}} 
                        size="big" />
                </div>
                <div className="stat-column">
                    <span>DEX</span>
                    <StatsInput 
                        defaultValue={appState.CLIENT === 'PLAYER' ? getValue('DEX') : undefined} 
                        value={appState.CLIENT === 'HOST' ? getValue('DEX') : undefined}
                        onBlur={(e) => {setValueForReducer(e, "DEX")}} 
                        size="big" />
                </div>
                <div className="stat-column">
                    <span>POW</span>
                    <StatsInput 
                        defaultValue={appState.CLIENT === 'PLAYER' ? getValue('POW') : undefined} 
                        value={appState.CLIENT === 'HOST' ? getValue('POW') : undefined}
                        onBlur={(e) => {setValueForReducer(e, "POW")}} 
                        size="big" />
                </div>
            </div>
            <div className="stat-row">
                <div className="stat-column">
                    <span>CON</span>
                    <StatsInput 
                        defaultValue={appState.CLIENT === 'PLAYER' ? getValue('CON') : undefined} 
                        value={appState.CLIENT === 'HOST' ? getValue('CON') : undefined}
                        onBlur={(e) => {setValueForReducer(e, "CON")}} 
                        size="big" />
                </div>
                <div className="stat-column">
                    <span>APP</span>
                    <StatsInput 
                        defaultValue={appState.CLIENT === 'PLAYER' ? getValue('APP') : undefined} 
                        value={appState.CLIENT === 'HOST' ? getValue('APP') : undefined} 
                        onBlur={(e) => {setValueForReducer(e, "APP")}} 
                        size="big" />
                </div>
                <div className="stat-column">
                    <span>EDU</span>
                    <StatsInput 
                        defaultValue={appState.CLIENT === 'PLAYER' ? getValue('EDU') : undefined} 
                        value={appState.CLIENT === 'HOST' ? getValue('EDU') : undefined}
                        onBlur={(e) => {setValueForReducer(e, "EDU")}} 
                        size="big" />
                </div>
            </div>
            <div className="stat-row">
                <div className="stat-column">
                    <span>SIZ</span>
                    <StatsInput 
                        defaultValue={appState.CLIENT === 'PLAYER' ? getValue('SIZ') : undefined} 
                        value={appState.CLIENT === 'HOST' ? getValue('SIZ') : undefined}
                        onBlur={(e) => {setValueForReducer(e, "SIZ")}} 
                        size="big" />
                </div>
                <div className="stat-column">
                    <span>INT</span>
                    <StatsInput 
                        defaultValue={appState.CLIENT === 'PLAYER' ? getValue('INT') : undefined} 
                        value={appState.CLIENT === 'HOST' ? getValue('INT') : undefined}
                        onBlur={(e) => {setValueForReducer(e, "INT")}} 
                        size="big" />
                </div>
                <div className="stat-column">
                    <span>Move<br />Rate</span>
                    <input 
                        defaultValue={appState.CLIENT === 'PLAYER' ? getValue('MOVE') : undefined} 
                        value={appState.CLIENT === 'HOST' ? getValue('MOVE') : undefined}
                        onBlur={(e) => {setValueForReducer(e, "MOVE")}} 
                        type="number" 
                        className="move-rate-input" />
                </div>
            </div>
        </InfoBox>
    );
}

export default Characteristics;