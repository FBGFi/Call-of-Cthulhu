import React from 'react';
import './InfoBox.css';

type InfoBoxProps = {
    className: string;
    title?: string;
}

const InfoBox: React.FC<InfoBoxProps> = (props) => {
    return(
        <div className={'InfoBox ' + props.className}>
            {props.title ? <div className="header">{props.title}</div> : null}
            {props.children}
        </div>
    );
}

export default InfoBox;