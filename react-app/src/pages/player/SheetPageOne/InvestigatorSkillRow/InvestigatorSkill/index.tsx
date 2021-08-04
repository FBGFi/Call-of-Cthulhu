import React, { useContext } from 'react';
import StatsInput from '../../../../../components/StatsInput';
import { TInvestigatorSkill } from '../../../../../constants/types';
import { AppContext } from '../../../../../reducers';
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
    const appState = useContext(AppContext).state;
    const playerState = useContext(PlayerContext);

    const getDefaultValue = (): number | undefined => {   
        // @ts-ignore
        if(Object.keys(state[props.skill]).includes('CHECKED') && state[props.skill].CHECKED){
            if (props.skill === 'DODGE' && playerState.state.CHARACTERISTICS.DODGE.INITIAL_VALUE) {
                return playerState.state.CHARACTERISTICS.DODGE.INITIAL_VALUE + playerState.state.CHARACTERISTICS.DODGE.ADDED_VALUE;
            } else if (props.skill === 'LANGUAGE_OWN' && playerState.state.CHARACTERISTICS.EDU.INITIAL_VALUE) {
                return playerState.state.CHARACTERISTICS.EDU.INITIAL_VALUE + playerState.state.CHARACTERISTICS.EDU.ADDED_VALUE;
            } 
            // @ts-ignore
            else if (state[props.skill].VALUE !== undefined) {
                // @ts-ignore
                return state[props.skill].VALUE;
            }
        } else if(!Object.keys(state[props.skill]).includes('CHECKED')) {
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

    const setValue = (e: React.FocusEvent<HTMLInputElement>) => {     
        console.log(state[props.skill]);
          
        // @ts-ignore
        if(Object.keys(state[props.skill]).includes('VALUE')) {
            // @ts-ignore
            dispatch({type: props.skill, value: parseInt(e.target.value)});
        }
    }

    const setCustomText = (e: React.FocusEvent<HTMLInputElement>) => {
        // @ts-ignore
        if(state[props.skill].CUSTOM_TEXT !== undefined) {
            // @ts-ignore
            dispatch({type: props.skill, value: e.target.value});
        }
    }

    return (
        <div className='InvestigatorSkill'>
            {props.nonOptional ? null : <input checked={
                // @ts-ignore
                state[props.skill].CHECKED
            } onClick={setChecked} onChange={() => {}} type="checkbox" />}
            <div className="title-container">
                {props.title ? <span>{props.title}</span> : null}
                {props.customText ? <input 
                defaultValue={
                    // @ts-ignore
                    appState.CLIENT === 'PLAYER' ? state[props.skill].CUSTOM_TEXT : undefined
                } 
                value={
                    // @ts-ignore
                    appState.CLIENT === 'HOST' ? state[props.skill].CUSTOM_TEXT : undefined
                } 
                onBlur={setCustomText} 
                type="text" /> : null}
            </div>
            <StatsInput 
                defaultValue={appState.CLIENT === 'PLAYER' ? getDefaultValue() : undefined} 
                value={appState.CLIENT === 'HOST' ? getDefaultValue() : undefined}
                size="small"
                onBlur={setValue}
                disabled={
                    // @ts-ignore
                    !state[props.skill].CHECKED && !props.nonOptional
                } />
        </div>
    );
}

export default InvestigatorSkill;