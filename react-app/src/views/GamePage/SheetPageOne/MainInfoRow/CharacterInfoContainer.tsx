import React from "react";
import { InfoBox } from "../../InfoBox";
import { CharacterInfo } from "../../../../store/utils/types";
import { useRootContext } from "../../../../store/RootContext";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

const useStyles = createUseStyles({
  characterInfo: {
    flex: 1,
    "& .info-box-header": {
      backgroundColor: "black",
      color: "white",
      fontSize: "1.1em",
      padding: 3,
    },
    '& input[type="number"]': {
      background: "none",
      border: "none",
      borderBottom: "1px solid black",
      flex: 1,
      textAlign: "center",
      fontSize: "1.2em",
      "&:focus": {
        boxShadow: "none",
      },
    },
  },
  inputTitle: {
    marginTop: "auto",
    marginRight: 5,
  },
  row: {
    display: "flex",
    gap: 10,
    "& .split-row": {
      gap: 10,
    },
    "& > *:last-child": {
      flex: 1,
    },
  },
  column: {
    display: "flex",
    width: "50%",
    flex: 1,
    "& input, & select": {
      width: 100,
    },
  },
});

const characterInfoTranslations: {
  [key in keyof CharacterInfo]: string;
} = {
  characterName: "Name",
  playerName: "Player",
  occupatice: "Occupatice",
  age: "Age",
  sex: "Sex",
  residence: "Residence",
  birthPlace: "Birthplace",
};

export const CharacterInfoContainer: React.FC = () => {
  const { state, setCurrentCharacter } = useRootContext();
  const { currentCharacter } = state;
  if (!currentCharacter) return null;

  const { characterInfo, row, column, inputTitle } = useStyles();

  const getRow = (key: keyof CharacterInfo, title: string) => {
    if (key === "sex" || key === "image") return null;
    if (key === "age") {
      return (
        <div className={clsx(row, "split-row")}>
          <span className={inputTitle}>{characterInfoTranslations["age"]}</span>
          <div className={column}>
            <input
              type="number"
              defaultValue={currentCharacter.characterInfo.age}
              onBlur={(e) =>
                setCurrentCharacter({
                  ...currentCharacter,
                  characterInfo: {
                    ...currentCharacter.characterInfo,
                    age: Number(e.target.value) as CharacterInfo["age"],
                  },
                })
              }
            />
          </div>
          <div className={column}>
            <span className={inputTitle}>
              {characterInfoTranslations["sex"]}
            </span>
            <select
              defaultValue={currentCharacter.characterInfo.sex || "NONE"}
              onChange={(e) =>
                setCurrentCharacter({
                  ...currentCharacter,
                  characterInfo: {
                    ...currentCharacter.characterInfo,
                    sex: e.target.value as CharacterInfo["sex"],
                  },
                })
              }
            >
              <option value="NONE" style={{ display: "none" }}></option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>
      );
    }
    return (
      <div className={row}>
        <span className={inputTitle}>{title}</span>
        <input
          type="text"
          defaultValue={currentCharacter.characterInfo[key]}
          onBlur={(e) =>
            setCurrentCharacter({
              ...currentCharacter,
              characterInfo: {
                ...currentCharacter.characterInfo,
                [key]: e.target.value as CharacterInfo[keyof CharacterInfo],
              },
            })
          }
        />
      </div>
    );
  };

  return (
    <InfoBox title="1920s Era Investigator" className={characterInfo}>
      {Object.entries(characterInfoTranslations).map(([key, value]) => (
        <React.Fragment key={key}>
          {getRow(key as keyof CharacterInfo, value)}
        </React.Fragment>
      ))}
    </InfoBox>
  );
};
