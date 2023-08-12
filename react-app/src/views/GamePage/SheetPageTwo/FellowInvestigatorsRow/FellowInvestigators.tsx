import React from "react";
import { InfoBox } from "../../InfoBox";
import { useRootContext } from "../../../../store/RootContext";
import { getNumArray } from "../../../../utils/utils";
import { FellowInvestigator } from "../../../../store/utils/types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  fellowInvestigators: {
    flex: 1,
    "& .info-box-header": {
      fontSize: "2.5em",
    },
    "& .me-container": {
      color: "white",
      display: "flex",
      "& h1": {
        margin: "auto",
      },
    },
  },
  investigatorContainer: {
    display: "grid",
    gap: 30,
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateRows: "1fr 1fr 1fr",
    flex: 1,
    backgroundImage: "url(/images/tentacles.png)",
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPositionX: "center",
    backgroundPositionY: "135%",
  },
  playerContainer: {
    border: "2px solid var(--light-gray)",
    backgroundImage: "url(/images/paper_small.jpg)",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    "& > div": {
      flex: 1,
      display: "flex",
      padding: 10,
      "& > *": {
        marginBlock: "auto",
      },
      "& input": {
        flex: 1,
      },
    },
  },
});

const InvestigatorInputs: React.FC<{ index: number }> = ({ index }) => {
  const { state, setCurrentCharacter } = useRootContext();
  const { currentCharacter } = state;
  if (!currentCharacter) return null;
  const { playerContainer } = useStyles();
  const { fellowInvestigators } = currentCharacter;
  const currentValue = fellowInvestigators[index];

  const onBlur = (value: string, key: keyof FellowInvestigator) => {
    const newInvestigators = [...fellowInvestigators];
    newInvestigators[index] = { ...currentValue, [key]: value };
    setCurrentCharacter({
      ...currentCharacter,
      fellowInvestigators: newInvestigators,
    });
  };

  return (
    <div className={playerContainer}>
      <div>
        <span>Char.</span>
        <input
          onBlur={(e) => onBlur(e.target.value, "char")}
          defaultValue={currentValue.char}
          type="text"
          size={1}
        />
      </div>
      <div>
        <span>Player.</span>
        <input
          onBlur={(e) => onBlur(e.target.value, "player")}
          defaultValue={currentValue.player}
          type="text"
          size={1}
        />
      </div>
    </div>
  );
};

export const FellowInvestigators: React.FC = () => {
  const { fellowInvestigators, investigatorContainer } = useStyles();
  const maxInvestigators = getNumArray(8);
  const firstHalf = maxInvestigators.slice(0, 4);
  const secondHalf = maxInvestigators.slice(4, 8);
  return (
    <InfoBox title="Fellow Investigators" className={fellowInvestigators}>
      <div className={investigatorContainer}>
        {firstHalf.map((index) => (
          <InvestigatorInputs key={index} index={index} />
        ))}
        <div className="me-container">
          <h1>ME</h1>
        </div>
        {secondHalf.map((index) => (
          <InvestigatorInputs key={index} index={index} />
        ))}
      </div>
    </InfoBox>
  );
};
