import React, { useRef } from 'react';
import './StatsInput.css';

type StatsInputProps = {
    size: "small" | "big";
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    defaultValue?: number | undefined;
}

/**
 * @author FBGFi
 * @description Component for 3 fielded stat input with autofills for half and fifth values
 * @param size - small or big
 * @param onBlur - callback function to be called when out of focus
 * @param defaultValue - value to show by default
 */
const StatsInput: React.FC<StatsInputProps> = (props: StatsInputProps) => {
    const mainInputRef = useRef<HTMLInputElement>(null);
    const halfInputRef = useRef<HTMLInputElement>(null);
    const fifthInputRef = useRef<HTMLInputElement>(null);

    const setInputs = () => {
        if (mainInputRef.current && halfInputRef.current && fifthInputRef.current) {
            let mainValue: number = parseInt(mainInputRef.current.value);
            halfInputRef.current.value = `${Math.floor(mainValue / 2)}`;
            fifthInputRef.current.value = `${Math.floor(mainValue / 5)}`;
        }
    }

    return (
        <div className={'StatsInput ' + props.size}>
            <input defaultValue={props.defaultValue} onBlur={props.onBlur} onChange={() => setInputs()} ref={mainInputRef} type="number" className="stat-input main-input" />
            <div className="half-and-fifth">
                <input defaultValue={props.defaultValue ? Math.floor(props.defaultValue / 2) : undefined} ref={halfInputRef} type="number" className="stat-input half-input" readOnly />
                <input defaultValue={props.defaultValue ? Math.floor(props.defaultValue / 5) : undefined} ref={fifthInputRef} type="number" className="stat-input fifth-input" readOnly />
            </div>
        </div>
    );
}

export default StatsInput;