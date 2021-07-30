import React from 'react';
import StatsInput from '../../../../../components/StatsInput';
import './InvestigatorSkill.css';

type InvestigatorSkillProps = {
    title?: string;
    customText?: boolean;
    nonOptional?: boolean;
}

const InvestigatorSkill: React.FC<InvestigatorSkillProps> = (props) => {
    return(
        <div className='InvestigatorSkill'>
            {props.nonOptional ? null: <input type="checkbox" />}
            <div className="title-container">
                {props.title ? <span>{props.title}</span> : null}
                {props.customText ? <input type="text" /> : null}
            </div>
            <StatsInput size="small" />
        </div>
    );
}

export default InvestigatorSkill;