import React, { useRef } from 'react';
import './DiceContainer.css';

import d20 from '../../../assets/images/d20.svg';

type DiceRefs = {
    [key: string]: React.RefObject<HTMLInputElement>
}

type DiceValue = 4 | 6 | 8 | 10 | 12 | 20 | 100;

const DiceContainer: React.FC = () => {
    const rollTimesRef = useRef<HTMLInputElement>(null);

    const diceRefs: DiceRefs = {
        "D4": useRef<HTMLInputElement>(null),
        "D6": useRef<HTMLInputElement>(null),
        "D8": useRef<HTMLInputElement>(null),
        "D10": useRef<HTMLInputElement>(null),
        "D12": useRef<HTMLInputElement>(null),
        "D20": useRef<HTMLInputElement>(null),
        "D100": useRef<HTMLInputElement>(null),
    }

    const rollDice = (diceValue: DiceValue) => {
        let diceKey = 'D' + diceValue;
        if (diceRefs[diceKey]) {
            if (diceRefs[diceKey].current) {
                let value = 0;
                if (rollTimesRef.current) {
                    for (let i = 0; i < parseInt(rollTimesRef.current.value); i++) {
                        value += Math.ceil(Math.random() * diceValue);
                    }
                }

                // TypeScript is fucking stupid
                // @ts-ignore
                diceRefs[diceKey].current.value = value;
            }
        }
    }
    return (
        <div className='DiceContainer'>
            <button className="open-button"><img src={d20} /></button>
            <div className="dice-rolls">
                <div className="row">
                    <span>Times to roll:</span>
                    <input ref={rollTimesRef} defaultValue={1} type="number" />
                </div>
                <div className="row">
                    <button onClick={() => rollDice(4)}>Roll D4</button>
                    <input ref={diceRefs['D4']} disabled type="number" />
                </div>
                <div className="row">
                    <button onClick={() => rollDice(6)}>Roll D6</button>
                    <input ref={diceRefs['D6']} disabled type="number" />
                </div>
                <div className="row">
                    <button onClick={() => rollDice(8)}>Roll D8</button>
                    <input ref={diceRefs['D8']} disabled type="number" />
                </div>
                <div className="row">
                    <button onClick={() => rollDice(10)}>Roll D10</button>
                    <input ref={diceRefs['D10']} disabled type="number" />
                </div>
                <div className="row">
                    <button onClick={() => rollDice(12)}>Roll D12</button>
                    <input ref={diceRefs['D12']} disabled type="number" />
                </div>
                <div className="row">
                    <button onClick={() => rollDice(20)}>Roll D20</button>
                    <input ref={diceRefs['D20']} disabled type="number" />
                </div>
                <div className="row">
                    <button onClick={() => rollDice(100)}>Roll D100</button>
                    <input ref={diceRefs['D100']} disabled type="number" />
                </div>
            </div>
        </div>
    );
}

export default DiceContainer;