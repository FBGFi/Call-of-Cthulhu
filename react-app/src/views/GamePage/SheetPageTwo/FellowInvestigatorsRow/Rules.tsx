import React from "react";
import { InfoBox } from "../../InfoBox";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  quickReference: {
    textAlign: "center",
    "& > div:not(:first-child)": {
      display: "flex",
      "& > *": {
        margin: "auto",
      },
      "&:not(:last-child)": {
        paddingBottom: 0,
      },
    },
    "& ul": {
      listStyle: "none",
      display: "flex",
      paddingInlineStart: 0,
      marginLeft: "10px !important",
      border: "1px solid var(--light-gray)",
      "& li": {
        flex: 1,
        padding: 5,
        width: 75,
        fontSize: "0.9em",
      },
      "& li:not(:first-child)": {
        borderLeft: "1px solid var(--light-gray)",
      },
    },
  },
});

export const Rules: React.FC = () => {
  const { quickReference } = useStyles();
  return (
    <InfoBox title="Quick Reference Rules" className={quickReference}>
      <div>
        <h4>Skill & Characteristics Rolls</h4>
      </div>
      <div>
        <span>
          Levels of
          <br />
          Success
        </span>
        <ul>
          <li>
            Fumble
            <br />
            100/96+
          </li>
          <li>
            Fail
            <br />
            &gt; Skill
          </li>
          <li>
            Regular
            <br />
            &lt;= Skill
          </li>
          <li>
            Hard
            <br />
            1/2 Skill
          </li>
          <li>
            Extreme
            <br />
            1/5 Skill
          </li>
          <li>
            Critical
            <br />
            01
          </li>
        </ul>
      </div>
      <div>
        <span>
          Pushing Rolls: must justify reroll; Cannot Push Combat or
          <br />
          Sanity Rolls
        </span>
      </div>
      <div>
        <h4>Wounds & Healing</h4>
      </div>
      <div>
        <span>First Aid heals 1HP</span>
        <span>Medicine Heals +1D3 HP</span>
      </div>
      <div>
        <span>
          <b>Major Wound =</b> loss of &gt; max HP in one attack
        </span>
      </div>
      <div>
        <span>
          Reach 0 HP without Major Wound <b>= Unconscious</b>
        </span>
      </div>
      <div>
        <span>
          Reach 0 HP with Major Wound <b>= Dying</b>
        </span>
      </div>
      <div>
        <span>Dying: First Aid = temp. stabilized; then require Medicine</span>
      </div>
      <div>
        <span>
          <b>Natural Heal rate</b> (non Major Wound): recover 1HP per day
        </span>
      </div>
      <div>
        <span>
          <b>Natural Heal rate</b> (Major Wound): weekly healing roll
        </span>
      </div>
    </InfoBox>
  );
};
