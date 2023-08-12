import clsx from "clsx";
import React from "react";
import { createUseStyles } from "react-jss";

interface InfoBoxProps {
  title?: string;
  className?: string;
}

const useStyles = createUseStyles({
  infoBox: {
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "var(--dark-gray)",
    display: "flex",
    flexDirection: "column",

    "& > *:nth-child(2)": {
      marginTop: "auto",
    },

    "& > *:last-child": {
      marginBottom: "auto",
    },

    "& > *": {
      padding: 10,
    },

    "& .info-box-header": {
      backgroundColor: "var(--header-bg)",
      fontSize: "1.5em",
      fontWeight: "bold",
      textAlign: "center",
    },
  },
});

export const InfoBox: React.FC<React.PropsWithChildren & InfoBoxProps> = ({
  children,
  title,
  className,
}) => {
  const { infoBox } = useStyles();
  const classNames = clsx(infoBox, className);
  return (
    <div className={classNames}>
      {title ? <div className="info-box-header">{title}</div> : null}
      {children}
    </div>
  );
};
