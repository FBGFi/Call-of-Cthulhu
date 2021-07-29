import React from 'react';
import './SheetPage.css';

type SheetPageProps = {
    className: string;
}

const SheetPage: React.FC<SheetPageProps> = (props) => {
    return(
        <div className={'SheetPage ' + props.className}>
            {props.children}
        </div>
    );
}

export default SheetPage;