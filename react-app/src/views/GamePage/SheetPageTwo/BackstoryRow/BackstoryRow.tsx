import React from "react";
import { InfoBox } from "../../InfoBox";
import { BackStory } from "../../../../store/utils/types";
import { SheetRow } from "../../SheetRow";
import { createUseStyles } from "react-jss";
import { useRootContext } from "../../../../store/RootContext";

const titles: {
  [key in keyof BackStory]: string;
} = {
  personalDescription: "Personal Description",
  traits: "Traits",
  ideology: "Ideology/Beliefs",
  injuries: "Injuries & Scars",
  significantPeople: "Significant People",
  phobias: "Phobias and Manias",
  locations: "Meaningful Locations",
  spells: "Arcane Tomes, Spells & Artifacts",
  possessions: "Treasured Possessions",
  encounters: "Encounters with Strange Entities",
};

interface BackstoryInputProps {
  id: keyof BackStory;
  title: string;
}

const useStyles = createUseStyles({
  backStory: {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateAreas: '"header header"',
    "& > div:first-child": {
      gridArea: "header",
    },
  },
  storyContainer: {
    "& h3": {
      textAlign: "center",
    },
  },
});

const BackstoryInput: React.FC<BackstoryInputProps> = ({ id, title }) => {
  const { state, setCurrentCharacter } = useRootContext();
  const { currentCharacter } = state;
  if (!currentCharacter) return null;
  const { backstory } = currentCharacter;
  const { storyContainer } = useStyles();
  return (
    <div className={storyContainer}>
      <h3>{title}</h3>
      <textarea
        defaultValue={backstory[id]}
        onBlur={(e) =>
          setCurrentCharacter({
            ...currentCharacter,
            backstory: {
              ...backstory,
              [id]: e.target.value,
            },
          })
        }
      />
    </div>
  );
};

export const BackstoryRow: React.FC = () => {
  const { backStory } = useStyles();
  return (
    <SheetRow>
      <InfoBox title="Backstory" className={backStory}>
        {Object.entries(titles).map(([id, title]) => (
          <BackstoryInput key={id} id={id as keyof BackStory} title={title} />
        ))}
      </InfoBox>
    </SheetRow>
  );
};
