import React from "react";
import { SheetRow } from "../../SheetRow";
import { Rules } from "./Rules";
import { FellowInvestigators } from "./FellowInvestigators";

export const FellowInvestigatorsRow: React.FC = () => {
  return (
    <SheetRow>
      <Rules />
      <FellowInvestigators />
    </SheetRow>
  );
};
