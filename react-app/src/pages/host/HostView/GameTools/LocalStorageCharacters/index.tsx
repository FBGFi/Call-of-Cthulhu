import React, { useState } from 'react';
import './LocalStorageCharacters.css';

type SavedCharactersProps = {
    player: string;
    character: string;
    id: string;
    deleteChar: (id: string) => void;
}

const SavedCharacter: React.FC<SavedCharactersProps> = (props) => {
    return (
        <div className="SavedCharacter">
            <span><b>Player: </b>{props.player}<br /><b>Character: </b>{props.character !== "" ? props.character : "Unnamed Character"}</span>
            <button onClick={() => props.deleteChar(props.id)} className="button-black">Delete</button>
        </div>
    )
}

const LocalStorageCharacters: React.FC = () => {
    const [numOfCharacters, setNumOfCharacters] = useState(0);

    const deleteCharacter = (id: string) => {
        let localSaves = JSON.parse(window.localStorage.CALL_OF_CTHULHU);
        if (localSaves.LOCAL_SAVES && localSaves.LOCAL_SAVES[id]) {
            delete localSaves.LOCAL_SAVES[id];
            localStorage.setItem('CALL_OF_CTHULHU', JSON.stringify(localSaves));
            setNumOfCharacters(Object.keys(localSaves).length);
        }
    }

    const renderSavedCharacters = (): JSX.Element[] => {
        let characters: JSX.Element[] = [];
        let localSaves = JSON.parse(window.localStorage.CALL_OF_CTHULHU);
        if (localSaves.LOCAL_SAVES) {
            for (let char in localSaves.LOCAL_SAVES) {
                characters.push(
                    <SavedCharacter
                        key={char}
                        deleteChar={deleteCharacter}
                        id={char}
                        player={localSaves.LOCAL_SAVES[char].CHARACTER_INFO.PLAYER}
                        character={localSaves.LOCAL_SAVES[char].CHARACTER_INFO.NAME}
                    />
                );
            }
        }
        if (numOfCharacters !== Object.keys(characters).length) {
            setNumOfCharacters(Object.keys(characters).length);
        }
        return characters;
    }

    return (
        <div className='LocalStorageCharacters'>
            <div className="title-container">
                <h2>Saved Characters</h2>
                {numOfCharacters >= 15 ? <span>Reaching limit of characters</span> : null}           
            </div>
            <div className="saved-characters">
                {renderSavedCharacters()}
            </div>
        </div>
    );
}

export default LocalStorageCharacters;