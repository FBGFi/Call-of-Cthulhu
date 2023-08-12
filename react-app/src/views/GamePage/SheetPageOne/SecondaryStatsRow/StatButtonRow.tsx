import React from "react";
import { SecondaryStats } from "../../../../store/utils/types";
import { AttributeButton } from "./AttributeButton";

interface StatButtonRowProps {
  values: number[];
  attributeType: keyof SecondaryStats;
}

export const StatButtonRow: React.FC<StatButtonRowProps> = ({
  values,
  attributeType,
}) => {
  return (
    <tr>
      {values.map((value, index) => (
        <td key={index}>
          <AttributeButton value={value} attributeType={attributeType} />
        </td>
      ))}
    </tr>
  );
};
