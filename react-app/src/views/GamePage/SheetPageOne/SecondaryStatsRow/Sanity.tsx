import React from "react";
import { createUseStyles } from "react-jss";
import { getNumArray } from "../../../../utils/utils";
import { StatButtonRow } from "./StatButtonRow";

const useStyles = createUseStyles({
  sanity: {
    gridArea: "sanity",
    marginTop: -32,
    display: "flex",
    "& table": {
      width: "100%",
    },
    "& tbody": {
      display: "flex",
      flexDirection: "column",
    },

    "& tr:first-child": {
      marginLeft: "auto",
    },

    "& tr": {
      display: "flex",
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      height: 32,
    },
    "& td": {
      flex: 1,
      margin: "auto",
      "& button": {
        width: "100%",
      },
    },
  },
  titleContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    width: 22,
    position: "relative",
    "& h4": {
      transform: "rotate(90deg) translate(-50%, 60%)",
      transformOrigin: "bottom left",
      position: "absolute",
      left: "50%",
      bottom: "50%",
    },
  },
});

export const Sanity: React.FC = () => {
  const { sanity, titleContainer } = useStyles();
  const values = getNumArray(100);
  return (
    <div className={sanity}>
      <table>
        <tbody>
          <StatButtonRow values={values.slice(0, 8)} attributeType="sanity" />
          <StatButtonRow values={values.slice(8, 31)} attributeType="sanity" />
          <StatButtonRow values={values.slice(31, 54)} attributeType="sanity" />
          <StatButtonRow values={values.slice(54, 77)} attributeType="sanity" />
          <StatButtonRow
            values={values.slice(77, 100)}
            attributeType="sanity"
          />
        </tbody>
      </table>
      <div className={titleContainer}>
        <h4>Sanity</h4>
      </div>
    </div>
  );
};
