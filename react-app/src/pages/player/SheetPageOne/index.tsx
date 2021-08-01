import React, { CSSProperties, useReducer } from 'react';
import './SheetPageOne.css';

import SheetPage from '../SheetPage';
import MainInfoRow from './MainInfoRow';
import SecondaryAttributesRow from './SecondaryAttributesRow';
import InvestigatorSkillRow from './InvestigatorSkillRow';
import CombatRow from './CombatRow';
import { investigatorSkillsReducer, InitialInvestigatorSkillsState, InvestigatorSkillsContext } from '../../../reducers/InvestigatorSkillsReducer';


type SheetPageOneProps = {
    style?: CSSProperties;
}

const SheetPageOne: React.FC<SheetPageOneProps> = (props) => {
    const [investigatorSkillsState, investigatorSkillsDispatch] = useReducer(investigatorSkillsReducer, InitialInvestigatorSkillsState);
    return (
        <InvestigatorSkillsContext.Provider value={{ state: investigatorSkillsState, dispatch: investigatorSkillsDispatch }}>
            <SheetPage style={props.style} className="SheetPageOne">
                <MainInfoRow />
                <SecondaryAttributesRow />
                <InvestigatorSkillRow />
                <CombatRow />
            </SheetPage>
        </InvestigatorSkillsContext.Provider>
    );
}

export default SheetPageOne;