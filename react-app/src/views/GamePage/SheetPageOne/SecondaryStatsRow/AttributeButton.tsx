import React from "react";
import { useRootContext } from "../../../../store/RootContext";
import { SecondaryStats } from "../../../../store/utils/types";
import { createUseStyles } from "react-jss";
import { formatNumberToLength } from "../../../../utils/utils";
import clsx from "clsx";

interface AttributeButtonProps {
  attributeType: keyof SecondaryStats;
  value: number;
}

const useStyles = createUseStyles({
  attributeButton: {
    background: "none",
    border: "none",
    borderRadius: "50%",
    fontSize: "1.1em",

    "&.checked": {
      backgroundColor: "var(--dark-gray)",
    },

    "&:focus": {
      boxShadow: "none",
    },

    "& input": {
      display: "none",
    },

    "& > *": {
      pointerEvents: "none",
    },
  },
});

export const AttributeButton: React.FC<AttributeButtonProps> = ({
  value,
  attributeType,
}) => {
  const { state, setCurrentCharacter } = useRootContext();
  const { currentCharacter } = state;
  if (!currentCharacter) return null;
  const { attributeButton } = useStyles();
  const { secondaryStats } = currentCharacter;
  const currentValue =
    attributeType === "luck"
      ? secondaryStats.luck
      : secondaryStats[attributeType].current;

  const setStatValue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (attributeType === "luck") {
      setCurrentCharacter({
        ...currentCharacter,
        secondaryStats: {
          ...secondaryStats,
          luck: value,
        },
      });
    } else {
      setCurrentCharacter({
        ...currentCharacter,
        secondaryStats: {
          ...secondaryStats,
          [attributeType]: { ...secondaryStats[attributeType], current: value },
        },
      });
    }
  };

  const getText = () => {
    if (value === 0) {
      if (attributeType === "luck") return "Out of Luck";
      if (attributeType === "hp") return "(00)";
      if (attributeType === "sanity") return "Insane";
    }
    return formatNumberToLength(value, 2);
  };
  const labelFor = attributeType + "-value-" + value;
  const checked = currentValue === value;
  return (
    <button
      onClick={setStatValue}
      className={clsx(attributeButton, checked && "checked")}
    >
      <input
        onChange={(e) => console.log(e)}
        defaultChecked={checked}
        type="radio"
        name={labelFor}
        value={value}
      />
      <label htmlFor={labelFor}>{getText()}</label>
    </button>
  );
};
