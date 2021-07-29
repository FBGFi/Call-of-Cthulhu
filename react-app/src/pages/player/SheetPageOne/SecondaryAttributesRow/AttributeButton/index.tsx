import React from 'react';
import './AttributeButton.css';

type AttributeButton = {
    setValue: React.Dispatch<React.SetStateAction<number | null>>;
    attributeType: string;
    value: number;
    text: string;
    checked?: boolean;
}

const AttributeButton: React.FC<AttributeButton> = (props) => {
    return (
        <button onClick={() => props.setValue(props.value)} className={props.checked ? "AttributeButton checked" : "AttributeButton"}>
            <label htmlFor={props.attributeType + "-value-" + props.value}>{props.text}</label>
            <input type="radio" name={props.attributeType + "-value-" + props.value} value={props.value} />
        </button>
    );
}

export default AttributeButton;