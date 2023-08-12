import React from "react";
import { useRootContext } from "../../../../store/RootContext";

const CashInput: React.FC<{ id: "spendingLevel" | "cash" }> = ({ id }) => {
  const { state, setCurrentCharacter } = useRootContext();
  const { currentCharacter } = state;
  if (!currentCharacter) return null;
  const { cashAndAssets } = currentCharacter;
  const [value, setValue] = React.useState(cashAndAssets[id]?.toString());
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line
    const [_, ...rest] = e.target.value;
    setValue(value === undefined ? e.target.value : rest.join(""));
  };

  const onBlur = () => {
    if (value !== undefined) {
      const toNum = parseFloat(value);
      if (!isNaN(toNum)) {
        setCurrentCharacter({
          ...currentCharacter,
          cashAndAssets: {
            ...cashAndAssets,
            [id]: toNum,
          },
        });
        setValue(toNum.toString());
      } else if (inputRef.current) {
        setValue(cashAndAssets[id]?.toString());
        inputRef.current.value = "";
      }
    }
  };

  React.useEffect(() => {
    setValue(cashAndAssets[id]?.toString());
  }, [cashAndAssets[id]]);

  return (
    <input
      ref={inputRef}
      type="text"
      onChange={onChange}
      onBlur={onBlur}
      value={value !== undefined ? `$${value}` : undefined}
    />
  );
};

export const CashInputs: React.FC = () => {
  return (
    <>
      <div>
        <span>Spending Level</span>
        <CashInput id="spendingLevel" />
      </div>
      <div>
        <span>Cash</span>
        <CashInput id="cash" />
      </div>
    </>
  );
};
