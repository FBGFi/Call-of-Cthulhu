import React from 'react';
import './SheetRow.css';

type SheetRowProps = {
    className: string;
}

const SheetRow: React.FC<SheetRowProps> = (props) => {
    return(
        <div className={'SheetRow ' + props.className}>
            {props.children}
        </div>
    );
}

export default SheetRow;