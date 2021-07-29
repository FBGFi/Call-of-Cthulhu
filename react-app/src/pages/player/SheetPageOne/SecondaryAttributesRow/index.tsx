import React from 'react';
import SanityAttributes from './SanityAttributes';
import './SecondaryAttributesRow.css';
import SecondaryHeader from './SecondaryHeader';

const SecondaryAttributesRow: React.FC = () => {
    return(
        <div className='SecondaryAttributesRow'>
            <SecondaryHeader />
            <SanityAttributes />
            <div className="hp-attributes"></div>
            <div className="title"></div>
            <div className="mp-attributes"></div>
            <div className="luck-attributes"></div>
        </div>
    );
}

export default SecondaryAttributesRow;