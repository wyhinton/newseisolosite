import FlexRow from "@components/FlexRow";
import React from "react";
import "@css/Player/Song.scss";
import FlexColumn from "@components/FlexColumn";

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
      <div className="song-title" style={{ margin: "auto" }}>
        {songName}
      </div>
    </FlexColumn>
  );
};

export default Song;
