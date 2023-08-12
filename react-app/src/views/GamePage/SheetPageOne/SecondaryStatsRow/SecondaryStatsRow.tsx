import React from "react";
import { SheetRow } from "../../SheetRow";
import { GeneralStatus } from "./GeneralStatus";
import { Sanity } from "./Sanity";
import { createUseStyles } from "react-jss";
import { HP } from "./HP";
import { MP } from "./MP";
import { Luck } from "./Luck";

const useStyles = createUseStyles({
  secondaryStatsRow: {
    backgroundColor: "var(--header-bg)",
    display: "grid",
    gridTemplateColumns: "1fr 2fr 2fr 1fr",
    gridTemplateAreas: `"general-status general-status general-status empty"
    "hp sanity sanity sanity"
    "hp title title mp-header"
    "luck luck luck mp-stats"
    "luck luck luck mp-stats"`,
    gap: 3,
    padding: 3,

    "& div": {
      minHeight: 30,
    },
    '& input[type="number"]': {
      backgroundColor: "var(--opaque-white)",
      textAlign: "center",
      width: 74,
      height: 26,
      fontSize: "1em",
      border: "2px solid var(--dark-gray)",
    },
    "& table": {
      borderSpacing: 0,
    },
    "& h4": {
      textDecoration: "underline",
    },
  },
  title: {
    gridArea: "title",
    display: "flex",
    "& h1": {
      marginLeft: "25%",
    },
  },
});

export const SecondaryStatsRow: React.FC = () => {
  const { secondaryStatsRow, title } = useStyles();
  return (
    <SheetRow className={secondaryStatsRow}>
      <GeneralStatus />
      <Sanity />
      <HP />
      <div className={title}>
        <h1>Call of Cthulhu</h1>
      </div>
      <MP />
      <Luck />
    </SheetRow>
  );
};
