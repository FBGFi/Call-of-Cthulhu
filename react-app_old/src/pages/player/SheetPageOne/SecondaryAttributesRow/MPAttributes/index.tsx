import React, { useContext } from 'react';
import { PlayerActions } from '../../../../../actions';
import { formatNumberToLength } from '../../../../../constants/constants';
import { TableCellData } from '../../../../../constants/types';
import { AppContext } from '../../../../../reducers';
import { PlayerContext } from '../../../../../reducers/PlayerReducer';
import StatButtonRow from '../StatButtonRow';
import './MPAttributes.css';

const MPAttributes: React.FC = () => {
    const { state, dispatch } = useContext(PlayerContext);
    const appState = useContext(AppContext).state;

    const tableCells: TableCellData[] = new Array(25);

    tableCells[0] = {
        text: '00',
        value: 0,
        checked: state.SECONDARY_STATS.MP.INITIAL_VALUE !== undefined && state.SECONDARY_STATS.MP.INITIAL_VALUE + state.SECONDARY_STATS.MP.ADDED_VALUE === 0
    }

    for (let i = 1; i < tableCells.length; i++) {
        tableCells[i] = {
            text: formatNumberToLength(i, "21".length),
            value: i,
            checked: state.SECONDARY_STATS.MP.INITIAL_VALUE !== undefined && state.SECONDARY_STATS.MP.INITIAL_VALUE + state.SECONDARY_STATS.MP.ADDED_VALUE === i

        }
    }

    const setCurrentValue = (value: number) => {
        dispatch({ type: PlayerActions.SET_SECONDARY_STATS.MP.SET_MP, value: value });
    }

    const setMaxMP = (e: React.FocusEvent<HTMLInputElement>) => {
        dispatch({ type: PlayerActions.SET_SECONDARY_STATS.MP.MAX_MP, value: e.target.value });
    }

    return (
        <>
            <div className="mp-header">
                <span>Max MP</span>
                <input 
                    onBlur={setMaxMP} 
                    defaultValue={appState.CLIENT === 'PLAYER' && state.SECONDARY_STATS.MP.MAX_MP ? state.SECONDARY_STATS.MP.MAX_MP: undefined } 
                    value={appState.CLIENT === 'HOST' && state.SECONDARY_STATS.MP.MAX_MP ? state.SECONDARY_STATS.MP.MAX_MP: undefined}
                    type="number" 
                    placeholder="Max MP" />
            </div>
            <div className='MPAttributes'>
                <div className="mp-stats">
                    <table>
                        <tbody>
                            <StatButtonRow cells={tableCells.slice(0, 5)} setValue={setCurrentValue} attributeType="MP" />
                            <StatButtonRow cells={tableCells.slice(5, 10)} setValue={setCurrentValue} attributeType="MP" />
                            <StatButtonRow cells={tableCells.slice(10, 15)} setValue={setCurrentValue} attributeType="MP" />
                            <StatButtonRow cells={tableCells.slice(15, 20)} setValue={setCurrentValue} attributeType="MP" />
                            <StatButtonRow cells={tableCells.slice(20, 25)} setValue={setCurrentValue} attributeType="MP" />
                        </tbody>
                    </table>
                    <div className="title-container">
                        <h4>Magic Points</h4>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MPAttributes;