import React from 'react';
import InfoBox from '../../../../../components/InfoBox';
import './QuickReference.css';

const QuickReference: React.FC = () => {
    return(
        <InfoBox title="Quick Reference Rules" className="QuickReference">
            <div className="row">
                <h4>Skill & Characteristics Rolls</h4>
            </div>
            <div className="row">
                <span>Levels of<br/>Success</span>
                <ul>
                    <li>Fumble<br/>100/96+</li>
                    <li>Fail<br/>&gt; Skill</li>
                    <li>Regular<br/>&lt;= Skill</li>
                    <li>Hard<br/>1/2 Skill</li>
                    <li>Extreme<br/>1/5 Skill</li>
                    <li>Critical<br/>01</li>
                </ul>
            </div>
            <div className="row">
                <span>Pushing Rolls: must justify reroll; Cannot Push Combat or<br/>Sanity Rolls</span>
            </div>
            <div className="row">
                <h4>Wounds & Healing</h4>
            </div>
            <div className="row">
                <span>First Aid heals 1HP</span>
                <span>Medicine Heals +1D3 HP</span>
            </div>
            <div className="row">
                <span><b>Major Wound =</b> loss of &gt; max HP in one attack</span>
            </div>
            <div className="row">
                <span>Reach 0 HP without Major Wound <b>= Unconscious</b></span>
            </div>
            <div className="row">
                <span>Reach 0 HP with Major Wound <b>= Dying</b></span>
            </div>
            <div className="row">
                <span>Dying: First Aid = temp. stabilized; then require Medicine</span>
            </div>
            <div className="row">
                <span><b>Natural Heal rate</b> (non Major Wound): recover 1HP per day</span>
            </div>
            <div className="row">
                <span><b>Natural Heal rate</b> (Major Wound): weekly healing roll</span>
            </div>
        </InfoBox>
    );
}

export default QuickReference;