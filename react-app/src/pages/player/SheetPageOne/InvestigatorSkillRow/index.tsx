import React, { useReducer } from 'react';
import InfoBox from '../../../../components/InfoBox';
import { investigatorSkillsReducer, InitialInvestigatorSkillsState, InvestigatorSkillsContext } from '../../../../reducers/InvestigatorSkillsReducer';
import InvestigatorSkill from './InvestigatorSkill';
import './InvestigatorSkillRow.css';

const InvestigatorSkillRow: React.FC = () => {
    const [investigatorSkillsState, investigatorSkillsDispatch] = useReducer(investigatorSkillsReducer, InitialInvestigatorSkillsState);
    return (
        <InvestigatorSkillsContext.Provider value={{ state: investigatorSkillsState, dispatch: investigatorSkillsDispatch }}>
            <div className='InvestigatorSkillRow'>
                <InfoBox className='InvestigatorSkills' title='Investigator Skills'>

                    <InvestigatorSkill skill='ACCOUNTING' title='Accounting (05%)' />
                    <InvestigatorSkill skill='FAST_TALK' title='Fast Talk (05%)' />
                    <InvestigatorSkill skill='LAW' title='Law (05%)' />
                    <InvestigatorSkill skill='SCIENCE' title='Science (01%)' customText={true} />

                    <InvestigatorSkill skill='ANTHROPOLOGY' title='Anthropology (01%)' />
                    <InvestigatorSkill skill='FIGHTING_BRAWL' title='Fighting (Brawl) (25%)' />
                    <InvestigatorSkill skill='LIBRARY_USE' title='Library Use (20%)' />
                    <InvestigatorSkill skill='CUSTOM_1' customText={true} />

                    <InvestigatorSkill skill='APPRAISE' title='Appraise (05%)' />
                    <InvestigatorSkill skill='CUSTOM_2' customText={true} />
                    <InvestigatorSkill skill='LISTEN' title='Listen (20%)' />
                    <InvestigatorSkill skill='CUSTOM_3' customText={true} />

                    <InvestigatorSkill skill='ARCHAEOLOGY' title='Archaeology (01%)' />
                    <InvestigatorSkill skill='CUSTOM_4' customText={true} />
                    <InvestigatorSkill skill='LOCKSMITH' title='Locksmith (01%)' />
                    <InvestigatorSkill skill='SLEIGHT_OF_HAND' title='Sleight of Hand (10%)' />

                    <InvestigatorSkill skill='ART_CRAFT' title='Art/Craft (05%)' customText={true} />
                    <InvestigatorSkill skill='FIREARMS_HANDGUN' title='Firearms (Handgun)(20%)' />
                    <InvestigatorSkill skill='MECH_REPAIR' title='Mech. Repair (10%)' />
                    <InvestigatorSkill skill='SPOT_HIDDEN' title='Spot Hidden (25%)' />

                    <InvestigatorSkill skill='CUSTOM_5' customText={true} />
                    <InvestigatorSkill skill='FIREARMS_RIFLE_SHOTGUN' title='Firearms (Rifle/Shotgun) (25%)' />
                    <InvestigatorSkill skill='MEDICINE' title='Medicine (01%)' />
                    <InvestigatorSkill skill='STEALTH' title='Stealth (20%)' />

                    <InvestigatorSkill skill='CUSTOM_6' customText={true} />
                    <InvestigatorSkill skill='CUSTOM_7' customText={true} />
                    <InvestigatorSkill skill='NATURAL_WORLD' title='Natural World (10%)' />
                    <InvestigatorSkill skill='SURVIVAL' title='Survival (10%)' customText={true} />

                    <InvestigatorSkill skill='CHARM' title='Charm (15%)' />
                    <InvestigatorSkill skill='FIRST_AID' title='First Aid (30%)' />
                    <InvestigatorSkill skill='NAVIGATE' title='Navigate (10%)' />
                    <InvestigatorSkill skill='SWIM' title='Swim (20%)' />

                    <InvestigatorSkill skill='CLIMB' title='Climb (20%)' />
                    <InvestigatorSkill skill='HISTORY' title='History (05%)' />
                    <InvestigatorSkill skill='OCCULT' title='Occult (05%)' />
                    <InvestigatorSkill skill='THROW' title='Throw (20%)' />

                    <InvestigatorSkill skill='CREDIT_RATING' title='Credit Rating (00%)' nonOptional={true} />
                    <InvestigatorSkill skill='INTIMIDATE' title='Intimidate (15%)' />
                    <InvestigatorSkill skill='OP_HV_MACHINE' title='Op. Hv. Machine (01%)' />
                    <InvestigatorSkill skill='TRACK' title='Track (10%)' />

                    <InvestigatorSkill skill='CTHULHU_MYTHOS' title='Cthulhu Mythos (00%)' nonOptional={true} />
                    <InvestigatorSkill skill='JUMP' title='Jump (20%)' />
                    <InvestigatorSkill skill='PERSUADE' title='Persuade (10%)' />
                    <InvestigatorSkill skill='CUSTOM_8' customText={true} />

                    <InvestigatorSkill skill='DISGUISE' title='Disguise (05%)' />
                    <InvestigatorSkill skill='LANGUAGE_OTHER' title='Language (Other)(01%)' customText={true} />
                    <InvestigatorSkill skill='PILOT' title='Pilot (01%)' customText={true} />
                    <InvestigatorSkill skill='CUSTOM_9' customText={true} />

                    <InvestigatorSkill skill='DODGE' title='Dodge (half DEX)' />
                    <InvestigatorSkill skill='CUSTOM_10' customText={true} />
                    <InvestigatorSkill skill='PSYCHOLOGY' title='Psychology (10%)' />
                    <InvestigatorSkill skill='CUSTOM_11' customText={true} />

                    <InvestigatorSkill skill='DRIVE_AUTO' title='Drive Auto (20%)' />
                    <InvestigatorSkill skill='CUSTOM_12' customText={true} />
                    <InvestigatorSkill skill='PSYCHOANALYSIS' title='Psychoanalysis (01%)' />
                    <InvestigatorSkill skill='CUSTOM_13' customText={true} />

                    <InvestigatorSkill skill='ELEC_REPAIR' title='Elec Repair (10%)' />
                    <InvestigatorSkill skill='LANGUAGE_OWN' title='Language (own)(EDU)' />
                    <InvestigatorSkill skill='RIDE' title='Ride (05%)' />
                    <InvestigatorSkill skill='CUSTOM_14' customText={true} />
                </InfoBox>
            </div>
        </InvestigatorSkillsContext.Provider>
    );
}

export default InvestigatorSkillRow;