import React from 'react';
import SheetRow from '../../../../components/SheetRow';
import CashAndAssets from './CashAndAssets';
import GearAndPossessions from './GearAndPossessions';
import './GearRow.css';

const GearRow: React.FC = () => {
    return(
        <SheetRow className='GearRow'>
            <GearAndPossessions />
            <CashAndAssets />
        </SheetRow>
    );
}

export default GearRow;