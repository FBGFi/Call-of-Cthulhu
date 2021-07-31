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
            dispatch({ type: PlayerActions.SET_CHARACTERISTICS[field], value: e.target.value });
        }
    }

    return (
        <InfoBox className='Characteristics' title='Characteristics'>
            <div className="stat-row">
                <div className="stat-column">
                    <span>STR</span>
                    <StatsInput onBlur={(e) => {setValueForReducer(e, "STR")}} size="big" />
                </div>
                <div className="stat-column">
                    <span>DEX</span>
                    <StatsInput size="big" />
                </div>
                <div className="stat-column">
                    <span>POW</span>
                    <StatsInput size="big" />
                </div>
            </div>
            <div className="stat-row">
                <div className="stat-column">
                    <span>CON</span>
                    <StatsInput size="big" />
                </div>
                <div className="stat-column">
                    <span>APP</span>
                    <StatsInput size="big" />
                </div>
                <div className="stat-column">
                    <span>EDU</span>
                    <StatsInput size="big" />
                </div>
            </div>
            <div className="stat-row">
                <div className="stat-column">
                    <span>SIZ</span>
                    <StatsInput size="big" />
                </div>
                <div className="stat-column">
                    <span>INT</span>
                    <StatsInput size="big" />
                </div>
                <div className="stat-column">
                    <span>Move<br />Rate</span>
                    <input type="number" className="move-rate-input" />
                </div>
            </div>
        </InfoBox>
    );
}

export default Characteristics;