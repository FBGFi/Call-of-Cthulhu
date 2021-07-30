import React from 'react';
import InfoBox from '../../../../../components/InfoBox';
import './CharacterInfo.css';

const CharacterInfo: React.FC = () => {
    return (
        <InfoBox className='CharacterInfo' title='1920s Era Investigator'>
            <form>
                <div className="form-row">
                    <span>Name</span>
                    <input type="text" />
                </div>
                <div className="form-row">
                    <span>Player</span>
                    <input type="text" />
                </div>
                <div className="form-row">
                    <span>Occupatice</span>
                    <input type="text" />
                </div>
                <div className="form-row split-row">
                    <div className="form-column">
                        <span>Age</span>
                        <input type="number" />
                    </div>
                    <div className="form-column">
                        <span>Sex</span>
                        <select>
                            <option value="None" style={{ display: "none" }}></option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <span>Residence</span>
                    <input type="text" />
                </div>
                <div className="form-row">
                    <span>Birthplace</span>
                    <input type="text" />
                </div>
            </form>
        </InfoBox>
    );
}

export default CharacterInfo;