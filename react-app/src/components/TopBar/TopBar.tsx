import React from "react";
import { createUseStyles } from "react-jss";
import { useCharacterDatabase } from "../../store/utils/useCharacterDatabase";
import { useRootContext } from "../../store/RootContext";
import { CharacterSheet } from "../../store/utils/types";
import { exportCharacterToFile } from "../../utils/utils";
import { DropdownButton } from "./DropdownButton";

const useStyles = createUseStyles({
  topBar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: 40,
    zIndex: 2,
    background: "url(/images/paper_small.jpg)",
    borderBottom: "2px solid var(--dark-gray)",
    display: "flex",
    padding: 5,
    gap: 5,
  },
  fileInput: {
    "& input": {
      display: "none",
    },
  },
});

export const TopBar: React.FC = () => {
  const { state, setCurrentCharacter, deleteCurrentCharacter } =
    useRootContext();
  const { currentCharacter } = state;
  const { createNewCharacter, getCharacters, validateCharacter } =
    useCharacterDatabase();
  const { topBar, fileInput } = useStyles();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [characters, setCharacters] = React.useState<CharacterSheet[]>([]);

  const onCharacterSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idAsNum = Number(e.target.value);
    if (!isNaN(idAsNum)) {
      setCurrentCharacter(
        characters.find((character) => character.id === idAsNum),
      );
    }
  };

  const importCharacterFromFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = (frEvent) => {
      const src = frEvent.target?.result;
      if (typeof src === "string") {
        const parsed = JSON.parse(src as string);
        if (validateCharacter(parsed)) {
          setCurrentCharacter(parsed);
        }
      }
    };
    if (e.target.files) {
      // This fails sometimes for some reason when pressing cancel
      try {
        reader.readAsText(e.target.files[0]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  React.useEffect(() => {
    getCharacters((characters) => setCharacters(characters));
  }, [currentCharacter]);

  return (
    <div className={topBar}>
      <button onClick={() => createNewCharacter(setCurrentCharacter)}>
        Create character
      </button>
      <button
        onClick={() => deleteCurrentCharacter()}
        disabled={!currentCharacter}
      >
        Delete character
      </button>
      <select
        onChange={onCharacterSelect}
        value={currentCharacter?.id ?? "NONE"}
        disabled={!characters.length}
      >
        <option value="NONE" style={{ display: "none" }}>
          Choose character
        </option>
        {characters.map((character) => (
          <option key={character.id} value={character.id}>
            {character.characterInfo.characterName || "Unnamed character"}
          </option>
        ))}
      </select>
      <button
        onClick={() =>
          currentCharacter && exportCharacterToFile(currentCharacter)
        }
        disabled={!currentCharacter}
      >
        Export character
      </button>
      <button
        onClick={() => fileInputRef.current?.click()}
        className={fileInput}
      >
        <input
          ref={fileInputRef}
          onChange={(e) => importCharacterFromFile(e)}
          type="file"
        />
        {"Import character"}
      </button>
      <DropdownButton alt="Notes" imageSource="/images/notes.svg" align="right">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis,
        voluptas distinctio neque facere doloremque maiores!
      </DropdownButton>
    </div>
  );
};
