import React, {useState} from 'react';
import { formatNumberToLength } from '../../../../../constants/constants';
import { TableCellData } from '../../../../../constants/types';
import StatButtonRow from '../StatButtonRow';
import './HPAttributes.css';

const HPAttributes: React.FC = () => {
    const [currentValue, setCurrentValue] = useState<number | null>(null);

    
    const tableCells: TableCellData[] = new Array(21);

    tableCells[0] = {
        text: '(00)',
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

    return(
        <div className='HPAttributes'>
            <div className="title-container">
                <h4>Hit Points</h4>
            </div>
            <div className="hp-stats">
                <div className="hp-header">
                    <span>Dying</span>
                    <input type="checkbox"/>
                    <span>Unconscious</span>
                    <input type="checkbox"/>
                </div>
                <table>
                    <tbody>
                        <StatButtonRow cells={tableCells.slice(0, 7)} setValue={setCurrentValue} attributeType="hp" />
                        <StatButtonRow cells={tableCells.slice(7, 14)} setValue={setCurrentValue} attributeType="hp" />
                        <StatButtonRow cells={tableCells.slice(14, 21)} setValue={setCurrentValue} attributeType="hp" />           
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default HPAttributes;