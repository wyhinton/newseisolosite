import React, { useState, useEffect, useRef } from "react";
import { Circle, Group, Text } from "react-konva";
import { CircleConfig } from "konva/lib/shapes/Circle";
import Tag from "@classes/Tag";
import Konva from "konva";
import theme from "@static/theme";

export interface TagSelectorProps extends Partial<CircleConfig> {
  tag: Tag;
  activeTags: string[];
}

const TagSelector = (props: TagSelectorProps): JSX.Element => {
  const {
    activeTags,
    x,
    y,
    tag,
    w,
    h,
    fill,
    radius,
    onMouseDown,
    onDragStart,
    onDragEnd,
    onMouseEnter,
    // onMouseExit,
    onDragMove,
    onMouseUp,
    draggable,
    id,
    fit,
    stroke,
    strokeWidth,
    // isHovered,
  } = props;

  useEffect(() => {
    console.log(x, y);
    groupRef.current.to({
      x: x,
      y: y,
    });
  }, [x, y]);

  const groupRef = useRef(null);
  const groupProps = {
    // y,
    // x,
    onMouseDown,
    onDragStart,
    onDragEnd,
    onMouseEnter,
    onDragMove,
    onMouseUp,
    draggable,
    id,
  };

  const [isActive, setIsActive] = useState(activeTags.includes(props.tag.name));
  const [circleFill, setCircleFill] = useState(fill);
  const circleProps = { strokeWidth };
  const [hovered, setHovered] = useState(false);
  const circRef = useRef(null);
  useEffect(() => {
    // console.log(activeTags);
    if (activeTags.includes(tag.name)) {
      setCircleFill(theme.secondary);
    } else {
      setCircleFill(fill);
    }
  }, [activeTags]);

  useEffect(() => {
    // console.log(radius);
    circRef.current.to({
      radius: radius,
      duration: 0.3,
      easing: Konva.Easings.EaseInOut,
    });
  }, [radius]);

  return (
    <Group {...groupProps} ref={groupRef}>
      <Circle
        onMouseEnter={(e) => {
          setHovered(true);
          //   e.target.attrs.fill = theme.secondary_hover;
          //   onMouseEnter(e);
        }}
        onMouseLeave={(e) => {
          setHovered(false);
        }}
        id={`tag_${tag.name}_circle`}
        {...circleProps}
        stroke={tag.count === 0 ? theme.primaryInactive : stroke}
        fill={
          tag.count == 0
            ? theme.primary
            : hovered
            ? theme.secondaryHover
            : theme.stroke
        }
        // fill={"green"}
        ref={circRef}
      />
      <Text
        x={-radius}
        fill={"white"}
        text={tag.name}
        align={"center"}
        width={radius * 2}
      />
    </Group>
  );
};

export default React.memo(TagSelector);
