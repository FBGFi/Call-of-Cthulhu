import React from "react";
import { createUseStyles } from "react-jss";
import { useRootContext } from "../../../../store/RootContext";

const useStyles = createUseStyles({
  generalStatus: {
    gridArea: "general-status",
    display: "flex",
    height: 18,
    zIndex: 1,
    pointerEvents: "none",
    gap: 5,
  },
  column: {
    pointerEvents: "all",
    display: "flex",
    "& > *": {
      margin: "auto",
    },
    "& span": {
      marginRight: 5,
    },
  },
});

const SanityInput: React.FC = () => {
  const { state, setCurrentCharacter } = useRootContext();
  const { currentCharacter } = state;
  if (!currentCharacter) return;
  const { secondaryStats } = currentCharacter;
  const maxSanity = secondaryStats.sanity.max;
  const [value, setValue] = React.useState(maxSanity);

  const onBlur = () => {
    const characterValue = {
      ...currentCharacter,
      secondaryStats: {
        ...secondaryStats,
        sanity: {
          ...secondaryStats.sanity,
          max: value,
        },
      },
    };
    characterValue.investigatorSkills.cthulhuMythos.value = 99 - value;
    setCurrentCharacter(characterValue);
  };

  React.useEffect(() => {
    setValue(maxSanity);
  }, [maxSanity]);

  return (
    <input
      onChange={(e) => setValue(Number(e.target.value))}
      onBlur={onBlur}
      value={value}
      type="number"
      placeholder="Max"
      title="Max Sanity"
    />
  );
};

export const GeneralStatus: React.FC = () => {
  const { state, setCurrentCharacter } = useRootContext();
  const { currentCharacter } = state;
  if (!currentCharacter) return;
  const { secondaryStats } = currentCharacter;
  const { generalStatus, column } = useStyles();

  return (
    <div className={generalStatus}>
      <div className={column}>
        <span>Major Wound</span>
        <input
          onClick={() =>
            setCurrentCharacter({
              ...currentCharacter,
              secondaryStats: {
                ...secondaryStats,
                hp: {
                  ...secondaryStats.hp,
                  majorWound: !secondaryStats.hp.majorWound,
                },
              },
            })
          }
          checked={secondaryStats.hp.majorWound}
          readOnly
          type="checkbox"
        />
      </div>
      <div className={column}>
        <span>Max HP</span>
        <input
          onBlur={(e) =>
            setCurrentCharacter({
              ...currentCharacter,
              secondaryStats: {
                ...secondaryStats,
                hp: { ...secondaryStats.hp, max: Number(e.target.value) },
              },
            })
          }
          defaultValue={secondaryStats.hp.max}
          type="number"
          placeholder="Max HP"
          title="Max HP"
        />
      </div>
      <div className={column}>
        <span>Temp Insane</span>
        <input
          onClick={() =>
            setCurrentCharacter({
              ...currentCharacter,
              secondaryStats: {
                ...secondaryStats,
                sanity: {
                  ...secondaryStats.sanity,
                  temp: !secondaryStats.sanity.temp,
                },
              },
            })
          }
          checked={secondaryStats.sanity.temp}
          type="checkbox"
          readOnly
        />
      </div>
      <div className={column}>
        <span>Indef. Insane</span>
        <input
          onClick={() =>
            setCurrentCharacter({
              ...currentCharacter,
              secondaryStats: {
                ...secondaryStats,
                sanity: {
                  ...secondaryStats.sanity,
                  indef: !secondaryStats.sanity.indef,
                },
              },
            })
          }
          checked={secondaryStats.sanity.indef}
          type="checkbox"
          readOnly
        />
      </div>
      <div className={column}>
        <span>Start</span>
        <input
          onBlur={(e) =>
            setCurrentCharacter({
              ...currentCharacter,
              secondaryStats: {
                ...secondaryStats,
                sanity: {
                  ...secondaryStats.sanity,
                  starting: Number(e.target.value),
                },
              },
            })
          }
          defaultValue={secondaryStats.sanity.starting}
          type="number"
          placeholder="Start"
          title="Starting Sanity"
        />
      </div>
      <div className={column}>
        <span>Max</span>
        <SanityInput />
      </div>
    </div>
  );
};
