import React from 'react';
import HPAttributes from './HPAttributes';
import LuckAttributes from './LuckAttributes';
import MPAttributes from './MPAttributes';
import SanityAttributes from './SanityAttributes';
import './SecondaryAttributesRow.css';
import SecondaryHeader from './SecondaryHeader';

const SecondaryAttributesRow: React.FC = () => {
    return(
        <div className='SecondaryAttributesRow'>
            <SecondaryHeader />
            <SanityAttributes />
            <HPAttributes />
            <div className="title"><h1>Call of Cthulhu</h1></div>
            <MPAttributes />
            <LuckAttributes />
        </div>
    );
}

export default SecondaryAttributesRow;