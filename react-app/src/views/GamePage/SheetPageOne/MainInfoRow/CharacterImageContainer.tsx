import React from "react";
import { useRootContext } from "../../../../store/RootContext";
import { createUseStyles } from "react-jss";
import { InfoBox } from "../../InfoBox";

const useStyles = createUseStyles({
  characterImage: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    width: "20%",
    overflow: "hidden",
    "& > *": {
      padding: 0,
    },
    "& img": {
      flex: 1,
      objectFit: "cover",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
    "& label": {
      zIndex: 1,
      marginTop: "auto !important",
      marginBottom: "0 !important",
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      padding: "2px 2px 1px 2px",
      cursor: "pointer",
      textAlign: "center",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      },
    },
    "& input": {
      display: "none",
    },
  },
});

export const ChararacterImageContainer: React.FC = () => {
  const { state, setCurrentCharacter } = useRootContext();
  const { currentCharacter } = state;
  if (!currentCharacter) return null;
  const imageInputRef = React.useRef<HTMLInputElement>(null);
  const { characterImage } = useStyles();

  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = (frEvent) => {
      const src = frEvent.target?.result;
      if (src && e.target.files) {
        setCurrentCharacter({
          ...currentCharacter,
          characterInfo: {
            ...currentCharacter.characterInfo,
            image: {
              title: e.target.files[0].name,
              src: src as string,
            },
          },
        });
      }
    };
    if (e.target.files) {
      // This fails sometimes for some reason when pressing cancel
      try {
        reader.readAsDataURL(e.target.files[0]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <InfoBox className={characterImage}>
      <img src={currentCharacter.characterInfo.image?.src} />
      <label
        onClick={() => imageInputRef.current?.click()}
        htmlFor="image-input"
      >
        <input
          ref={imageInputRef}
          name="image-input"
          onChange={(e) => changeImage(e)}
          type="file"
          className="character-image-input"
        />
        {currentCharacter?.characterInfo.image?.title || "Choose an Image"}
      </label>
    </InfoBox>
  );
};
