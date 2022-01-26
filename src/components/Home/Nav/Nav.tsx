import React, { useState, useEffect } from "react";
import FlexRow from "@components/UI/FlexRow";
import theme from "@static/theme";
import HeaderLink from "./HeaderLink";
import NavLinks from "./NavLinks";
import AboutButton from "../AboutButton";
import AboutModal from "../Modals/AboutModal";

const Nav = (): JSX.Element => {
    return (
        <>
            <AboutButton />
            <AboutModal />
            <HeaderLink />
            <TopBar />
            {/* <NavLinks /> */}
        </>
    );
};

export default Nav;

const TopBar = (): JSX.Element => {
    const buttons = Array.from(Array(3).keys());

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                padding: ".5rem",
                height: "fit-content",
                width: "fit-content",
                fontWeight: "bold",
                paddingLeft: "1em",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                // width: "100%",
                textAlign: "left",
                border: `1px solid ${theme.secondary}`,
                // borderRadius: 10,
                fontFamily: theme.titleFontFamily,
                color: "black",
                backgroundColor: theme.secondary,
                // fontSize: 100,
                fontSize: 12,
                zIndex: 100,
                // backgroundColor: theme.secondary,
            }}
        >
            {/* <Logo />  */}

            Seisolo.io: Remixing the Recital
        </div>
    );
};


