import React from 'react';
import InfoBox from '../../../../../components/InfoBox';
import StatsInput from '../../../../../components/StatsInput';
import './Characteristics.css';

const Characteristics: React.FC = () => {
    return (
        <InfoBox className='Characteristics' title='Characteristics'>
            <div className="stat-row">
                <div className="stat-column">
                    <span>STR</span>
                    <StatsInput size="big" />
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