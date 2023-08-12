import React from "react";
import { InfoBox } from "../../InfoBox";
import { createUseStyles } from "react-jss";
import { CashInputs } from "./CashInputs";
import { AssetInputs } from "./AssetInputs";

const useStyles = createUseStyles({
  assetContainer: {
    display: "grid",
    gap: 5,
    "& > div": {
      display: "flex",
      "& span": {
        marginBlock: "auto",
      },
      "& input": {
        flex: 1,
      },
    },
  },
});

export const Cash: React.FC = () => {
  const { assetContainer } = useStyles();
  return (
    <InfoBox title="Cash & Assets">
      <div className={assetContainer}>
        <CashInputs />
        <AssetInputs />
      </div>
    </InfoBox>
  );
};
