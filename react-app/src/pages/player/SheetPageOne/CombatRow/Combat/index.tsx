import React from 'react';
import InfoBox from '../../../../../components/InfoBox';
import StatsInput from '../../../../../components/StatsInput';
import './Combat.css';

const Combat: React.FC = () => {
    return(
        <InfoBox title="Combat" className='Combat'>
            <div className="row">
                <h3>Damage<br/>Bonus</h3>
                <input type="number" />
            </div>
            <div className="row">
                <h3>Build</h3>
                <input type="number" />
            </div>
            <div className="row">
                <h3>Dodge</h3>
                <StatsInput size="big" />
            </div>
        </InfoBox>
    );
}

export default Combat;