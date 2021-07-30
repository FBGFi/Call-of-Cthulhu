import React from 'react';
import InfoBox from '../../../../../components/InfoBox';
import './FellowInvestigators.css';

const FellowInvestigators: React.FC = () => {
    return(
        <InfoBox title="Fellow Investigators" className='FellowInvestigators'>
            <div className="investigator-container">
                <div className="player-container">
                    <div className="row">
                        <span>Char.</span>
                        <input type="text" size={1} />
                    </div>
                    <div className="row">
                        <span>Player.</span>
                        <input type="text" size={1} />
                    </div>
                </div>

                <div className="player-container">
                    <div className="row">
                        <span>Char.</span>
                        <input type="text" size={1} />
                    </div>
                    <div className="row">
                        <span>Player.</span>
                        <input type="text" size={1} />
                    </div>
                </div>
                
                <div className="player-container">
                    <div className="row">
                        <span>Char.</span>
                        <input type="text" size={1} />
                    </div>
                    <div className="row">
                        <span>Player.</span>
                        <input type="text" size={1} />
                    </div>
                </div>

                <div className="player-container">
                    <div className="row">
                        <span>Char.</span>
                        <input type="text" size={1} />
                    </div>
                    <div className="row">
                        <span>Player.</span>
                        <input type="text" size={1} />
                    </div>
                </div>

                <div className="me-container">
                    <h1>ME</h1>
                </div>

                <div className="player-container">
                    <div className="row">
                        <span>Char.</span>
                        <input type="text" size={1} />
                    </div>
                    <div className="row">
                        <span>Player.</span>
                        <input type="text" size={1} />
                    </div>
                </div>
                <div className="player-container">
                    <div className="row">
                        <span>Char.</span>
                        <input type="text" size={1} />
                    </div>
                    <div className="row">
                        <span>Player.</span>
                        <input type="text" size={1} />
                    </div>
                </div>
                <div className="player-container">
                    <div className="row">
                        <span>Char.</span>
                        <input type="text" size={1} />
                    </div>
                    <div className="row">
                        <span>Player.</span>
                        <input type="text" size={1} />
                    </div>
                </div>
                <div className="player-container">
                    <div className="row">
                        <span>Char.</span>
                        <input type="text" size={1} />
                    </div>
                    <div className="row">
                        <span>Player.</span>
                        <input type="text" size={1} />
                    </div>
                </div>
            </div>
        </InfoBox>
    );
}

export default FellowInvestigators;