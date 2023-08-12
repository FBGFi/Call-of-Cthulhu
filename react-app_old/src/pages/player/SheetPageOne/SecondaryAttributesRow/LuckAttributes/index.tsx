import React, { useContext } from 'react';
import { PlayerActions } from '../../../../../actions';
import { formatNumberToLength } from '../../../../../constants/constants';
import { TableCellData } from '../../../../../constants/types';
import { PlayerContext } from '../../../../../reducers/PlayerReducer';
import StatButtonRow from '../StatButtonRow';
import './LuckAttributes.css';

const LuckAttributes: React.FC = () => {
    const { state, dispatch } = useContext(PlayerContext);

    const tableCells: TableCellData[] = new Array(100);

    tableCells[0] = {
        text: 'Out of Luck',
        value: 0,
        checked: state.SECONDARY_STATS.LUCK.INITIAL_VALUE !== undefined && state.SECONDARY_STATS.LUCK.INITIAL_VALUE + state.SECONDARY_STATS.LUCK.ADDED_VALUE === 0
    }

    for (let i = 1; i < tableCells.length; i++) {
        tableCells[i] = {
            text: formatNumberToLength(i, "21".length),
            value: i,
            checked: state.SECONDARY_STATS.LUCK.INITIAL_VALUE !== undefined && state.SECONDARY_STATS.LUCK.INITIAL_VALUE + state.SECONDARY_STATS.LUCK.ADDED_VALUE === i
        }
    }

    const setCurrentValue = (value: number) => {
        dispatch({ type: PlayerActions.SET_SECONDARY_STATS.LUCK, value: value });
    }
    return (
        <div className='LuckAttributes'>
            <table>
                <div className="title-container">
                    <h4>Luck</h4>
                </div>
                <tbody>
                    <StatButtonRow cells={tableCells.slice(0, 8)} setValue={setCurrentValue} attributeType="LUCK" />
                    <StatButtonRow cells={tableCells.slice(8, 31)} setValue={setCurrentValue} attributeType="LUCK" />
                    <StatButtonRow cells={tableCells.slice(31, 54)} setValue={setCurrentValue} attributeType="LUCK" />
                    <StatButtonRow cells={tableCells.slice(54, 77)} setValue={setCurrentValue} attributeType="LUCK" />
                    <StatButtonRow cells={tableCells.slice(77, 100)} setValue={setCurrentValue} attributeType="LUCK" />
                </tbody>
            </table>
        </div>
    );
}

export default LuckAttributes;