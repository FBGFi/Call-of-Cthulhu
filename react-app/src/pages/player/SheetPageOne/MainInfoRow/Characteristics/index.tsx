import React, { useContext } from 'react';
import InfoBox from '../../../../../components/InfoBox';
import StatsInput from '../../../../../components/StatsInput';
import { PlayerContext } from '../../../../../reducers/PlayerReducer';
import { PlayerActions } from '../../../../../actions';
import './Characteristics.css';

const Characteristics: React.FC = () => {
    const { state, dispatch } = useContext(PlayerContext);

    const setValueForReducer = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {       
        if (Object.keys(PlayerActions.SET_CHARACTERISTICS).includes(field)) {
            // @ts-ignore
            dispatch({ type: PlayerActions.SET_CHARACTERISTICS[field], value: parseInt(e.target.value) });
        }
    }

    return (
        <InfoBox className='Characteristics' title='Characteristics'>
            <div className="stat-row">
                <div className="stat-column">
                    <span>STR</span>
                    <StatsInput defaultValue={
                        state.CHARACTERISTICS.STR.INITIAL_VALUE ? state.CHARACTERISTICS.STR.INITIAL_VALUE + state.CHARACTERISTICS.STR.ADDED_VALUE
                        : undefined
                    } onBlur={(e) => {setValueForReducer(e, "STR")}} size="big" />
                </div>
                <div className="stat-column">
                    <span>DEX</span>
                    <StatsInput defaultValue={
                        state.CHARACTERISTICS.DEX.INITIAL_VALUE ? state.CHARACTERISTICS.DEX.INITIAL_VALUE + state.CHARACTERISTICS.DEX.ADDED_VALUE
                        : undefined
                    } onBlur={(e) => {setValueForReducer(e, "DEX")}} size="big" />
                </div>
                <div className="stat-column">
                    <span>POW</span>
                    <StatsInput defaultValue={
                        state.CHARACTERISTICS.POW.INITIAL_VALUE ? state.CHARACTERISTICS.POW.INITIAL_VALUE + state.CHARACTERISTICS.POW.ADDED_VALUE
                        : undefined
                    } onBlur={(e) => {setValueForReducer(e, "POW")}} size="big" />
                </div>
            </div>
            <div className="stat-row">
                <div className="stat-column">
                    <span>CON</span>
                    <StatsInput defaultValue={
                        state.CHARACTERISTICS.CON.INITIAL_VALUE ? state.CHARACTERISTICS.CON.INITIAL_VALUE + state.CHARACTERISTICS.CON.ADDED_VALUE
                        : undefined
                    } onBlur={(e) => {setValueForReducer(e, "CON")}} size="big" />
                </div>
                <div className="stat-column">
                    <span>APP</span>
                    <StatsInput defaultValue={
                        state.CHARACTERISTICS.APP.INITIAL_VALUE ? state.CHARACTERISTICS.APP.INITIAL_VALUE + state.CHARACTERISTICS.APP.ADDED_VALUE
                        : undefined
                    } onBlur={(e) => {setValueForReducer(e, "APP")}} size="big" />
                </div>
                <div className="stat-column">
                    <span>EDU</span>
                    <StatsInput defaultValue={
                        state.CHARACTERISTICS.EDU.INITIAL_VALUE ? state.CHARACTERISTICS.EDU.INITIAL_VALUE + state.CHARACTERISTICS.EDU.ADDED_VALUE
                        : undefined
                    } onBlur={(e) => {setValueForReducer(e, "EDU")}} size="big" />
                </div>
            </div>
            <div className="stat-row">
                <div className="stat-column">
                    <span>SIZ</span>
                    <StatsInput defaultValue={
                        state.CHARACTERISTICS.SIZ.INITIAL_VALUE ? state.CHARACTERISTICS.SIZ.INITIAL_VALUE + state.CHARACTERISTICS.SIZ.ADDED_VALUE
                        : undefined
                    } onBlur={(e) => {setValueForReducer(e, "SIZ")}} size="big" />
                </div>
                <div className="stat-column">
                    <span>INT</span>
                    <StatsInput defaultValue={
                        state.CHARACTERISTICS.INT.INITIAL_VALUE ? state.CHARACTERISTICS.INT.INITIAL_VALUE + state.CHARACTERISTICS.INT.ADDED_VALUE
                        : undefined
                    } onBlur={(e) => {setValueForReducer(e, "INT")}} size="big" />
                </div>
                <div className="stat-column">
                    <span>Move<br />Rate</span>
                    <input defaultValue={
                        state.CHARACTERISTICS.MOVE.INITIAL_VALUE ? state.CHARACTERISTICS.MOVE.INITIAL_VALUE + state.CHARACTERISTICS.MOVE.ADDED_VALUE
                        : undefined
                    } onBlur={(e) => {setValueForReducer(e, "MOVE")}} type="number" className="move-rate-input" />
                </div>
            </div>
        </InfoBox>
    );
}

export default Characteristics;