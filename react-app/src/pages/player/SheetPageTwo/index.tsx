import React from 'react';
import SheetPage from '../SheetPage';
import BackstoryRow from './BackstoryRow';
import GearRow from './GearRow';
import InfoRow from './InfoRow';
import './SheetPageTwo.css';

const SheetPageTwo: React.FC = () => {
    return(
        <SheetPage className="SheetPageTwo">
            <BackstoryRow />
            <GearRow />
            <InfoRow />
        </SheetPage>
    );
}

export default SheetPageTwo;