import React, { useContext } from 'react';
import { PlayerActions } from '../../../../../actions';
import { formatNumberToLength } from '../../../../../constants/constants';
import { TableCellData } from '../../../../../constants/types';
import { PlayerContext } from '../../../../../reducers/PlayerReducer';
import StatButtonRow from '../StatButtonRow';
import './SanityAttributes.css';

const SanityAttributes: React.FC = () => {
    const { state, dispatch } = useContext(PlayerContext);

    const tableCells: TableCellData[] = new Array(100);

    tableCells[0] = {
        text: 'Insane',
        value: 0,
        checked: state.SECONDARY_STATS.SANITY.INITIAL_VALUE !== undefined && state.SECONDARY_STATS.SANITY.INITIAL_VALUE + state.SECONDARY_STATS.SANITY.ADDED_VALUE === 0
    }

    for (let i = 1; i < tableCells.length; i++) {
        tableCells[i] = {
            text: formatNumberToLength(i, "99".length),
            value: i,    
            checked: state.SECONDARY_STATS.SANITY.INITIAL_VALUE !== undefined && state.SECONDARY_STATS.SANITY.INITIAL_VALUE + state.SECONDARY_STATS.SANITY.ADDED_VALUE === i
        }

    }

    const setCurrentValue = (value: number) => {
        dispatch({ type: PlayerActions.SET_SECONDARY_STATS.SANITY.SET_SANITY, value: value });
    }

    return (
        <div className='SanityAttributes'>
            <table>
                <tbody>
                    <StatButtonRow cells={tableCells.slice(0, 8)} setValue={setCurrentValue} attributeType="SANITY" />
                    <StatButtonRow cells={tableCells.slice(8, 31)} setValue={setCurrentValue} attributeType="SANITY" />
                    <StatButtonRow cells={tableCells.slice(31, 54)} setValue={setCurrentValue} attributeType="SANITY" />
                    <StatButtonRow cells={tableCells.slice(54, 77)} setValue={setCurrentValue} attributeType="SANITY" />
                    <StatButtonRow cells={tableCells.slice(77, 100)} setValue={setCurrentValue} attributeType="SANITY" />
                </tbody>
            </table>
            <div className="title-container">
                <h4>Sanity</h4>
            </div>
        </div>
    );
}

export default SanityAttributes;