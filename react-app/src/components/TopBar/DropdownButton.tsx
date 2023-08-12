import React from "react";
import { createUseStyles } from "react-jss";

interface DropdownButtonProps {
  imageSource: string;
  alt: string;
  align?: "left" | "right";
}

const useStyles = createUseStyles({
  dropdownButton: {
    "& > div": {
      backgroundColor: "white",
      position: "fixed",
      top: 40,
      right: 0,
      zIndex: 2,
    },
    "& > button": {
      padding: 0,
      border: 0,
      display: "block",
      appearance: "none",
      height: 30,
      width: 30,
      background: "none",
      borderRadius: "50%",
      transition: "transform 0.1s ease-in-out",
      "& img": {
        width: 30,
        height: 30,
      },
      "&:hover": {
        transform: "scale(1.05)",
      },
    },
  },
});

export const DropdownButton: React.FC<
  React.PropsWithChildren & DropdownButtonProps
> = ({ alt, imageSource, children, align }) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const { dropdownButton } = useStyles();
  const alignMent =
    align === "left"
      ? "marginRight"
      : align === "right"
      ? "marginLeft"
      : undefined;

  const onClick = () => {
    setIsFocused(!isFocused);
  };

  return (
    <div
      className={dropdownButton}
      style={alignMent && { [alignMent]: "auto" }}
      onClick={onClick}
    >
      <button style={{ boxShadow: isFocused ? "0 0 5px black" : "none" }}>
        <img alt={alt} src={imageSource} />
        {/* {props.alertIndicator} */}
      </button>
      {isFocused && <div>{children}</div>}
    </div>
  );
};
