import React, { useContext } from 'react';
import { InvestigatorSkillsActions } from '../../../../../actions';
import StatsInput from '../../../../../components/StatsInput';
import { TInvestigatorSkill } from '../../../../../constants/types';
import { InvestigatorSkillsContext } from '../../../../../reducers/InvestigatorSkillsReducer';
import { PlayerContext } from '../../../../../reducers/PlayerReducer';
import './InvestigatorSkill.css';

type InvestigatorSkillProps = {
    title?: string;
    customText?: boolean;
    nonOptional?: boolean;
    skill: TInvestigatorSkill;
}

const InvestigatorSkill: React.FC<InvestigatorSkillProps> = (props) => {
    const { state, dispatch } = useContext(InvestigatorSkillsContext);
    const playerState = useContext(PlayerContext);

    const getDefaultValue = (): number | undefined => {
        // @ts-ignore
        if(Object.keys(state[props.skill]).includes('CHECKED') && state[props.skill].CHECKED){
            if (props.skill === 'DODGE') {
                return playerState.state.CHARACTERISTICS.DODGE.INITIAL_VALUE;
            } else if (props.skill === 'LANGUAGE_OWN') {
                return playerState.state.CHARACTERISTICS.EDU.INITIAL_VALUE;
            } else if (state[props.skill].VALUE !== undefined) {
                return state[props.skill].VALUE;
            }
        } else {
            // @ts-ignore
            return state[props.skill].VALUE;
        }
        return undefined;
    }

    const setChecked = () => {
        // @ts-ignore
        if(state[props.skill].CHECKED !== undefined) {
            // @ts-ignore
            dispatch({type: props.skill, value: !state[props.skill].CHECKED});
        }
    }

    return (
        <div className='InvestigatorSkill'>
            {props.nonOptional ? null : <input onClick={setChecked} type="checkbox" />}
            <div className="title-container">
                {props.title ? <span>{props.title}</span> : null}
                {props.customText ? <input type="text" /> : null}
            </div>
            <StatsInput 
                defaultValue={getDefaultValue()} 
                size="small"
                disabled={
                    // @ts-ignore
                    !state[props.skill].CHECKED
                } />
        </div>
    );
}

export default InvestigatorSkill;