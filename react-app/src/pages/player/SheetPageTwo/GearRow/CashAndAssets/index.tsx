import React from 'react';
import InfoBox from '../../../../../components/InfoBox';
import './CashAndAssets.css';

const CashAndAssets: React.FC = () => {
    return (
        <InfoBox title="Cash & Assets" className='CashAndAssets'>
            <div className="asset-container">
                <div className="row">
                    <span>Spending Level</span>
                    <input type="text" size={1} />
                </div>
                <div className="row">
                    <span>Cash</span>
                    <input type="text" size={1} />
                </div>
                <div className="row">
                    <span>Assets</span>
                    <input type="text" size={1} />
                </div>
                <input type="text" size={1} />
                <input type="text" size={1} />
                <input type="text" size={1} />
                <input type="text" size={1} />
                <input type="text" size={1} />
                <input type="text" size={1} />
                <input type="text" size={1} />
            </div>
        </InfoBox>
    );
}

export default CashAndAssets;