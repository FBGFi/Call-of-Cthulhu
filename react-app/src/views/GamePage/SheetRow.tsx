import clsx from "clsx";
import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  sheetRow: {
    display: "flex",
    gap: 3,
  },
});

interface SheetRowProps {
  className?: string;
}

export const SheetRow: React.FC<React.PropsWithChildren & SheetRowProps> = ({
  children,
  className,
}) => {
  const { sheetRow } = useStyles();
  return <div className={clsx(sheetRow, className)}>{children}</div>;
};
