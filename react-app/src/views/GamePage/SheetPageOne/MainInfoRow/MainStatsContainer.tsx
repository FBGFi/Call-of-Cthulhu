import React from "react";
import { MainStats } from "../../../../store/utils/types";
import { useRootContext } from "../../../../store/RootContext";
import { createUseStyles } from "react-jss";
import { InfoBox } from "../../InfoBox";
import { StatsInput } from "../../StatsInput";

const useStyles = createUseStyles({
  characteristics: {
    width: "50%",
  },
  characteristicsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    padding: 10,
    rowGap: 20,
  },
  statEntry: {
    width: "33.33%",
    display: "flex",
    "& span": {
      width: "50%",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "1.2em",
      margin: "auto",
    },
  },
  moveRateInput: {
    backgroundColor: "var(--opaque-white)",
    border: "1px solid var(--light-gray)",
    borderRadius: "50%",
    width: "50%",
    textAlign: "center",
    fontSize: "2.2em",
    outline: "none",
  },
});

const mainStatsTranslations: {
  [key in keyof MainStats]: string;
} = {
  str: "STR",
  dex: "DEX",
  pow: "POW",
  con: "CON",
  app: "APP",
  edu: "EDU",
  siz: "SIZ",
  int: "INT",
  moveRate: "Move Rate",
};

export const MainStatsContainer: React.FC = () => {
  const { state, setCurrentCharacter } = useRootContext();
  const { currentCharacter } = state;
  if (!currentCharacter) return null;
  const { characteristics, characteristicsWrapper, statEntry, moveRateInput } =
    useStyles();

  return (
    <InfoBox title="Characteristics" className={characteristics}>
      <div className={characteristicsWrapper}>
        {Object.entries(mainStatsTranslations).map(([key, value]) => (
          <div key={key} className={statEntry}>
            <span>{value}</span>
            {key !== "moveRate" ? (
              <StatsInput
                type="big"
                value={currentCharacter.mainStats[key as keyof MainStats]}
                onChange={(value) =>
                  setCurrentCharacter({
                    ...currentCharacter,
                    mainStats: {
                      ...currentCharacter.mainStats,
                      [key as keyof MainStats]: value,
                    },
                  })
                }
              />
            ) : (
              <input
                type="number"
                className={moveRateInput}
                onChange={(value) =>
                  setCurrentCharacter({
                    ...currentCharacter,
                    mainStats: {
                      ...currentCharacter.mainStats,
                      moveRate: Number(value),
                    },
                  })
                }
              />
            )}
          </div>
        ))}
      </div>
    </InfoBox>
  );
};
