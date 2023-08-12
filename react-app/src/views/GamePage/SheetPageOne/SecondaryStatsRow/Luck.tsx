import React from "react";
import { createUseStyles } from "react-jss";
import { getNumArray } from "../../../../utils/utils";
import { StatButtonRow } from "./StatButtonRow";

const useStyles = createUseStyles({
  luck: {
    gridArea: "luck",

    "& table": {
      width: "100%",
      height: "100%",
      position: "relative",

      "& > div": {
        position: "absolute",
        transform: "rotate(-90deg) translate(-70%, 100%)",
        transformOrigin: "bottom left",
        left: 0,
        bottom: "55%",
        width: 110,
        textAlign: "center",
      },

      "& tbody": {
        display: "flex",
        flexDirection: "column",
        height: "100%",
      },

      "& tr": {
        display: "flex",
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        "&:first-child": {
          marginLeft: "auto",
        },
        "&:not(:first-child)": {
          paddingLeft: 20,
          flex: 1,
          "& td": {
            flex: 1,
          },
        },
        "& td": {
          margin: "auto",
        },
      },
    },
  },
});

export const Luck: React.FC = () => {
  const { luck } = useStyles();
  const values = getNumArray(100);

  return (
    <div className={luck}>
      <table>
        <div>
          <h4>Luck</h4>
        </div>
        <tbody>
          <StatButtonRow values={values.slice(0, 8)} attributeType="luck" />
          <StatButtonRow values={values.slice(8, 31)} attributeType="luck" />
          <StatButtonRow values={values.slice(31, 54)} attributeType="luck" />
          <StatButtonRow values={values.slice(54, 77)} attributeType="luck" />
          <StatButtonRow values={values.slice(77, 100)} attributeType="luck" />
        </tbody>
      </table>
    </div>
  );
};
