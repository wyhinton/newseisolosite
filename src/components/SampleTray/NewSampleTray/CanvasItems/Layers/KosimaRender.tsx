import React, { useState, useEffect, useRef } from "react";
import { Circle, Group, Image, Layer } from "react-konva";
import Kosima from "@classes/Kosima";
import useImage from "use-image";
import theme from "@static/theme";
import { mapRange } from "@utils";
import { group } from "console";
import Konva from "konva";
import { ActionCreator, Actions } from "easy-peasy";
import { CanvasModel } from "../../Canvas";

interface KosimaProperties
  extends Pick<Actions<CanvasModel>, "setPopOverOpen"> {
  kosima: Kosima;
  // setPopOverOpen: (payload: boolean) => void
}

const KosimaRender = ({
  kosima,
  setPopOverOpen,
}: KosimaProperties): JSX.Element => {
  const [baseImage] = useImage(kosima.baseImage());
  kosima.setReaction("KOSIMA_QUESTION");

  const [expressionImage] = useImage(kosima.reactionImage());
  // console.log(expressionImage.w);
  const width = 150.0;
  const height = 150.0;
  console.log(expressionImage);

  const xPos = (window.innerWidth - width) / 2;
  const yPos = window.innerHeight - height - 50;
  const eyeDiameter = 1;
  const headHeight = 9;
  const hUnit = height / headHeight;
  const eyeHeight = 150 - 5 * hUnit;
  // let eyeY = height - (eyeHeight / 2) * hUnit;
  // eyeY -= (eyeDiameter * hUnit) / 2;
  const eyeY = eyeHeight + (eyeDiameter / 2) * hUnit + eyeHeight / 2;

  // const eyeY = eyeHeight / 2;
  // const eyeY = height;

  // eyeY += (eyeHeight / 2.0) * hUnit;

  // let eyeY = eyeHeight * hUnit + (eyeHeight / 2) * hUnit;

  // const eyeX = (width - eyeRadius) / 2;
  // const eyeX = width / 2 - (eyeDiameter / 2) * hUnit;
  const eyeX = (width - eyeDiameter) / 2;
  const [eyePos, setEyePos] = useState({
    x: eyeX,
    y: eyeY,
  });
  const groupRef = useRef(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    // console.log(eyeOffset);
  }, [eyeOffset]);
  const maxEyeRadius = 15;
  const circRef = useRef(null);

  return (
    <Layer
      onMouseUp={(e) => {
        setPopOverOpen(true);
      }}
      onMouseLeave={(e) => {
        circRef.current.to({
          x: eyePos.x,
          y: eyePos.y,
          easing: Konva.Easings.EaseOut,
        });
      }}
      onMouseMove={(e) => {
        console.log(groupRef);
        if (groupRef.current) {
          const bBox = groupRef.current.getClientRect();
          console.log(bBox);
          const newX = mapRange(
            e.evt.pageX,
            bBox.x,
            bBox.x + bBox.width,
            -maxEyeRadius,
            maxEyeRadius
          );
          console.log(newX);
          console.log(e);
          console.log(e.evt.x);
          console.log(e.evt.y);
          const newY = mapRange(
            e.evt.pageY,
            bBox.y,
            bBox.y + bBox.height,
            -maxEyeRadius,
            maxEyeRadius
          );
          setEyeOffset({ x: newX, y: newY });
        }
      }}
    >
      <Group x={xPos} y={yPos} ref={groupRef}>
        <Image width={width} height={height} image={baseImage} />
        {/* <Image width={width} height={height} image={expressionImage} /> */}
        <Circle
          ref={circRef}
          x={eyePos.x + eyeOffset.x}
          y={eyePos.y + eyeOffset.y}
          fill={"yellow"}
          radius={hUnit * 0.5}
          stroke={theme.stroke}
        />
      </Group>
    </Layer>
  );
};

export default React.memo(KosimaRender);
