import React, { CSSProperties } from 'react';
import './SheetPageOne.css';

import SheetPage from '../SheetPage';
import MainInfoRow from './MainInfoRow';
import SecondaryAttributesRow from './SecondaryAttributesRow';
import InvestigatorSkillRow from './InvestigatorSkillRow';
import CombatRow from './CombatRow';

type SheetPageOneProps = {  
    style?: CSSProperties;
}

const SheetPageOne: React.FC<SheetPageOneProps> = (props) => {
    return (
        <SheetPage style={props.style} className="SheetPageOne">
            <MainInfoRow />
            <SecondaryAttributesRow />
            <InvestigatorSkillRow />
            <CombatRow />
        </SheetPage>
    );
}

export default SheetPageOne;