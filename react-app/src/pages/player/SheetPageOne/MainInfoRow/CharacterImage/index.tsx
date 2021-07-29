import React, { useState, useRef } from 'react';
import InfoBox from '../../../../../components/InfoBox';
import './CharacterImage.css';

const CharacterImage: React.FC = () => {
    const imageRef = useRef<HTMLImageElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [imageInputTitle, setImageInputTitle] = useState("Choose Image")

    const clickImageInput = () => {
        imageInputRef.current?.click();
    }

    const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        let reader = new FileReader();
        reader.onload = (frEvent) => {
            if (imageRef.current) {
                imageRef.current.src = frEvent.target?.result as string;            
            }
        }
        if (e.target.files) {
            setImageInputTitle(e.target.files[0].name);
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    return (
        <InfoBox className='CharacterImage'>
            <img ref={imageRef} />
            <label onClick={clickImageInput} htmlFor="image-input">
                <input ref={imageInputRef} name="image-input" onChange={(e) => changeImage(e)} type="file" className="character-image-input" />
                {imageInputTitle}
            </label>

        </InfoBox>
    );
}

export default CharacterImage;