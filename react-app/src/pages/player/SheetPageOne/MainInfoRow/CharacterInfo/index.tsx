import React, { useContext } from 'react';
import InfoBox from '../../../../../components/InfoBox';
import { PlayerContext } from '../../../../../reducers/PlayerReducer';
import { PlayerActions } from '../../../../../actions';
import './CharacterInfo.css';

const CharacterInfo: React.FC = () => {
    const { state, dispatch } = useContext(PlayerContext);

    const setValueForReducer = (e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, field: string) => {
        if (Object.keys(PlayerActions.SET_CHARACTER_INFO).includes(field)) {
            // @ts-ignore
            dispatch({ type: PlayerActions.SET_CHARACTER_INFO[field], value: e.target.value });
        }
    }
    return (
        <InfoBox className='CharacterInfo' title='1920s Era Investigator'>
            <form>
                <div className="form-row">
                    <span>Name</span>
                    <input onBlur={(e) => setValueForReducer(e, "NAME")} defaultValue={state.CHARACTER_INFO.NAME} type="text" />
                </div>
                <div className="form-row">
                    <span>Player</span>
                    <input onBlur={(e) => setValueForReducer(e, "PLAYER")} defaultValue={state.CHARACTER_INFO.PLAYER} type="text" />
                </div>
                <div className="form-row">
                    <span>Occupatice</span>
                    <input onBlur={(e) => setValueForReducer(e, "OCCUPATICE")} defaultValue={state.CHARACTER_INFO.OCCUPATICE} type="text" />
                </div>
                <div className="form-row split-row">
                    <div className="form-column">
                        <span>Age</span>
                        <input onBlur={(e) => setValueForReducer(e, "AGE")} defaultValue={state.CHARACTER_INFO.AGE} type="number" />
                    </div>
                    <div className="form-column">
                        <span>Sex</span>
                        <select onChange={(e) => setValueForReducer(e, "SEX")} defaultValue={state.CHARACTER_INFO.SEX}>
                            <option value="NONE" style={{ display: "none" }}></option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <span>Residence</span>
                    <input onBlur={(e) => setValueForReducer(e, "RESIDENCE")} defaultValue={state.CHARACTER_INFO.RESIDENCE} type="text" />
                </div>
                <div className="form-row">
                    <span>Birthplace</span>
                    <input onBlur={(e) => setValueForReducer(e, "BIRTHPLACE")} defaultValue={state.CHARACTER_INFO.BIRTHPLACE} type="text" />
                </div>
            </form>
        </InfoBox>
    );
}

export default CharacterInfo;