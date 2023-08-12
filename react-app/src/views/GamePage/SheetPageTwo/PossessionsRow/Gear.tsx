import React from "react";
import { InfoBox } from "../../InfoBox";
import { useRootContext } from "../../../../store/RootContext";
import { getNumArray } from "../../../../utils/utils";
import { createUseStyles } from "react-jss";

const GearInput: React.FC<{ index: number }> = ({ index }) => {
  const { state, setCurrentCharacter } = useRootContext();
  const { currentCharacter } = state;
  if (!currentCharacter) return null;
  const { gear } = currentCharacter;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState(gear[index] as string | undefined);

  const onBlur = () => {
    if (value === undefined) return;
    const newGear = [...gear];
    if (newGear[index] === undefined) {
      newGear.push(value);
    } else {
      newGear[index] = value;
    }
    setCurrentCharacter({ ...currentCharacter, gear: newGear });
  };

  React.useEffect(() => {
    setValue(gear[index]);
    if (inputRef.current) {
      inputRef.current.value = gear[index] || "";
    }
  }, [gear]);

  return (
    <input
      ref={inputRef}
      type="text"
      onChange={(e) => setValue(e.target.value)}
      value={value}
      onBlur={onBlur}
    />
  );
};

const useStyles = createUseStyles({
  gear: {
    flex: 1,
  },
  inputContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 5,
  },
});

export const Gear: React.FC = () => {
  const maxAmountOfGear = getNumArray(20);
  const { inputContainer, gear } = useStyles();
  return (
    <InfoBox title="Gear & Possessions" className={gear}>
      <div className={inputContainer}>
        {maxAmountOfGear.map((index) => (
          <GearInput key={index} index={index} />
        ))}
      </div>
    </InfoBox>
  );
};
