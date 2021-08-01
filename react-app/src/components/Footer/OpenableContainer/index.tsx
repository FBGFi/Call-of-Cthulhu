import React from 'react';
import './OpenableContainer.css';

type OpenableContainerProps = {
    className: string;
    imgSrc: string;
}

const OpenableContainer: React.FC<OpenableContainerProps> = (props) => {
    return (
        <div className={'OpenableContainer ' + props.className}>
            <button className="open-button"><img alt="Fucking React errors" src={props.imgSrc} /></button>
            <div className="inner-container">
                {props.children}
            </div>
        </div>
    );
}

export default OpenableContainer;