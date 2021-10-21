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
  const groupProps = {
    y,
    x,
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
    console.log(activeTags);
    if (activeTags.includes(tag.name)) {
      setCircleFill(theme.secondary);
    } else {
      setCircleFill(fill);
    }
  }, [activeTags]);

  useEffect(() => {
    console.log(radius);
    circRef.current.to({
      radius: radius,
      duration: 0.3,
      easing: Konva.Easings.EaseInOut,
    });
  }, [radius]);

  return (
    <Group {...groupProps}>
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
        stroke={tag.count === 0 ? theme.primary_inactive : stroke}
        fill={
          tag.count == 0
            ? theme.primary
            : hovered
            ? theme.secondary_hover
            : circleFill
        }
        ref={circRef}
      />
      <Text x={-radius} text={tag.name} align={"center"} width={radius * 2} />
    </Group>
  );
};

export default TagSelector;
