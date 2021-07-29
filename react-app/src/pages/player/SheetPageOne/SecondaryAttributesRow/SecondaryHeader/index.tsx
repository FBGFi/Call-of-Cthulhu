import React from 'react';
import './SecondaryHeader.css';

const SecondaryHeader: React.FC = () => {
    return(
        <div className='SecondaryHeader'>
            <div className="column">
                <span>Major Wound</span>
                <input type="checkbox" />
            </div>
            <div className="column">
                <span>Max HP</span>
                <input type="number" placeholder="Max HP" />
            </div>
            <div className="column">
                <span>Temp Insane</span>
                <input type="checkbox" />
                
            </div>
            <div className="column">
                <span>Indef. Insane</span>
                <input type="checkbox" />

            </div>
            <div className="column">
                <span>Start</span>
                <input type="number" placeholder="Start" />
            </div>
            <div className="column">
                <span>Max</span>
                <input type="number" placeholder="Max" />
            </div>
        </div>
    );
}

export default SecondaryHeader;