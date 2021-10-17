import "./ViewCard.scss";
import "@css/Knob.scss";

import React, { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "@hooks";

import { Pane } from "evergreen-ui";
import Section from "@components/UI/Section";
import classNames from "classnames";

interface ViewCardProperties {
  width?: number | string;
  height?: number | string;
  children?: JSX.Element | JSX.Element[];
}

const ViewCard = ({
  children,
  width,
  height,
}: ViewCardProperties): JSX.Element => {
  const cardStyle = {
    width: width ?? "100%",
    height: height ?? "100%",
  } as React.CSSProperties;

  const viewCardContainerStyle = {
    width: "100%",
    border: "1px solid blue",
    height: "100%",
  } as React.CSSProperties;

  return (
    <div style={viewCardContainerStyle}>
      <div>
        <div>{children}</div>
      </div>
    </div>
  );
};
// const ViewCard = ({
//   children,
//   width,
//   height,
// }: ViewCardProperties): JSX.Element => {
//   const cardStyle = {
//     width: width ?? "100%",
//     height: height ?? "100%",
//   } as React.CSSProperties;
//   return (
//     <div className="dimmer-container" style={cardStyle}>
//       <div className="dimmer">
//         <div className="dimmer-inner">{children}</div>
//       </div>
//     </div>
//   );
// };

export default ViewCard;
