import React, { useState } from 'react';
import { Link } from 'react-router-dom';
type SavedCharactersProps = {
    hostedGame?: boolean;
    onChange?: (id: string, type: 'set' | 'remove') => void;
}

const SavedCharacters: React.FC<SavedCharactersProps> = (props) => {
    const [selectedCharacter, setSelectedCharacter] = useState<string | undefined>(undefined);

    if (window.localStorage.CALL_OF_CTHULHU === undefined) {
        return <></>;
    }

    const savedCharacters = JSON.parse(window.localStorage.CALL_OF_CTHULHU).LOCAL_SAVES;

    const renderOptions = (): JSX.Element[] => {
        let options: JSX.Element[] = [];

        for (let character in savedCharacters) {
            if (character !== "") {
                options.push(
                    <option key={savedCharacters[character].CHARACTER_ID} value={savedCharacters[character].CHARACTER_ID}>
                        {savedCharacters[character].CHARACTER_INFO && savedCharacters[character].CHARACTER_INFO.NAME ? savedCharacters[character].CHARACTER_INFO.NAME : "Unnamed Character"}
                    </option>);
            }
        }

        return options;
    }

    const deleteCharacter = () => {
        if (selectedCharacter) {
            let localValues = JSON.parse(window.localStorage.CALL_OF_CTHULHU);
            delete localValues.LOCAL_SAVES[selectedCharacter];
            window.localStorage.setItem('CALL_OF_CTHULHU', JSON.stringify(localValues));
            if(props.onChange){
                props.onChange(selectedCharacter, 'remove');
            }
            setSelectedCharacter(undefined);
        }
    }

    let characters = renderOptions();

    if(characters.length === 0){
        return <></>;
    }

    return (
        <>
            <span>Select a character</span>
            <select onChange={(e) => {
                if(props.onChange){
                    props.onChange(e.target.value, 'set');
                }
                setSelectedCharacter(e.target.value);
            }}>
                <option value="None" style={{ display: 'none' }}></option>
                {characters}
            </select>
            {props.hostedGame === undefined || !props.hostedGame ?
                <Link to={selectedCharacter ? `/local/game/${selectedCharacter}` : '/local'}>
                    <button>Load Character</button>
                </Link> : null}
            <button onClick={deleteCharacter}>Delete Character</button>
        </>
    );
}

export default SavedCharacters;