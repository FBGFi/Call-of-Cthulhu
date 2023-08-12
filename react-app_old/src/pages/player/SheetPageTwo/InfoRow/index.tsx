import React from 'react';
import SheetRow from '../../../../components/SheetRow';
import FellowInvestigators from './FellowInvestigators';
import './InfoRow.css';
import QuickReference from './QuickReference';

const InfoRow: React.FC = () => {
    return(
        <SheetRow className='InfoRow'>
            <QuickReference />
            <FellowInvestigators />
        </SheetRow>
    );
}

export default InfoRow;