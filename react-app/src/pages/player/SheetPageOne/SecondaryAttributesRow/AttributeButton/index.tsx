import React from 'react';
import './AttributeButton.css';

type AttributeButtonProps = {
    setValue: (value: number) => void;
    attributeType: string;
    value: number;
    text: string;
    checked?: boolean;
}

const AttributeButton: React.FC<AttributeButtonProps> = (props) => {
    return (
        <button onClick={() => props.setValue(props.value)} className={props.checked ? "AttributeButton checked" : "AttributeButton"}>
            <label htmlFor={props.attributeType + "-value-" + props.value}>{props.text}</label>
            <input onChange={() => {}} checked={props.checked} type="radio" name={props.attributeType + "-value"} value={props.value} />
        </button>
    );
}

export default AttributeButton;