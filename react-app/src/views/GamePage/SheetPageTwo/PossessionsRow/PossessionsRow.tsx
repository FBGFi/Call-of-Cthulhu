import React from "react";
import { SheetRow } from "../../SheetRow";
import { Gear } from "./Gear";
import { Cash } from "./Cash";

export const PossessionsRow: React.FC = () => {
  return (
    <SheetRow>
      <Gear />
      <Cash />
    </SheetRow>
  );
};
