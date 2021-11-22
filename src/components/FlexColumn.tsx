import React, { useState, useEffect } from "react";

const FlexColumn = ({
  children,
  padding,
  style,
  width,
  className,
}: {
  children: JSX.Element | JSX.Element[];
  padding?: string;
  style?: React.CSSProperties;
  width?: string;
  // width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  className?: string;
}): JSX.Element => {
  // const width = () =>{
  //   if (width){
  //     const t = (w*12)
  //   }
  // }
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: padding,
        width,
        // width:
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default FlexColumn;
