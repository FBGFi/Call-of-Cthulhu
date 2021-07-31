import React, { useRef } from 'react';
import './StatsInput.css';

type StatsInputProps = {
    size: "small" | "big",
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

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
            <input onBlur={props.onBlur} onChange={() => setInputs()} ref={mainInputRef} type="number" className="stat-input main-input" />
            <div className="half-and-fifth">
                <input ref={halfInputRef} type="number" className="stat-input half-input" readOnly />
                <input ref={fifthInputRef} type="number" className="stat-input fifth-input" readOnly />
            </div>
        </div>
    );
}

export default StatsInput;