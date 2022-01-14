import React, { useState, useEffect } from "react";

const FlexRow = ({
  children,
  padding,
  className,
  style,
  width,
  height,
  justifyContent,
  id,
}: {
  children: JSX.Element | JSX.Element[] | Element[];
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: string;
  height?: string;
  justifyContent?: string;
  id?: string;
}): JSX.Element => {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "row",
        padding: padding,
        width,
        height,
        justifyContent,
        ...style,
      }}
      id={id}
    >
      {children}
    </div>
  );
};

export default FlexRow;
