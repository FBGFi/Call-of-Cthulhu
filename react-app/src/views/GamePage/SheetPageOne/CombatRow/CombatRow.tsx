import React from "react";
import { SheetRow } from "../../SheetRow";
import { Weapons } from "./Weapons";
import { Combat } from "./Combat";

export const CombatRow: React.FC = () => {
  return (
    <SheetRow>
      <Weapons />
      <Combat />
    </SheetRow>
  );
};
