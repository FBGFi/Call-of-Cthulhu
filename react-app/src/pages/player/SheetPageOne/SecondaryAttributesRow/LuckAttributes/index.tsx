import React, { useState } from 'react';
import { formatNumberToLength } from '../../../../../constants/constants';
import { TableCellData } from '../../../../../constants/types';
import StatButtonRow from '../StatButtonRow';
import './LuckAttributes.css';

const LuckAttributes: React.FC = () => {
    const [currentValue, setCurrentValue] = useState<number | null>(null);

    const tableCells: TableCellData[] = new Array(100);

    tableCells[0] = {
        text: 'Out of Luck',
        value: 0,
        checked: currentValue === 0
    }

    for (let i = 1; i < tableCells.length; i++) {
        tableCells[i] = {
            text: formatNumberToLength(i, "21".length),
            value: i,
            checked: currentValue === i
        }
    }
    return (
        <div className='LuckAttributes'>
            <table>
                <div className="title-container">
                    <h4>Luck</h4>
                </div>
                <tbody>
                    <StatButtonRow cells={tableCells.slice(0, 8)} setValue={setCurrentValue} attributeType="luck" />
                    <StatButtonRow cells={tableCells.slice(8, 31)} setValue={setCurrentValue} attributeType="luck" />
                    <StatButtonRow cells={tableCells.slice(31, 54)} setValue={setCurrentValue} attributeType="luck" />
                    <StatButtonRow cells={tableCells.slice(54, 77)} setValue={setCurrentValue} attributeType="luck" />
                    <StatButtonRow cells={tableCells.slice(77, 100)} setValue={setCurrentValue} attributeType="luck" />
                </tbody>
            </table>
        </div>
    );
}

export default LuckAttributes;