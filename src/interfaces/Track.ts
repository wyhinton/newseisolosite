import Connection from "./Connection";

<<<<<<< HEAD
=======
export type TrackCategory = "remix" | "recital" | "none";

>>>>>>> noclasses
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
<<<<<<< HEAD
  category: "remix" | "recital";
=======
  category: "remix" | "recital" | "none";
>>>>>>> noclasses
}
