import tracks from "@static/tracks";
import React from "react";

const start = { audio: new AudioContext(), tracks: tracks };

const PlayerContext = React.createContext(start);

export default PlayerContext;
