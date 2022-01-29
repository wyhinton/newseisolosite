import { motion } from 'framer-motion';
import React, { useState, useEffect, useMemo } from 'react';
import GridLayout, { Layout } from "react-grid-layout";
import ViewCard from "@components/Home/Grid/GridLayoutTools/ViewCard"
import "@css/react-grid-layout.scss";
import "@css/react-resizable.css";
import { borderRadius } from 'ui-box';
import theme from '@static/theme';
// const samples = 

const layout = [

]




const DAWGridLayout = ({ children, layout }: { children?: JSX.Element | JSX.Element[], layout?: Layout[] }): JSX.Element => {
    // const wrappedWidgets = useMemo(
    //     () =>
    //         layout.map((c, i) => {
    //             const id = c.i;
    //             return (
    //                 <div key={id} id={id} style={{
    //                     backgroundColor: "yellow",
    //                     height: "100%",
    //                     width: "100%",
    //                 }}>
    //                     <motion.div
    //                         id={id}
    //                         style={{
    //                             backgroundColor: "yellow",
    //                             height: "100%",
    //                             width: "100%",
    //                         }}
    //                     //   style={cardContainerStyle}
    //                     >
    //                         <ViewCard
    //                             border={true}
    //                             overflowHidden={true}
    //                             radius={undefined}
    //                         >
    //                             {children[i]}
    //                         </ViewCard>
    //                     </motion.div>
    //                 </div>
    //             );
    //         }),
    //     [layout]
    // );

    const makeTracks = (count: number) => {
        const range = Array.from(Array(count).keys());
        const height = 2;
        const width = 12;
        return range.map((r, i) => {
            return { i: `track_${i}`, x: 0, y: i * 2, w: width, h: height, static: true }
        })
    }

    const makeBlocks = (count: number) => {
        const range = Array.from(Array(count).keys());
        const height = 2;
        const width = 2;
        return range.map((r, i) => {
            return { i: `track_${i}`, x: 0, y: i * 2, w: width, h: height, static: false }
        })
    }

    const

    const tracks = makeTracks(4);
    const blocks = makeBlocks(3);


    return (
        <GridLayout
            style={{ pointerEvents: "all" }}
            allowOverlap
            isDraggable={true}
            isResizable={true}
            // compactType=''
            verticalCompact={false}
            preventCollision={true}
            className="layout"
            margin={[0, 0]}
            cols={12} rowHeight={30} width={1200}>
            {/* {wrappedWidgets} */}
            {blocks.map((t, i) => {
                return (
                    <div
                        style={{
                            height: "100%",
                            width: "100%",
                        }}
                        data-grid={t}
                        key={`block_${i}`}>
                        <Block />

                    </div>
                )

            })}
            {tracks.map((t, i) => {
                return (
                    <div
                        style={{
                            height: "100%",
                            width: "100%",
                            zIndex: -1,
                        }}
                        data-grid={t}
                        key={`track_${i}`}>
                        <Track />

                    </div>
                )

            })}
        </GridLayout>
    );
}

const Track = ({ }: {}): JSX.Element => {
    return (
        <div
            style={{
                // backgroundColor: "yellow",
                border: "1px solid blue",
                height: "100%",
                width: "100%",
                zIndex: -1,
                backgroundColor: theme.primaryDark,
            }}>
        </div >
    )
}


const Block = ({ }: {}): JSX.Element => {

    const dbgStyle = {
        backgroundColor: "red",
    }
    return (
        <div style={{
            backgroundColor: "blue",
            width: "100%",
            height: "100%",
            borderRadius: theme.borderRadius,
            overflow: "hidden",
        }}>

        </div>
    )
}


export default DAWGridLayout

