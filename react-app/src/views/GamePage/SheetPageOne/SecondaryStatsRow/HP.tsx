import React from "react";
import { createUseStyles } from "react-jss";
import { getNumArray } from "../../../../utils/utils";
import { StatButtonRow } from "./StatButtonRow";
import { useRootContext } from "../../../../store/RootContext";

const useStyles = createUseStyles({
  hp: {
    gridArea: "hp",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    display: "flex",
  },
  titleContainer: {
    width: 22,
    position: "relative",
    "& h4": {
      transform: "rotate(-90deg) translate(-50%, 60%)",
      transformOrigin: "bottom left",
      position: "absolute",
      left: "50%",
      bottom: "55%",
      width: 100,
    },
  },
  stats: {
    flex: 1,
    padding: 5,
    display: "flex",
    flexDirection: "column",

    "& table": {
      flex: 1,
      display: "flex",
    },
    "& tbody": {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    "& tr": {
      display: "flex",
      margin: "auto 0",
    },
    "& td": {
      margin: "auto",
    },
  },
  statHeader: {
    display: "flex",
    "& span": {
      marginLeft: "auto",
      marginRight: 5,
    },
    "& input": {
      marginRight: 5,
    },
  },
});

export const HP: React.FC = () => {
  const { state, setCurrentCharacter } = useRootContext();
  const { currentCharacter } = state;
  if (!currentCharacter) return null;
  const { secondaryStats } = currentCharacter;
  const { hp, titleContainer, stats, statHeader } = useStyles();
  const values = getNumArray(21);
  return (
    <div className={hp}>
      <div className={titleContainer}>
        <h4>Hit Points</h4>
      </div>
      <div className={stats}>
        <div className={statHeader}>
          <span>Dying</span>
          <input
            type="checkbox"
            onClick={() =>
              setCurrentCharacter({
                ...currentCharacter,
                secondaryStats: {
                  ...secondaryStats,
                  hp: {
                    ...secondaryStats.hp,
                    dying: !secondaryStats.hp.dying,
                  },
                },
              })
            }
            readOnly
            checked={secondaryStats.hp.dying}
          />
          <span>Unconscious</span>
          <input
            type="checkbox"
            onClick={() =>
              setCurrentCharacter({
                ...currentCharacter,
                secondaryStats: {
                  ...secondaryStats,
                  hp: {
                    ...secondaryStats.hp,
                    unconcious: !secondaryStats.hp.unconcious,
                  },
                },
              })
            }
            readOnly
            checked={secondaryStats.hp.unconcious}
          />
        </div>
        <table>
          <tbody>
            <StatButtonRow values={values.slice(0, 7)} attributeType="hp" />
            <StatButtonRow values={values.slice(7, 14)} attributeType="hp" />
            <StatButtonRow values={values.slice(14, 21)} attributeType="hp" />
          </tbody>
        </table>
      </div>
    </div>
  );
};
