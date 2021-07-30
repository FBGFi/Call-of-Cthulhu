import React from 'react';
import InfoBox from '../../../../components/InfoBox';
import InvestigatorSkill from './InvestigatorSkill';
import './InvestigatorSkillRow.css';

const InvestigatorSkillRow: React.FC = () => {
    return(
        <div className='InvestigatorSkillRow'>
            <InfoBox className='InvestigatorSkills' title='Investigator Skills'>
                
                <InvestigatorSkill title='Accounting (05%)' />
                <InvestigatorSkill title='Fast Talk (05%)' />
                <InvestigatorSkill title='Law (05%)' />
                <InvestigatorSkill title='Science (01%)' customText={true}/>

                <InvestigatorSkill title='Anthropology (01%)' />
                <InvestigatorSkill title='Fighting (Brawl) (25%)' />
                <InvestigatorSkill title='Library Use (20%)' />
                <InvestigatorSkill customText={true}/>

                <InvestigatorSkill title='Appraise (05%)' />
                <InvestigatorSkill customText={true} />
                <InvestigatorSkill title='Listen (20%)' />
                <InvestigatorSkill customText={true}/>

                <InvestigatorSkill title='Archaeology (01%)' />
                <InvestigatorSkill customText={true} />
                <InvestigatorSkill title='Locksmith (01%)' />
                <InvestigatorSkill title='Sleight of Hand (10%)'/>

                <InvestigatorSkill title='Art/Craft (05%)' customText={true}/>
                <InvestigatorSkill title='Firearms (Handgun)(20%)' />
                <InvestigatorSkill title='Mech. Repair (10%)' />
                <InvestigatorSkill title='Spot Hidden (25%)' />

                <InvestigatorSkill customText={true} />
                <InvestigatorSkill title='Firearms (Rifle/Shotgun) (25%)' />
                <InvestigatorSkill title='Medicine (01%)' />
                <InvestigatorSkill title='Stealth (20%)' />

                <InvestigatorSkill customText={true} />
                <InvestigatorSkill customText={true} />
                <InvestigatorSkill title='Natural World (10%)' />
                <InvestigatorSkill title='Survival (10%)' customText={true}/>

                <InvestigatorSkill title='Charm (15%)' />
                <InvestigatorSkill title='First Aid (30%)' />
                <InvestigatorSkill title='Navigate (10%)' />
                <InvestigatorSkill title='Swim (20%)' />

                <InvestigatorSkill title='Climb (20%)' />
                <InvestigatorSkill title='History (05%)' />
                <InvestigatorSkill title='Occult (05%)' />
                <InvestigatorSkill title='Throw (20%)' />

                <InvestigatorSkill title='Credit Rating (00%)' nonOptional={true} />
                <InvestigatorSkill title='Intimidate (15%)' />
                <InvestigatorSkill title='Op. Hv. Machine (01%)' />
                <InvestigatorSkill title='Track (10%)' />

                <InvestigatorSkill title='Cthulhu Mythos (00%)' nonOptional={true} />
                <InvestigatorSkill title='Jump (20%)' />
                <InvestigatorSkill title='Persuade (10%)' />
                <InvestigatorSkill customText={true}/>

                <InvestigatorSkill title='Disguise (05%)' />
                <InvestigatorSkill title='Language (Other)(01%)' customText={true}/>
                <InvestigatorSkill title='Pilot (01%)' customText={true}/>
                <InvestigatorSkill customText={true}/>

                <InvestigatorSkill title='Dodge (half DEX)' />
                <InvestigatorSkill customText={true} />
                <InvestigatorSkill title='Psychology (10%)' />
                <InvestigatorSkill customText={true}/>

                <InvestigatorSkill title='Drive Auto (20%)' />
                <InvestigatorSkill customText={true} />
                <InvestigatorSkill title='Psychoanalysis (01%)' />
                <InvestigatorSkill customText={true}/>

                <InvestigatorSkill title='Elec Repair (10%)' />
                <InvestigatorSkill title='Language (own)(EDU)' />
                <InvestigatorSkill title='Ride (05%)' />
                <InvestigatorSkill customText={true}/>
            </InfoBox>
        </div>
    );
}

export default InvestigatorSkillRow;