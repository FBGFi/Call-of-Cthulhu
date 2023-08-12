import React from "react";
import { SheetPage } from "../SheetPage";
import { BackstoryRow } from "./BackstoryRow/BackstoryRow";
import { PossessionsRow } from "./PossessionsRow/PossessionsRow";
import { FellowInvestigatorsRow } from "./FellowInvestigatorsRow/FellowInvestigatorsRow";

export const SheetPageTwo: React.FC = () => {
  return (
    <SheetPage>
      <BackstoryRow />
      <PossessionsRow />
      <FellowInvestigatorsRow />
    </SheetPage>
  );
};
