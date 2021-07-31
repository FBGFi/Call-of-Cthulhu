import React, { CSSProperties } from 'react';
import SheetPage from '../SheetPage';
import BackstoryRow from './BackstoryRow';
import GearRow from './GearRow';
import InfoRow from './InfoRow';
import './SheetPageTwo.css';

type SheetPageTwoProps = {
    style?: CSSProperties;
}

const SheetPageTwo: React.FC<SheetPageTwoProps> = (props) => {
    return(
        <SheetPage style={props.style} className="SheetPageTwo">
            <BackstoryRow />
            <GearRow />
            <InfoRow />
        </SheetPage>
    );
}

export default SheetPageTwo;