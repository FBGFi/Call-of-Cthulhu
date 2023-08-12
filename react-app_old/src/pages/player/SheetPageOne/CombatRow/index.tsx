import React from 'react';
import SheetRow from '../../../../components/SheetRow';
import Combat from './Combat';
import './CombatRow.css';
import Weapons from './Weapons';

const CombatRow: React.FC = () => {
    return(
        <SheetRow className='CombatRow'>
            <Weapons />
            <Combat />
        </SheetRow>
    );
}

export default CombatRow;