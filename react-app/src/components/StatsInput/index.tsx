import React, { useRef } from 'react';
import './StatsInput.css';

type StatsInputProps = {
    size: "small" | "big";
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    defaultValue?: number | undefined;
    value?: number | undefined;
    disabled?: boolean;
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
        <div className={props.disabled ? `StatsInput ${props.size} disabled` : 'StatsInput ' + props.size}>
            <input value={props.value} disabled={props.disabled} defaultValue={props.defaultValue} onBlur={props.onBlur} onChange={() => setInputs()} ref={mainInputRef} type="number" className="stat-input main-input" />
            <div className="half-and-fifth">
                <input 
                    value={props.value ? Math.floor(props.value / 2) : undefined}
                    defaultValue={props.defaultValue ? Math.floor(props.defaultValue / 2) : undefined} 
                    ref={halfInputRef} 
                    type="number" 
                    className="stat-input half-input" 
                    readOnly />
                <input 
                    value={props.value ? Math.floor(props.value / 5) : undefined}
                    defaultValue={props.defaultValue ? Math.floor(props.defaultValue / 5) : undefined} 
                    ref={fifthInputRef} 
                    type="number" 
                    className="stat-input fifth-input" 
                    readOnly />
            </div>
        </div>
    );
}

export default StatsInput;