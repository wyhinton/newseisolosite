import React, { useState, useEffect } from "react";
import FlexRow from "@components/UI/FlexRow";
import theme from "@static/theme";

const NavLinks = (): JSX.Element => {
    const containerStyle = {
        width: "fit-content",
        position: "fixed",
        top: 0,
        right: 0,
        height: "5vw",
        zIndex: 1000,
    } as React.CSSProperties;

    const buttons = Array.from(Array(3).keys());

    return (
        <FlexRow style={containerStyle} justifyContent="center">
            {buttons.map((button, i) => {
                const buttonStyle = {
                    width: "4vh",
                    height: "4vh",
                    // height: "100%",
                    margin: "1em",
                    backgroundColor: theme.secondary,
                    // border: te
                    // backgroundColor: "blue",
                    borderRadius: "50%",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "black",
                } as React.CSSProperties;
                return (
                    <span key={`b_${i}`} style={buttonStyle}>
                        {i}
                    </span>
                );
            })}
        </FlexRow>
    );
};

export default NavLinks;
