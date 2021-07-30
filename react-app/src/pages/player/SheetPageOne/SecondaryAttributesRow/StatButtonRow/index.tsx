import React from 'react';
import { TableCellData } from '../../../../../constants/types';
import AttributeButton from '../AttributeButton';
import './StatButtonRow.css';

type StatButtonRowProps = {
    cells: TableCellData[];
    setValue: React.Dispatch<React.SetStateAction<number | null>>;
    attributeType: string;
}

const StatButtonRow: React.FC<StatButtonRowProps> = (props) => {

    const RenderRow = (): JSX.Element[] => {
        const cells: JSX.Element[] = [];

        for (let i = 0; i < props.cells.length; i++) {
            cells.push(
                <td>
                    <AttributeButton
                        checked={props.cells[i].checked}
                        setValue={props.setValue}
                        attributeType={props.attributeType}
                        value={props.cells[i].value}
                        text={props.cells[i].text}
                    />
                </td>
            );
        }

        return cells;
    }

    return (
        <tr className='StatButtonRow'>
            {RenderRow()}
        </tr>
    );
}

export default StatButtonRow;