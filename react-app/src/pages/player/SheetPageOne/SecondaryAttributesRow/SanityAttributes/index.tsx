import React, { useState } from 'react';
import { formatNumberToLength } from '../../../../../constants/constants';
import { TableCellData } from '../../../../../constants/types';
import StatButtonRow from '../StatButtonRow';
import './SanityAttributes.css';

const SanityAttributes: React.FC = () => {
    const [currentValue, setCurrentValue] = useState<number | null>(null);

    const tableCells: TableCellData[] = new Array(100);

    tableCells[0] = {
        text: 'Insane',
        value: 0,
        checked: currentValue === 0
    }

    for (let i = 1; i < tableCells.length; i++) {
        tableCells[i] = {
            text: formatNumberToLength(i, "99".length),
            value: i,
            checked: currentValue === i
        }
        
    }

    return (
        <div className='SanityAttributes'>
            <table>
                <tbody>
                    <StatButtonRow cells={tableCells.slice(0, 8)} setValue={setCurrentValue} attributeType="sanity" />
                    <StatButtonRow cells={tableCells.slice(8, 31)} setValue={setCurrentValue} attributeType="sanity" />
                    <StatButtonRow cells={tableCells.slice(31, 54)} setValue={setCurrentValue} attributeType="sanity" />
                    <StatButtonRow cells={tableCells.slice(54, 77)} setValue={setCurrentValue} attributeType="sanity" />
                    <StatButtonRow cells={tableCells.slice(77, 100)} setValue={setCurrentValue} attributeType="sanity" />
                </tbody>
            </table>
            <div className="title-container">
                <h4>Sanity</h4>
            </div>
        </div>
    );
}

export default SanityAttributes;