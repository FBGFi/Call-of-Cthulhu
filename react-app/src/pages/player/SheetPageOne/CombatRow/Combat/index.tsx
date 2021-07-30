import React from 'react';
import InfoBox from '../../../../../components/InfoBox';
import StatsInput from '../../../../../components/StatsInput';
import './Combat.css';

const Combat: React.FC = () => {
    return(
        <InfoBox title="Combat" className='Combat'>
            <div className="row">
                <h2>Damage<br/>Bonus</h2>
                <input type="number" />
            </div>
            <div className="row">
                <h2>Build</h2>
                <input type="number" />
            </div>
            <div className="row">
                <h2>Dodge</h2>
                <StatsInput size="big" />
            </div>
        </InfoBox>
    );
}

export default Combat;