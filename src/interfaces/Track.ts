import Connection from "./Connection";

export interface Track {
  artist: string;
  title: string;
  src: string;
  playing: boolean;
  visualType?: "image" | "video";
  visual?: string;
  link?: string;
  about?: string;
  node?: MediaElementAudioSourceNode;
  connections?: Connection[];
  // elementId: string;
  category: "remix" | "recital";
}
