import { useWindowSize } from "@hooks";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import ViewCard from "@components/Home/Grid/GridLayoutTools/ViewCard";
import appConfig from "@static/appConfig";
import theme from "@static/theme";

const ResponsiveGridLayout = WidthProvider(Responsive);


interface GenericGridProps extends ReactGridLayout.ResponsiveProps {
    layout: Layout[]
    children: JSX.Element | JSX.Element[]
    className: string;
    debug: boolean;
    containerPadding: [number, number];
    style?: React.CSSProperties;
    layouts: Layouts;
}

const GenericGrid = (props: GenericGridProps): JSX.Element => {
    const { debug, layout, children, className, style, containerPadding } = props;
    // const { containerPadding, cols, marign } = props;

    const cardContainerStyle = {
        width: "100%",
        height: "100%",
        border: debug ? "1px solid blue" : ""
    } as React.CSSProperties;

    const l = layout.map((l) => {
        return { ...l };
    });
    const { homePadding } = appConfig;
    const padding = homePadding;
    const rows = 12;

    const { width, height } = useWindowSize();
    const trueRowHeight = (height - 25 * rows) / 12;

    const [animate, setaAnimate] = useState(false);
    const [rowHeight, setRowHeight] = useState((height - 25 * rows) / 12);

    const wrappedWidgets = useMemo(
        () =>
            layout.map((c, i) => {
                const id = c.i;
                return (
                    <div key={id} id={id} style={{
                        width: "100%",
                        height: "100%"
                    }}>
                        <motion.div
                            // initial={{
                            //   opacity: 0,
                            //   // translateX: i % 2 === 0 ? -50 : 50,
                            //   // translateX: `${getRandomIntInclusive(-500, 500)}`,
                            //   // translateX: -50,
                            //   // translateY: i % 2 === 0 ? -50 : 50
                            //   translateY: `${getRandomIntInclusive(-500, 500)}`,
                            //   // translateY: -50
                            // }}
                            // animate={{
                            //   opacity: 1,
                            //   translateX: 0,
                            //   translateY: 0,
                            // }}
                            // transition={{
                            //   duration: 1,
                            //   // initiates stagger effect by varying the transition delay for each element in the array
                            //   delay: i * 0.2,
                            // }}
                            //   key={id}
                            id={id}
                            style={cardContainerStyle}
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
    useEffect(() => {
        // const ratio = height / (screen.height - 95);
        const ratio = height / screen.height;
        const minRatioWindowToScreen = 0.61;
        if (ratio > minRatioWindowToScreen) {
            setRowHeight((height - 25 * rows) / 12);
        }
    }, [height]);

    let layouts: Layouts = {
        lg: layout,
        md: layout,
        sm: layout,
        xxs: layout,
    };



    // https://github.com/react-grid-layout/react-grid-layout/issues/233#issuecomment-319995357
    return (
        <ResponsiveGridLayout
            style={{ ...style }}
            onWidthChange={(e) => {
                console.log(e);
            }}
            //
            // allowOverlap
            // isDraggable={false}
            isDraggable={true}
            className={className}
            layouts={layouts}
            // layouts={ll}
            useCSSTransforms={animate}
            margin={[padding, padding]}
            // compactType={undefined}
            width={(window.innerWidth / 12) * 3}
            // width={window.innerWidth}
            // width={window.innerWidth}
            rowHeight={rowHeight}
            // cols={cols}
            cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
            // containerPadding={containerPadding}
            containerPadding={containerPadding}
        // verticalCompact={false}
        // onLayoutChange={function () {}}
        >
            {wrappedWidgets}
        </ResponsiveGridLayout>
    );
};
("1=20px");

export default GenericGrid;

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
//288-384
//96
