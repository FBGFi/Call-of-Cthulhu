import React from 'react';
import SheetRow from '../../../../components/SheetRow';
import CharacterImage from './CharacterImage';
import CharacterInfo from './CharacterInfo';
import Characteristics from './Characteristics';
import './MainInfoRow.css';

const MainInfoRow: React.FC = () => {
    return (
        <SheetRow className='MainInfoRow'>
            <CharacterInfo />
            <Characteristics />
            <CharacterImage />
        </SheetRow>
    );
}

export default MainInfoRow;