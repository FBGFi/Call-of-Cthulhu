import React from 'react';
import InfoBox from '../../../../components/InfoBox';
import SheetRow from '../../../../components/SheetRow';
import './BackstoryRow.css';

const BackstoryRow: React.FC = () => {
    return(
        <SheetRow className='BackstoryRow'>
            <InfoBox title='Backstory' className='Backstory'>
                <div className="story-container">
                    <h3>Personal Description</h3>
                    <textarea></textarea>
                </div>
                <div className="story-container">
                    <h3>Traits</h3>
                    <textarea></textarea>
                </div>
                <div className="story-container">
                    <h3>Ideology/Beliefs</h3>
                    <textarea></textarea>
                </div>
                <div className="story-container">
                    <h3>Injuries & Scars</h3>
                    <textarea></textarea>
                </div>
                <div className="story-container">
                    <h3>Significant People</h3>
                    <textarea></textarea>
                </div>
                <div className="story-container">
                    <h3>Phobias and Manias</h3>
                    <textarea></textarea>
                </div>
                <div className="story-container">
                    <h3>Meaningful Locations</h3>
                    <textarea></textarea>
                </div>
                <div className="story-container">
                    <h3>Arcane Tomes, Spells & Artifacts</h3>
                    <textarea></textarea>
                </div>
                <div className="story-container">
                    <h3>Treasured Possessions</h3>
                    <textarea></textarea>
                </div>
                <div className="story-container">
                    <h3>Encounters with Strange Entities</h3>
                    <textarea></textarea>
                </div>
            </InfoBox>
        </SheetRow>
    );
}

export default BackstoryRow;