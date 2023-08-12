import clsx from "clsx";
import React from "react";
import { createUseStyles } from "react-jss";

interface SheetPageProps {
  className?: string;
}

const useStyles = createUseStyles({
  sheetPage: {
    border: 8,
    borderColor: "var(--dark-gray)",
    borderStyle: "solid",
    background: "url(/images/paper_small.jpg)",
    backgroundSize: 200,
    padding: 15,
    width: 1200,
    boxSizing: "content-box",
    "&:first-of-type": {
      marginTop: 30,
    },
    "&:last-of-type": {
      marginBottom: 30,
    },
    "& > *": {
      width: 1200,
    },
    "& > *:not(:last-child)": {
      marginBottom: 15,
    },
    '& input[type="text"], & select': {
      background: "none",
      border: "none",
      borderBottom: "1px solid black",
      textAlign: "center",
      fontSize: "1.2em",
    },
    '& input[type="text"]:focus, & select:focus': {
      boxShadow: "none",
    },
    "& select": {
      textAlignLast: "center",
    },
  },
});

export const SheetPage: React.FC<React.PropsWithChildren & SheetPageProps> = ({
  children,
  className,
}) => {
  const { sheetPage } = useStyles();
  const classNames = clsx([sheetPage, className]);
  return <div className={classNames}>{children}</div>;
};
