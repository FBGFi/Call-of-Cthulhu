import React, { useContext } from 'react';
import { BackstoryActions } from '../../../../actions';
import InfoBox from '../../../../components/InfoBox';
import SheetRow from '../../../../components/SheetRow';
import { AppContext } from '../../../../reducers';
import { BackstoryContext } from '../../../../reducers/BackstoryReducer';
import './BackstoryRow.css';

type BackstoryContainerProps = {
    title: string,
    backstoryKey:
    "PERSONAL_DESCRIPTION" |
    "TRAITS" |
    "IDEOLOGY_BELIEFS" |
    "INJURIES_SCARS" |
    "SIGNIFICANT_PEOPLE" |
    "PHOBIAS_MANIAS" |
    "MEANINGFUL_LOCATIONS" |
    "ARCANE_TOMES_SPELLS_ARTIFACTS" |
    "TREASURED_POSSESSIONS" |
    "ENCOUNTERS_WITH_STRANGE_ENTITIES"
}

const BackStoryContainer: React.FC<BackstoryContainerProps> = (props) => {
    const { state, dispatch } = useContext(BackstoryContext);
    const appState = useContext(AppContext).state;

    const setValueForReducer = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        dispatch({ type: BackstoryActions[props.backstoryKey], value: e.target.value });
    }

    return (
        <div className="story-container">
            <h3>{props.title}</h3>
            <textarea 
                onBlur={setValueForReducer} 
                defaultValue={appState.CLIENT === 'PLAYER' ? state[props.backstoryKey] : undefined}
                value={appState.CLIENT === 'HOST' ? state[props.backstoryKey] : undefined}></textarea>
        </div>
    );
}

const BackstoryRow: React.FC = () => {

    return (
        <SheetRow className='BackstoryRow'>
            <InfoBox title='Backstory' className='Backstory'>
                <BackStoryContainer title="Personal Description" backstoryKey="PERSONAL_DESCRIPTION" />
                <BackStoryContainer title="Traits" backstoryKey="TRAITS" />
                <BackStoryContainer title="Ideology/Beliefs" backstoryKey="IDEOLOGY_BELIEFS" />
                <BackStoryContainer title="Injuries & Scars" backstoryKey="INJURIES_SCARS" />
                <BackStoryContainer title="Significant People" backstoryKey="SIGNIFICANT_PEOPLE" />
                <BackStoryContainer title="Phobias and Manias" backstoryKey="PHOBIAS_MANIAS" />
                <BackStoryContainer title="Meaningful Locations" backstoryKey="MEANINGFUL_LOCATIONS" />
                <BackStoryContainer title="Arcane Tomes, Spells & Artifacts" backstoryKey="ARCANE_TOMES_SPELLS_ARTIFACTS" />
                <BackStoryContainer title="Treasured Possessions" backstoryKey="TREASURED_POSSESSIONS" />
                <BackStoryContainer title="Encounters with Strange Entities" backstoryKey="ENCOUNTERS_WITH_STRANGE_ENTITIES" />
            </InfoBox>
        </SheetRow>
    );
}

export default BackstoryRow;