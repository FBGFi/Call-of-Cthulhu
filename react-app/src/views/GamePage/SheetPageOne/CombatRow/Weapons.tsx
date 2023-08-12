import React from "react";
import { InfoBox } from "../../InfoBox";
import { createUseStyles } from "react-jss";
import { useRootContext } from "../../../../store/RootContext";
import { Weapon } from "../../../../store/utils/types";

const useStyles = createUseStyles({
  weapons: {
    flex: 1,
  },
  weaponsContainer: {
    flex: 1,
    display: "grid",
    gap: 5,
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    textAlign: "center",
    width: "100%",

    "& input": {
      background: "none",
      border: "none",
      borderBottom: "1px solid black",
      textAlign: "center",
      minWidth: 0,
      color: "black !important",
      "&:focus": {
        boxShadow: "none",
      },
    },
    "& > div": {
      display: "flex",
      "& > *": {
        height: "100%",
        textAlign: "center",
        width: "100%",
        fontSize: "0.95em !important",
      },
    },
  },
});

const Header: React.FC = () => (
  <>
    <span>Weapon</span>
    <span>Regular</span>
    <span>Hard</span>
    <span>Extreme</span>
    <span>Damage</span>
    <span>Range</span>
    <span>Attacks</span>
    <span>Ammo</span>
    <span>Malf</span>
  </>
);

const NullableNumberInput: React.FC<{
  value?: number | "-";
  setValue: (value?: number | "-") => void;
}> = ({ value, setValue }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const toNum = parseInt(value);
    if (inputRef.current) {
      if (!isNaN(toNum)) {
        inputRef.current.value = toNum.toString();
      } else {
        inputRef.current.value = "";
      }
    }
  };

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const toNum = parseInt(value);
    setValue(!isNaN(toNum) ? toNum : "-");
    if (inputRef.current && (!toNum || isNaN(toNum))) {
      inputRef.current.value = "-";
    }
  };

  const onFocus = () => {
    if (inputRef.current) {
      if (inputRef.current.value === "-") {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <input
      type="text"
      ref={inputRef}
      defaultValue={value}
      onFocus={onFocus}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

const WeaponInputRow: React.FC<{
  weapon: Weapon;
  setWeapon: (weapon: Weapon) => void;
}> = ({ weapon, setWeapon }) => {
  const [attackValue, setAttackValue] = React.useState(weapon.value);

  React.useEffect(() => {
    setAttackValue(weapon.value);
  }, [weapon.value]);

  return (
    <>
      <div>
        <input
          type="text"
          onBlur={(e) => setWeapon({ ...weapon, name: e.target.value })}
          defaultValue={weapon.name}
        />
      </div>
      <div>
        <input
          type="number"
          defaultValue={attackValue}
          onBlur={() => setWeapon({ ...weapon, value: attackValue })}
          onChange={(e) => setAttackValue(Number(e.target.value))}
        />
      </div>
      <div>
        <input
          type="number"
          disabled
          value={attackValue && Math.floor(attackValue / 2)}
        />
      </div>
      <div>
        <input
          type="number"
          disabled
          value={attackValue && Math.floor(attackValue / 5)}
        />
      </div>
      <div>
        <input
          type="text"
          onBlur={(e) => setWeapon({ ...weapon, damage: e.target.value })}
          defaultValue={weapon.damage}
        />
      </div>
      <div>
        <NullableNumberInput
          value={weapon.range}
          setValue={(value) => setWeapon({ ...weapon, range: value })}
        />
      </div>
      <div>
        <NullableNumberInput
          value={weapon.range}
          setValue={(value) => setWeapon({ ...weapon, attacks: value })}
        />
      </div>
      <div>
        <NullableNumberInput
          value={weapon.range}
          setValue={(value) => setWeapon({ ...weapon, ammo: value })}
        />
      </div>
      <div>
        <NullableNumberInput
          value={weapon.range}
          setValue={(value) => setWeapon({ ...weapon, malf: value })}
        />
      </div>
    </>
  );
};

export const Weapons: React.FC = () => {
  const { state, setCurrentCharacter } = useRootContext();
  const { currentCharacter } = state;
  if (!currentCharacter) return null;
  const { investigatorSkills } = currentCharacter;
  const { weapons, weaponsContainer } = useStyles();
  const brawlValue =
    investigatorSkills.fightingBrawl.value ||
    investigatorSkills.fightingBrawl.startingValue;

  const setWeapon = (weapon: Weapon, index: number) => {
    setCurrentCharacter({
      ...currentCharacter,
      weapons: currentCharacter.weapons.map((oldWeapon, i) =>
        i === index ? weapon : oldWeapon,
      ),
    });
  };

  return (
    <InfoBox title="Weapons" className={weapons}>
      <div className={weaponsContainer}>
        <Header />
        <div>
          <span>Unarmed</span>
        </div>
        <div>
          <span>{brawlValue || "-"}</span>
        </div>
        <div>
          <span>{brawlValue ? Math.floor(brawlValue / 2) : "-"}</span>
        </div>
        <div>
          <span>{brawlValue ? Math.floor(brawlValue / 5) : "-"}</span>
        </div>
        <div>
          <span>1D3 + DB</span>
        </div>
        <div>
          <span>-</span>
        </div>
        <div>
          <span>1</span>
        </div>
        <div>
          <span>-</span>
        </div>
        <div>
          <span>-</span>
        </div>
        {currentCharacter.weapons.map((weapon, index) => (
          <WeaponInputRow
            key={index}
            weapon={weapon}
            setWeapon={(weapon) => setWeapon(weapon, index)}
          />
        ))}
      </div>
    </InfoBox>
  );
};
