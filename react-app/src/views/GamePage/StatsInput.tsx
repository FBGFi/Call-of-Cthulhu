import clsx from "clsx";
import React from "react";
import { createUseStyles } from "react-jss";

interface StatsInputProps {
  type: "big" | "small";
  value?: number;
  onChange: (value: number) => void;
  className?: string;
  disabled?: boolean;
}

const useStyles = createUseStyles({
  statsInput: {
    display: "flex",
    borderColor: "var(--light-gray)",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "rgba(255,255,255, 0.7)",
    "&.small": {
      fontSize: 9,
      width: 70,
      height: "calc(70px * (2 / 3))",
    },
    "&.big": {
      fontSize: 14,
      width: 90,
      height: 60,
    },
    "& input": {
      padding: 5,
      border: "none",
      background: "none",
      color: "black",
      textAlign: "center",
    },
    "& > input": {
      width: "calc(100% * (2 / 3))",
      height: "100%",
      fontSize: "2.2em",
      borderRight: "1px solid var(--light-gray)",
      zIndex: 1,
      padding: 0,
    },
  },
  calculatedValues: {
    width: "calc(100% / 3)",
    "& input:first-child": {
      borderBottom: "1px solid var(--light-gray)",
    },
    "& input": {
      fontSize: "1.4em",
      width: "100%",
      height: "50%",
    },
  },
});

export const StatsInput: React.FC<StatsInputProps> = ({
  value,
  onChange,
  type,
  className,
  disabled = false,
}) => {
  const [currentValue, setCurrentValue] = React.useState(value);
  const { statsInput, calculatedValues } = useStyles();

  React.useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <div className={clsx(statsInput, type, className)}>
      <input
        type="number"
        onChange={(e) => setCurrentValue(Number(e.target.value))}
        onBlur={() => currentValue !== undefined && onChange(currentValue)}
        value={currentValue}
        disabled={disabled}
        readOnly={disabled}
      />
      <div className={calculatedValues}>
        <input
          type="number"
          disabled
          value={
            currentValue !== undefined
              ? Math.floor(currentValue / 2)
              : undefined
          }
        />
        <input
          type="number"
          disabled
          value={
            currentValue !== undefined
              ? Math.floor(currentValue / 5)
              : undefined
          }
        />
      </div>
    </div>
  );
};
