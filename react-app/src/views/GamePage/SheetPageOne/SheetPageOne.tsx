import React from "react";
import { SheetPage } from "../SheetPage";
import { MainInfoRow } from "./MainInfoRow/MainInfoRow";
import { SecondaryStatsRow } from "./SecondaryStatsRow/SecondaryStatsRow";
import { InvestigatorSkillsRow } from "./InvestigatorStillsRow/InvestigatorSkillsRow";
import { CombatRow } from "./CombatRow/CombatRow";

export const SheetPageOne: React.FC = () => {
  return (
    <SheetPage>
      <MainInfoRow />
      <SecondaryStatsRow />
      <InvestigatorSkillsRow />
      <CombatRow />
    </SheetPage>
  );
};
