import React from "react";
import { SheetRow } from "../../SheetRow";
import { InfoBox } from "../../InfoBox";
import { useRootContext } from "../../../../store/RootContext";
import { InvestigatorSkill } from "./InvestigatorSkill";
import { InvestigatorSkills } from "../../../../store/utils/types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  investigatorSkillsRow: {
    "& > div": {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      gridTemplateAreas: '"header header header header"',
    },
    "& .info-box-header": {
      gridArea: "header",
    },
  },
  skillColumn: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: "0 !important",
  },
});

type InvestigatorSkillKey = keyof InvestigatorSkills;
type InvestigatorSkillValue = InvestigatorSkills[InvestigatorSkillKey];

export const InvestigatorSkillsRow: React.FC = () => {
  const { state } = useRootContext();
  const { currentCharacter } = state;
  if (!currentCharacter) return null;
  const { investigatorSkills } = currentCharacter;
  const { investigatorSkillsRow, skillColumn } = useStyles();
  const investigatorSkillEntries = Object.entries(investigatorSkills);
  const sortedKeys = investigatorSkillEntries
    .sort((a, b) => {
      const aKey = a[0];
      const aValue = a[1] as InvestigatorSkillValue;
      const bKey = b[0];
      const bValue = b[1] as InvestigatorSkillValue;
      if (aValue.isCustom && !aValue.label && !bValue.isCustom) return 1;
      if (bValue.isCustom && !bValue.label && !aValue.isCustom) return -1;
      return aKey.localeCompare(bKey);
    })
    .map(([key]) => key);
  const columns = [
    sortedKeys.slice(0, 15),
    sortedKeys.slice(15, 30),
    sortedKeys.slice(30, 45),
    sortedKeys.slice(45, 60),
  ];
  return (
    <SheetRow className={investigatorSkillsRow}>
      <InfoBox title="Investigator Skills">
        {columns.map((column, index) => (
          <div key={index} className={skillColumn}>
            {column.map((key) => (
              <InvestigatorSkill
                key={key}
                skillKey={key as keyof InvestigatorSkills}
              />
            ))}
          </div>
        ))}
      </InfoBox>
    </SheetRow>
  );
};
