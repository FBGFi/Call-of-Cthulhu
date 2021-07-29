import React, { useState } from 'react';
import { formatNumberToLength } from '../../../../../constants/constants';
import AttributeButton from '../AttributeButton';
import './SanityAttributes.css';

const maxSanity = new Array(99);
for (let i = 1; i <= maxSanity.length; i++) {
    maxSanity[i - 1] = i;
}

const SanityAttributes: React.FC = () => {
    const [currentValue, setCurrentValue] = useState<number | null>(null);

    const RenderRows = (start: number, end: number): JSX.Element => {
        return <tr>
            {maxSanity.slice(start - 1, end).map(RenderButtons)}
        </tr>;
    }

    const RenderButtons = (value: number): JSX.Element => {
        return <td key={value}>
            <AttributeButton
                checked={currentValue === value}
                setValue={setCurrentValue}
                attributeType="sanity"
                value={value}
                text={formatNumberToLength(value, maxSanity.length.toString().length)} />
        </td>
    }

    return (
        <div className='SanityAttributes'>
            <table>
                <tbody>
                    <tr>
                        <td><AttributeButton checked={currentValue === 0} setValue={setCurrentValue} attributeType="sanity" value={0} text="Insane" /></td>
                        {maxSanity.slice(0, -92).map(RenderButtons)}
                    </tr>
                    {RenderRows(8, 30)}
                    {RenderRows(31, 53)}
                    {RenderRows(54, 76)}
                    {RenderRows(77, 99)}
                </tbody>
            </table>
            <div className="title-container">
                <h3>Sanity</h3>
            </div>
        </div>
    );
}

export default SanityAttributes;