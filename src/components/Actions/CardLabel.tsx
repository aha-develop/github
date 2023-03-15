import React, { PropsWithChildren } from "react";

export type CardLabelProps = {
  title: string;
};

const CardLabel: React.FC<PropsWithChildren<CardLabelProps>> = ({
  title,
  children,
}) => {
  return (
    <span style={{ padding: "3px" }}>
      <strong>{title}:</strong> {children ?? "Unknown"}
    </span>
  );
};

export default CardLabel;
