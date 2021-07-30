import React, { useState } from 'react';
import { formatNumberToLength } from '../../../../../constants/constants';
import { TableCellData } from '../../../../../constants/types';
import StatButtonRow from '../StatButtonRow';
import './MPAttributes.css';

const MPAttributes: React.FC = () => {
    const [currentValue, setCurrentValue] = useState<number | null>(null);


    const tableCells: TableCellData[] = new Array(25);

    tableCells[0] = {
        text: '00',
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
        <>
            <div className="mp-header">
                <span>Max MP</span>
                <input type="number" placeholder="Max MP" />
            </div>
            <div className='MPAttributes'>
                <div className="mp-stats">
                    <table>
                        <tbody>
                            <StatButtonRow cells={tableCells.slice(0, 5)} setValue={setCurrentValue} attributeType="mp" />
                            <StatButtonRow cells={tableCells.slice(5, 10)} setValue={setCurrentValue} attributeType="mp" />
                            <StatButtonRow cells={tableCells.slice(10, 15)} setValue={setCurrentValue} attributeType="mp" />
                            <StatButtonRow cells={tableCells.slice(15, 20)} setValue={setCurrentValue} attributeType="mp" />
                            <StatButtonRow cells={tableCells.slice(20, 25)} setValue={setCurrentValue} attributeType="mp" />
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