import FlexRow from "@components/FlexRow";
import React from "react";
import "@css/Player/Song.scss";

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
    <FlexRow className="song">
      <div className="song-artist">{`${index + 1}. ` + songArtist + " - "}</div>
      <div className="song-title">{songName}</div>
    </FlexRow>
  );
};

export default Song;
