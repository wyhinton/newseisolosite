import React, { useState, useEffect } from "react";
import FlexRow from "@components/UI/FlexRow";
import theme from "@static/theme";
import HeaderLink from "./HeaderLink";
import NavLinks from "./NavLinks";

const Nav = (): JSX.Element => {
    return (
        <>
            <HeaderLink />
            <NavLinks />
        </>
    );
};

export default Nav;
