import React, { useContext } from 'react';
import { PlayerActions } from '../../../../../actions';
import { formatNumberToLength } from '../../../../../constants/constants';
import { TableCellData } from '../../../../../constants/types';
import { PlayerContext } from '../../../../../reducers/PlayerReducer';
import StatButtonRow from '../StatButtonRow';
import './HPAttributes.css';

const HPAttributes: React.FC = () => {
    const { state, dispatch } = useContext(PlayerContext);

    const tableCells: TableCellData[] = new Array(21);

    tableCells[0] = {
        text: '(00)',
        value: 0,
        checked: state.SECONDARY_STATS.HP.INITIAL_VALUE !== undefined && state.SECONDARY_STATS.HP.INITIAL_VALUE + state.SECONDARY_STATS.HP.ADDED_VALUE === 0
    }

    for (let i = 1; i < tableCells.length; i++) {
        tableCells[i] = {
            text: formatNumberToLength(i, "21".length),
            value: i,
            checked: state.SECONDARY_STATS.HP.INITIAL_VALUE !== undefined && state.SECONDARY_STATS.HP.INITIAL_VALUE + state.SECONDARY_STATS.HP.ADDED_VALUE === i
        }

    }

    const setCurrentValue = (value: number) => {
        dispatch({ type: PlayerActions.SET_SECONDARY_STATS.HP.SET_HP, value: value});
    }

    return (
        <div className='HPAttributes'>
            <div className="title-container">
                <h4>Hit Points</h4>
            </div>
            <div className="hp-stats">
                <div className="hp-header">
                    <span>Dying</span>
                    <input type="checkbox" />
                    <span>Unconscious</span>
                    <input type="checkbox" />
                </div>
                <table>
                    <tbody>
                        <StatButtonRow cells={tableCells.slice(0, 7)} setValue={setCurrentValue} attributeType="HP" />
                        <StatButtonRow cells={tableCells.slice(7, 14)} setValue={setCurrentValue} attributeType="HP" />
                        <StatButtonRow cells={tableCells.slice(14, 21)} setValue={setCurrentValue} attributeType="HP" />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default HPAttributes;