import React from "react";
import { useRootContext } from "../../../../store/RootContext";
import { getNumArray } from "../../../../utils/utils";

const AssetInput: React.FC<{ index: number }> = ({ index }) => {
  const { state, setCurrentCharacter } = useRootContext();
  const { currentCharacter } = state;
  if (!currentCharacter) return null;
  const { cashAndAssets } = currentCharacter;
  const { assets } = cashAndAssets;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState(assets[index] as string | undefined);

  const onBlur = () => {
    if (value === undefined) return;
    const newAssets = [...assets];
    if (newAssets[index] === undefined) {
      newAssets.push(value);
    } else {
      newAssets[index] = value;
    }
    setCurrentCharacter({
      ...currentCharacter,
      cashAndAssets: { ...cashAndAssets, assets: newAssets },
    });
  };

  React.useEffect(() => {
    setValue(assets[index]);
    if (inputRef.current) {
      inputRef.current.value = assets[index] || "";
    }
  }, [assets]);

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

export const AssetInputs: React.FC = () => {
  const maxAssets = getNumArray(8);
  const [first, ...rest] = maxAssets;

  return (
    <>
      <div>
        <span>Assets</span>
        <AssetInput index={first} />
      </div>
      {rest.map((index) => (
        <AssetInput key={index} index={index} />
      ))}
    </>
  );
};
