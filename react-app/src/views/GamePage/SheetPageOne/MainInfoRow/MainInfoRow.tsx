import React from "react";
import { SheetRow } from "../../SheetRow";
import { CharacterInfoContainer } from "./CharacterInfoContainer";
import { MainStatsContainer } from "./MainStatsContainer";
import { ChararacterImageContainer } from "./CharacterImageContainer";

export const MainInfoRow: React.FC = () => {
  return (
    <SheetRow>
      <CharacterInfoContainer />
      <MainStatsContainer />
      <ChararacterImageContainer />
    </SheetRow>
  );
};
