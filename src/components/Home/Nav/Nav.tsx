import React, { useState, useEffect } from "react";
import FlexRow from "@components/UI/FlexRow";
import theme from "@static/theme";
import HeaderLink from "./HeaderLink";
import NavLinks from "./NavLinks";
import AboutButton from "../AboutButton";
import AboutModal from "../Modals/AboutModal";
// import useMediaQuery from '@mui/material/useMediaQuery';
import { useMediaQuery } from 'react-responsive'


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
// breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}

export default Nav;

const TopBar = (): JSX.Element => {
    const buttons = Array.from(Array(3).keys());

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: "0%",
                // top: 0,
                // left: 0,
                // padding: ".5rem",
                paddingLeft: theme.padding,
                paddingRight: theme.padding,
                // height: "fit-content",
                width: "fit-content",
                fontWeight: "bold",
                // paddingLeft: "1em",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                // width: "100%",
                textAlign: "left",
                // border: `1px solid ${theme.secondary}`,
                // borderRadius: 10,
                fontFamily: theme.titleFontFamily,
                color: "black",
                // backgroundColor: theme.secondary,
                backgroundColor: theme.primaryDark,
                // fontSize: 100,
                fontSize: 30,
                // transform: "translate(-50%, 0%)",
                // fontStyle: "ca"
                textTransform: "uppercase",
                // fontSize: theme.titleFont,
                WebkitTextStroke: `1px solid ${theme.secondary}`,
                zIndex: 100,
                height: 30,

                // backgroundColor: theme.secondary,
            }}
        >
            {/* <Logo />  */}

            Seisolo.io: Remixing the Recital
        </div>
    );
};


// function morphLathe(geo1, geo2, percentage){
//     //...
//     //morphs between geo1 and geo2
//     //if percentage=0, returned geometry is 100% similar to geo1
//     //if percentage=1, returned geometry is 100% similar to geo2
// }

// //two different point arrays of the same length
// const points1 = [];
// const points2 = [];

// //point array 1
// for ( let i = 0; i < 10; i ++ ) {
// 	points1.push( new THREE.Vector2(i*20, i*10));
// }
// //point array 2
// for ( let i = 0; i < 10; i ++ ) {
// 	points2.push( new THREE.Vector2(i*20, i*4));
// }

// const latheGeo1 = new THREE.LatheGeometry( points1 );
// const latheGeo2 = new THREE.LatheGeometry( points2 );


// //how to morph between latheGeo1 and latheGeo2
// const morphedGeo = morphLathe(latheGeo1, latheGeo2, .5)

