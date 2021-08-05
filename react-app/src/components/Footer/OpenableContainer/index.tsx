import React from 'react';
import './OpenableContainer.css';

type OpenableContainerProps = {
    className: string;
    imgSrc: string;
    onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
    alertIndicator?: JSX.Element;
    
}

const OpenableContainer: React.FC<OpenableContainerProps> = (props) => {
    return (
        <div onFocus={props.onFocus} onBlur={props.onBlur} className={'OpenableContainer ' + props.className}>
            <button className="open-button">
                <img alt="Fucking React errors" src={props.imgSrc} />
                {props.alertIndicator}
            </button>
            <div className="inner-container">
                {props.children}
            </div>
        </div>
    );
}

export default OpenableContainer;