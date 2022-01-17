import React from "react";
import "@css/Player/Song.scss";
import FlexColumn from "@components/UI/FlexColumn";

const Song = ({
  songName,
  songArtist,
  link,
  index,
}: {
  songName: string;
  songArtist: string;
  link?: string;
  index: number;
}): JSX.Element => {
  return (
    <FlexColumn className="song">
      {/* <div className="song-artist">{`${index + 1}. ` + songArtist + " - "}</div> */}
      <div
        className="song-title"
        style={{ margin: "auto", whiteSpace: "normal", textAlign: "center" }}
      >
        {songName}
      </div>
    </FlexColumn>
  );
};

export default Song;
