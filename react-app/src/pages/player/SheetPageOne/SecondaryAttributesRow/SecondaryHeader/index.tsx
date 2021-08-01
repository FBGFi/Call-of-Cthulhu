import React, { useContext } from 'react';
import { PlayerActions } from '../../../../../actions';
import { PlayerContext } from '../../../../../reducers/PlayerReducer';
import './SecondaryHeader.css';

const SecondaryHeader: React.FC = () => {
    const { state, dispatch } = useContext(PlayerContext);

    const setCheckBoxValueForReducer = (e: React.MouseEvent<HTMLInputElement, MouseEvent>, stat: {stat: string, field: string}) => {        
        // @ts-ignore
        dispatch({ type: PlayerActions.SET_SECONDARY_STATS[stat.stat][stat.field], value: !state.SECONDARY_STATS[stat.stat][stat.field]});    
    }

    const setTextValueForReducer = (e: React.FocusEvent<HTMLInputElement>, stat: {stat: string, field: string}) => {
        // @ts-ignore
        dispatch({ type: PlayerActions.SET_SECONDARY_STATS[stat.stat][stat.field], value: e.target.value});
    }

    return (
        <div className='SecondaryHeader'>
            <div className="column">
                <span>Major Wound</span>
                <input onChange={()=>{}} onClick={(e) => setCheckBoxValueForReducer(e, {stat: "HP", field: "M_WOUND"})} checked={state.SECONDARY_STATS.HP.M_WOUND} type="checkbox" />
            </div>
            <div className="column">
                <span>Max HP</span>
                <input onChange={()=>{}} onBlur={(e) => setTextValueForReducer(e, {stat: "HP", field: "MAX_HP"})} defaultValue={state.SECONDARY_STATS.HP.MAX_HP} type="number" placeholder="Max HP" />
            </div>
            <div className="column">
                <span>Temp Insane</span>
                <input onChange={()=>{}} onClick={(e) => setCheckBoxValueForReducer(e, {stat: "SANITY", field: "TEMP_INSANE"})} checked={state.SECONDARY_STATS.SANITY.TEMP_INSANE} type="checkbox" />

            </div>
            <div className="column">
                <span>Indef. Insane</span>
                <input onChange={()=>{}} onClick={(e) => setCheckBoxValueForReducer(e, {stat: "SANITY", field: "INDEF_INSANE"})} checked={state.SECONDARY_STATS.SANITY.INDEF_INSANE} type="checkbox" />

            </div>
            <div className="column">
                <span>Start</span>
                <input onChange={()=>{}} onBlur={(e) => setTextValueForReducer(e, {stat: "SANITY", field: "START_SANITY"})} defaultValue={state.SECONDARY_STATS.SANITY.START_SANITY} type="number" placeholder="Start" />
            </div>
            <div className="column">
                <span>Max</span>
                <input onChange={()=>{}} onBlur={(e) => setTextValueForReducer(e, {stat: "SANITY", field: "MAX_SANITY"})} defaultValue={state.SECONDARY_STATS.SANITY.MAX_SANITY} type="number" placeholder="Max" />
            </div>
        </div>
    );
}

export default SecondaryHeader;