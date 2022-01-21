import React, { useState, useEffect } from "react";
import theme from "@static/theme";

const HeaderLink = (): JSX.Element => {
    return (
        <div
            style={{
                padding: ".5rem",
                height: "fit-content",
                // height: "100%",
                width: "fit-content",
                fontSize: '2vh',
                // fontSize: theme.titleFont,
                fontWeight: "bold",
                // fontSize: theme.titleFont,
                position: "relative",
                //   justifyContent: "center",
                paddingLeft: "1em",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                // width: "100%",
                textAlign: "left",
                //   border: `1px solid ${theme.secondary}`,
                borderRadius: 50,
                // fontFamily: theme.titleFontFamily,
                // color: "black",
                // color: theme.secondary,
                //   backgroundColor: theme.secondary,
                // border: `1px solid ${theme.secondary}`,
                fontFamily: theme.logoFont,
            }}
        >
            {/* <Logo />  */}

            Seisolo.io: Remixing the Recital
        </div>
    );
};

export default HeaderLink;

const Logo = (): JSX.Element => {
    const size = 20;
    return (
        <div
            style={{
                height: "80%",
                width: size,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                margin: ".1em",
            }}
        >
            <img
                style={{ height: size, width: size }}
                src={`${process.env.PUBLIC_URL}/Icons/Logo.svg`}
            />
        </div>
    );
};
