import React from "react";
import { createUseStyles } from "react-jss";
import { InfoBox } from "../../InfoBox";
import { useRootContext } from "../../../../store/RootContext";
import { StatsInput } from "../../StatsInput";

const useStyles = createUseStyles({
  combat: {
    textAlign: "center",
    "& > div:not(:first-child)": {
      display: "flex",
    },
    "& h3": {
      margin: "auto 10px",
      flex: 1,
    },
  },
  input: {
    borderRadius: "20%",
    border: "1px solid var(--light-gray) !important",
    background: "var(--opaque-white) !important",
    textAlign: "center",
    fontSize: "2.2em !important",
    maxWidth: "50%",
    width: 90,
    height: 60,
    color: "black !important",
  },
});

export const Combat: React.FC = () => {
  const { state } = useRootContext();
  const { currentCharacter } = state;
  if (!currentCharacter) return null;
  const { mainStats } = currentCharacter;
  const { str, siz, dex } = mainStats;
  const { combat, input } = useStyles();

  const withinRange = (value: number, min: number, max: number) =>
    value >= min && value <= max;

  const getDmgBonus = () => {
    if (str !== undefined && siz !== undefined) {
      const added = str + siz;
      if (withinRange(added, 2, 64)) return "-2";
      if (withinRange(added, 65, 84)) return "-1";
      if (withinRange(added, 85, 124)) return "None";
      if (withinRange(added, 125, 164)) return "+1D4";
      if (withinRange(added, 165, 204)) return "+1D6";
    }
    return "";
  };

  const getBuild = () => {
    if (str !== undefined && siz !== undefined) {
      const added = str + siz;
      if (withinRange(added, 2, 64)) return "-2";
      if (withinRange(added, 65, 84)) return "-1";
      if (withinRange(added, 85, 124)) return "0";
      if (withinRange(added, 125, 164)) return "+1";
      if (withinRange(added, 165, 204)) return "+2";
    }
    return "";
  };

  return (
    <InfoBox title="Combat" className={combat}>
      <div>
        <h3>
          Damage
          <br />
          Bonus
        </h3>
        <input
          value={getDmgBonus()}
          type="text"
          className={input}
          disabled
          readOnly
        />
      </div>
      <div>
        <h3>Build</h3>
        <input
          value={getBuild()}
          type="number"
          className={input}
          disabled
          readOnly
        />
      </div>
      <div>
        <h3>Dodge</h3>
        <StatsInput
          type="big"
          onChange={() => null}
          value={dex ? Math.floor(dex / 2) : undefined}
          disabled
        />
      </div>
    </InfoBox>
  );
};
