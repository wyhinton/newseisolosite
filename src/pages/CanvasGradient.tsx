import Konva from "konva";
import React, { useEffect, useMemo, useRef } from "react";
import { render } from "react-dom";
import { Stage, Layer, Star, Text, Rect } from "react-konva";

function generateShapes() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 180,
    isDragging: false,
  }));
}

const INITIAL_STATE = generateShapes();

const CanvasGradient = (): JSX.Element => {
  const [stars, setStars] = React.useState(INITIAL_STATE);

  const handleDragStart = (e) => {
    const id = e.target.id();
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: star.id === id,
        };
      })
    );
  };
  const handleDragEnd = (e) => {
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: false,
        };
      })
    );
  };

  //   const stops = useMemo(()=>{
  //       const stops = Array.from(Array(10).keys());

  //   })
  const height = 200;
  const width = window.innerWidth;
  const numStops = 200;
  const arr = Array.from(Array(numStops).keys());
  const stops: (string | number)[] = [];
  //   const rectWidth = window.innerWidth * 4;
  const rectWidth = 4000;
  arr.forEach((element, i) => {
    const mult = rectWidth / numStops;
    const x = mult * i;
    const y = 0;
    const val = 200 * (i % 2);
    const col = `rgb(${val}, ${val}, ${val})`;
    stops.push(x / rectWidth);
    // stops.push(x / rectWidth);
    stops.push(col);
    // return [x / rectWidth, col];
  });
  useEffect(() => {
    console.log(stops);
    console.log([...stops]);
  }, [stops]);
  console.log(stops);

  const rectRef = useRef<Konva.Rect>();

  React.useEffect(() => {
    var period = 300;

    var anim = new Konva.Animation((frame) => {
      //   rectRef.current.opacity((Math.sin(frame.time / period) + 1) / 2);
      const curX = rectRef.current.x();
      rectRef.current.x(curX - 1);
    }, rectRef.current.getLayer());

    anim.start();
    return () => {
      anim.stop();
    };
  }, []);

  return (
    <Stage
      width={window.innerWidth}
      height={281}
      id={"gradient-canvas"}
      className="gradient-canvas"
    >
      <Layer id={"gradient-canvas"}>
        <Rect
          ref={rectRef}
          x={0}
          y={0}
          width={rectWidth}
          height={height}
          numPoints={5}
          innerRadius={20}
          outerRadius={40}
          scaleX={30}
          //   fill="#89b717"
          opacity={0.8}
          draggable
          shadowColor="black"
          shadowBlur={10}
          shadowOpacity={0.6}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          fillLinearGradientStartPoint={{ x: 0, y: height }}
          fillLinearGradientEndPoint={{ x: width, y: height }}
          fillLinearGradientColorStops={stops}
          //   fillLinearGradientColorStops={[0, "red", 1, "black"]}
        />
      </Layer>
    </Stage>
  );
};

export default CanvasGradient;
