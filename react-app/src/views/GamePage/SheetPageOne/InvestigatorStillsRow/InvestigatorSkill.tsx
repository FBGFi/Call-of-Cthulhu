import React from "react";
import { createUseStyles } from "react-jss";
import { useRootContext } from "../../../../store/RootContext";
import { InvestigatorSkills } from "../../../../store/utils/types";
import { StatsInput } from "../../StatsInput";
import { formatNumberToLength } from "../../../../utils/utils";

interface InvestigatorSkillProps {
  skillKey: keyof InvestigatorSkills;
}

const useStyles = createUseStyles({
  investigatorSkill: {
    display: "flex",
    textAlign: "center",
    gap: 5,
    "& > *": {
      marginBlock: "auto",
    },
    '& input[type="checkbox"]': {
      marginLeft: "auto",
    },
    '& input[type="text"]': {
      width: 150,
    },
  },
  nameContainer: {
    flex: 1,
  },
});

export const InvestigatorSkill: React.FC<InvestigatorSkillProps> = ({
  skillKey,
}) => {
  const { state, setCurrentCharacter } = useRootContext();
  const { currentCharacter } = state;
  if (!currentCharacter) return null;
  const { investigatorSkills, mainStats } = currentCharacter;
  const skill = investigatorSkills[skillKey];
  const { investigatorSkill, nameContainer } = useStyles();

  const getStartingValueText = () => {
    if (skill.startingValue === undefined) {
      if (skillKey === "dodge") return "(half DEX)";
      if (skillKey === "languageOwn") return "(EDU)";
      return undefined;
    }
    return ` (${formatNumberToLength(skill.startingValue, 2)}%)`;
  };

  const setValue = (value: number) => {
    const characterValue = {
      ...currentCharacter,
      investigatorSkills: {
        ...investigatorSkills,
        [skillKey]: {
          ...skill,
          value,
        },
      },
    };
    if (skillKey === "cthulhuMythos") {
      characterValue.secondaryStats.sanity.max = 99 - value;
    }
    setCurrentCharacter(characterValue);
  };

  const getValue = () => {
    if (skillKey === "dodge")
      return mainStats.dex !== undefined
        ? Math.floor(mainStats.dex / 2)
        : undefined;
    if (skillKey === "languageOwn") return mainStats.edu;
    return skill.value !== undefined ? skill.value : skill.startingValue;
  };

  return (
    <div className={investigatorSkill}>
      {skillKey !== "cthulhuMythos" && skillKey !== "creditRating" && (
        <input
          checked={skill.isChecked}
          type="checkbox"
          onClick={() =>
            setCurrentCharacter({
              ...currentCharacter,
              investigatorSkills: {
                ...investigatorSkills,
                [skillKey]: {
                  ...skill,
                  isChecked: !skill.isChecked,
                },
              },
            })
          }
        />
      )}
      <div className={nameContainer}>
        {(!skill.isCustom || skill.label) && (
          <span>
            {skill.label || skill.name}
            {getStartingValueText()}
          </span>
        )}
        {skill.isCustom && (
          <input
            type="text"
            defaultValue={skill.name}
            onChange={(e) =>
              setCurrentCharacter({
                ...currentCharacter,
                investigatorSkills: {
                  ...investigatorSkills,
                  [skillKey]: {
                    ...skill,
                    name: e.target.value,
                  },
                },
              })
            }
          />
        )}
      </div>
      <StatsInput type="small" value={getValue()} onChange={setValue} />
    </div>
  );
};
