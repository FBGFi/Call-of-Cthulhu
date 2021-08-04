import React, { useContext } from 'react';
import { PlayerActions } from '../../../../../actions';
import InfoBox from '../../../../../components/InfoBox';
import StatsInput from '../../../../../components/StatsInput';
import { AppContext } from '../../../../../reducers';
import { PlayerContext } from '../../../../../reducers/PlayerReducer';
import './Combat.css';
const Combat: React.FC = () => {
    const {state, dispatch} = useContext(PlayerContext);
    const appState = useContext(AppContext).state;

    const setDmgOrBuild = (e: React.FocusEvent<HTMLInputElement>, field: "DMG_BONUS" | "BUILD") => {
        dispatch({ type: PlayerActions.SET_CHARACTERISTICS[field], value: e.target.value });
    }

    const setDodge = (e: React.FocusEvent<HTMLInputElement>) => {
        dispatch({ type: PlayerActions.SET_CHARACTERISTICS.DODGE, value: e.target.value });
    }

    return (
        <InfoBox title="Combat" className='Combat'>
            <div className="row">
                <h3>Damage<br />Bonus</h3>
                <input 
                    onBlur={(e) => setDmgOrBuild(e, "DMG_BONUS")} 
                    value={appState.CLIENT === "HOST" ? state.CHARACTERISTICS.DMG_BONUS : undefined} 
                    defaultValue={appState.CLIENT === "HOST" ? undefined : state.CHARACTERISTICS.DMG_BONUS} 
                    type="text" />
            </div>
            <div className="row">
                <h3>Build</h3>
                <input 
                    onBlur={(e) => setDmgOrBuild(e, "BUILD")} 
                    value={appState.CLIENT === "HOST" ? state.CHARACTERISTICS.BUILD : undefined} 
                    defaultValue={appState.CLIENT === "HOST" ? undefined : state.CHARACTERISTICS.BUILD} 
                    type="text" />
            </div>
            <div className="row">
                <h3>Dodge</h3>
                <StatsInput 
                    size="big" 
                    onBlur={(e) => setDodge(e)} 
                    value={appState.CLIENT === "HOST" && state.CHARACTERISTICS.DODGE.INITIAL_VALUE ? state.CHARACTERISTICS.DODGE.INITIAL_VALUE + state.CHARACTERISTICS.DODGE.ADDED_VALUE : undefined} 
                    defaultValue={appState.CLIENT === "PLAYER" && state.CHARACTERISTICS.DODGE.INITIAL_VALUE ? state.CHARACTERISTICS.DODGE.INITIAL_VALUE + state.CHARACTERISTICS.DODGE.ADDED_VALUE : undefined}/>
            </div>
        </InfoBox>
    );
}

export default Combat;