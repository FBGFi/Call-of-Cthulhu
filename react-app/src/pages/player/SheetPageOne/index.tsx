import React from 'react';
import './SheetPageOne.css';

import SheetPage from '../SheetPage';
import MainInfoRow from './MainInfoRow';
import SecondaryAttributesRow from './SecondaryAttributesRow';
import InvestigatorSkillRow from './InvestigatorSkillRow';
import CombatRow from './CombatRow';

const SheetPageOne: React.FC = () => {
    return (
        <SheetPage className="SheetPageOne">
            <MainInfoRow />
            <SecondaryAttributesRow />
            <InvestigatorSkillRow />
            <CombatRow />
        </SheetPage>
    );
}

export default SheetPageOne;