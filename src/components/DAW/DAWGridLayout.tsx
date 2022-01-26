import { motion } from 'framer-motion';
import React, { useState, useEffect, useMemo } from 'react';
import GridLayout, { Layout } from "react-grid-layout";
import ViewCard from "@components/Home/Grid/GridLayoutTools/ViewCard"

// const samples = 

const layout = [

]




const DAWGridLayout = ({ children, layout }: { children: JSX.Element[], layout: Layout[] }): JSX.Element => {
    const wrappedWidgets = useMemo(
        () =>
            layout.map((c, i) => {
                const id = c.i;
                return (
                    <div key={id} id={id}>
                        <motion.div
                            id={id}
                        //   style={cardContainerStyle}
                        >
                            <ViewCard
                                border={true}
                                overflowHidden={true}
                                radius={undefined}
                            >
                                {children[i]}
                            </ViewCard>
                        </motion.div>
                    </div>
                );
            }),
        [layout]
    );

    return (
        <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
            {wrappedWidgets}
        </GridLayout>
    );
}
export default DAWGridLayout

