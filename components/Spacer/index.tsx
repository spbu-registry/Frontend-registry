import React, { FC } from "react";

interface SpacerProps {
  size: number;
  axis?: "vertical" | "horizontal";
  style?: any;
}

const Spacer: FC<SpacerProps> = ({ size, axis, style = {} }) => {
  const width = axis === "vertical" ? 1 : size;
  const height = axis === "horizontal" ? 1 : size;
  return (
    <span
      style={{
        display: "block",
        width,
        minWidth: width,
        height,
        minHeight: height,
      }}
    />
  );
};

export default Spacer;
