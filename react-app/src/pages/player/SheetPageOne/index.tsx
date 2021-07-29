import React from 'react';
import './SheetPageOne.css';

import SheetPage from '../SheetPage';
import MainInfoRow from './MainInfoRow';
import SecondaryAttributesRow from './SecondaryAttributesRow';

const SheetPageOne: React.FC = () => {
    return (
        <SheetPage className="SheetPageOne">
            <MainInfoRow />
            <SecondaryAttributesRow />
        </SheetPage>
    );
}

export default SheetPageOne;