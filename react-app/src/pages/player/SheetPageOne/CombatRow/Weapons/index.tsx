import React from 'react';
import InfoBox from '../../../../../components/InfoBox';
import './Weapons.css';

const Weapons: React.FC = () => {
    return (
        <InfoBox title="Weapons" className='Weapons'>
            <div className="weapon-container">

                <span>Weapon</span>
                <span>Regular</span>
                <span>Hard</span>
                <span>Extreme</span>
                <span>Damage</span>
                <span>Range</span>
                <span>Attacks</span>
                <span>Ammo</span>
                <span>Malf</span>

                <span>Unarmed</span>
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <span>1D3 + DB</span>
                <span>-</span>
                <span>1</span>
                <span>-</span>
                <span>-</span>

                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />

                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />

                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />

                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />

                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
                <input size={1} type="text" />
            </div>
        </InfoBox>
    );
}

export default Weapons;