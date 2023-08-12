import React from "react";
import { createUseStyles } from "react-jss";
import { useRootContext } from "../../../../store/RootContext";
import { StatButtonRow } from "./StatButtonRow";
import { getNumArray } from "../../../../utils/utils";

const useStyles = createUseStyles({
  mpHeader: {
    gridArea: "mp-header",
    display: "flex",
    "& > *": {
      marginBlock: "auto",
    },
    "& > span": {
      marginLeft: "auto",
      marginRight: 5,
    },
    "& > input": {
      marginRight: "auto",
    },
  },
  mpStats: {
    gridArea: "mp-stats",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    display: "flex",
    "& > div": {
      width: 22,
      position: "relative",
      "& h4": {
        transform: "rotate(90deg) translate(-50%, 60%)",
        transformOrigin: "bottom left",
        position: "absolute",
        left: "50%",
        bottom: "50%",
        width: 110,
        textAlign: "center",
      },
    },
  },
});

export const MP: React.FC = () => {
  const { state, setCurrentCharacter } = useRootContext();
  const { currentCharacter } = state;
  if (!currentCharacter) return null;
  const { secondaryStats } = currentCharacter;
  const { mpHeader, mpStats } = useStyles();
  const values = getNumArray(25);
  return (
    <>
      <div className={mpHeader}>
        <span>Max MP</span>
        <input
          onBlur={(e) =>
            setCurrentCharacter({
              ...currentCharacter,
              secondaryStats: {
                ...secondaryStats,
                mp: {
                  ...secondaryStats.mp,
                  max: Number(e.target.value),
                },
              },
            })
          }
          defaultValue={secondaryStats.mp.max}
          type="number"
          placeholder="Max MP"
          title="Max MP"
        />
      </div>
      <div className={mpStats}>
        <table>
          <tbody>
            <StatButtonRow values={values.slice(0, 5)} attributeType="mp" />
            <StatButtonRow values={values.slice(5, 10)} attributeType="mp" />
            <StatButtonRow values={values.slice(10, 15)} attributeType="mp" />
            <StatButtonRow values={values.slice(15, 20)} attributeType="mp" />
            <StatButtonRow values={values.slice(20, 25)} attributeType="mp" />
          </tbody>
        </table>
        <div>
          <h4>Magic Points</h4>
        </div>
      </div>
    </>
  );
};
