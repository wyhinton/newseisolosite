import React from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import FlexRow from "@components/FlexRow";
import "@css/Player/Bar.scss";

const Bar = (props): JSX.Element => {
  const { duration, curTime, onTimeUpdate } = props;

  const curPercentage = (curTime / duration) * 100;

  function formatDuration(duration) {
    // return moment.duration(duration, "seconds").seconds();
    const seconds = moment.duration(duration, "seconds").seconds();
    const minutes = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${minutes}:${s}`;
    // return moment.duration(duration, "seconds").toISOString();
    // return moment.duration(duration, "seconds")
    // .format("mm:ss", { trim: false });
  }

  function calcClickedTime(e) {
    const clickPositionInPage = e.pageX;
    const bar = document.querySelector(".bar__progress") as HTMLElement;
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  }

  function handleTimeDrag(e) {
    onTimeUpdate(calcClickedTime(e));

    const updateTimeOnMove = (eMove) => {
      onTimeUpdate(calcClickedTime(eMove));
    };

    document.addEventListener("mousemove", updateTimeOnMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", updateTimeOnMove);
    });
  }

  return (
    <FlexRow className="bar">
      <span className="bar__time">{formatDuration(curTime)}</span>
      <div
        className="bar__progress"
        style={{
          background: `linear-gradient(to right, orange ${curPercentage}%, white 0)`,
        }}
        onMouseDown={(e) => handleTimeDrag(e)}
      >
        <span
          className="bar__progress__knob"
          style={{ left: `${curPercentage - 2}%` }}
        />
      </div>
      <span className="bar__time">{formatDuration(duration)}</span>
    </FlexRow>
  );
};

export default Bar;
