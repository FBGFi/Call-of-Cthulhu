import React from "react";
import { SheetPageOne } from "./SheetPageOne/SheetPageOne";
import { useRootContext } from "../../store/RootContext";
import { SheetPageTwo } from "./SheetPageTwo/SheetPageTwo";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  gamePage: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
    marginTop: 70,
  },
});

export const GamePage: React.FC = () => {
  const { state } = useRootContext();
  const { gamePage } = useStyles();
  return (
    <div className={gamePage}>
      {!state.isLoading && state.currentCharacter && (
        <>
          <SheetPageOne />
          <SheetPageTwo />
        </>
      )}
    </div>
  );
};
