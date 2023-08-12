import React, { useRef, useContext } from 'react';
import { PlayerActions } from '../../../../../actions';
import InfoBox from '../../../../../components/InfoBox';
import { PlayerContext } from '../../../../../reducers/PlayerReducer';
import './CharacterImage.css';

const CharacterImage: React.FC = () => {
    const { state, dispatch } = useContext(PlayerContext);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const clickImageInput = () => {
        imageInputRef.current?.click();
    }

    const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        let reader = new FileReader();
        console.log(window.localStorage.CALL_OF_CTHULHU.length);
        reader.onload = (frEvent) => {
            if (e.target.files) {
                let size = frEvent.target?.result as string;
                // max size 300KB
                if (size.length < 415000) {
                    dispatch({ type: PlayerActions.SET_CHARACTER_INFO.IMAGE, value: { SRC: frEvent.target?.result as string, TITLE: e.target.files[0].name } })
                } else {
                    alert("Image size should not exceed 300KB");
                    
                    if(imageInputRef.current){
                        imageInputRef.current.value = "";
                    }
                    
                }
            }
        }
        if (e.target.files) {
            // This fails sometimes for some reason when pressing cancel
            try {
                reader.readAsDataURL(e.target.files[0]);
            } catch (error) {
                
            }
        }
    }

    return (
        <InfoBox className='CharacterImage'>
            <img src={state.CHARACTER_INFO.IMAGE.SRC} />
            <label onClick={clickImageInput} htmlFor="image-input">
                <input ref={imageInputRef} name="image-input" onChange={(e) => changeImage(e)} type="file" className="character-image-input" />
                {state.CHARACTER_INFO.IMAGE.TITLE !== undefined ? state.CHARACTER_INFO.IMAGE.TITLE : "Choose an Image"}
            </label>

        </InfoBox>
    );
}

export default CharacterImage;