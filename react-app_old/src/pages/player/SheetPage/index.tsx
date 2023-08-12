import React from 'react';
import { CSSProperties } from 'react';
import './SheetPage.css';

type SheetPageProps = {
    className: string;
    style?: CSSProperties;
}

const SheetPage: React.FC<SheetPageProps> = (props) => {
    return(
        <div style={props.style} className={'SheetPage ' + props.className}>
            {props.children}
        </div>
    );
}

export default SheetPage;