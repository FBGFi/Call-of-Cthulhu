import React from 'react';
import OpenableContainer from '../OpenableContainer';
import './NotesContainer.css';

import notesSVG from '../../../assets/images/notes.svg';

const NotesContainer: React.FC = () => {
    return(
        <OpenableContainer className='NotesContainer' imgSrc={notesSVG}>
            <h2>Notes</h2>
            <div className="text-container">
                <textarea></textarea>
            </div>
        </OpenableContainer>
    );
}

export default NotesContainer;