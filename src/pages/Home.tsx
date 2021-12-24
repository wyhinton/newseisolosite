import React, {
  useState,
  useEffect,
  RefObject,
  createContext,
  useRef,
} from "react";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "three/examples/jsm/libs/dat.gui.module";
import Video from "../components/Home/Graphics/Video";
import Player from "@components/Home/Player";
import FlexRow from "@components/FlexRow";
import FlexColumn from "@components/FlexColumn";
import theme from "@static/theme";
import AudioDataContainer from "@components/Home/Player/EQ/AudioDataContainer";
import { TrackSelection } from "@interfaces/TrackSelection";
import Viewer from "@components/Home/Player/Viewer";
import tracks from "@static/tracks";
import { Track } from "@interfaces/Track";
import { useToggle } from "@hooks";
import { useKeyboardShortcut } from "crooks";

export type HomeMode = "player" | "notes" | "about";

const Home = (): JSX.Element => {
  const audio = useRef(null);

  useEffect(() => {
    audio.current = new AudioContext();
  }, []);

  const cotainerStyle = {
    // width: "100%",
    display: "flex",
    height: "100vh",
    width: "100vw",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    zIndex: 10,
    backgroundColor: theme.primary,
  } as React.CSSProperties;

  const paragraphStyle = {
    maxWidth: "80ch",
  } as React.CSSProperties;

  const imageStyle = {
    maxWidth: "3em",
  } as React.CSSProperties;

  const headerStyle = {
    fontSize: "4em",
  } as React.CSSProperties;

  const topStyle = {
    width: "45%",
    // width: "25%",
    textAlign: "center",
    // borderRadius: theme.borderRadius,
    // backgroundColor: theme.secondary,
    // border: theme.border,
    // overflow: "hidden",
    zIndex: 10,
  } as React.CSSProperties;

  const innerGroupStyle = {
    width: "100%",
    textAlign: "center",
    // borderRadius: theme.borderRadius,
    // backgroundColor: theme.secondary,
    // border: theme.border,
    // overflow: "hidden",
    zIndex: 10,
    // marginTop: "1em",
  } as React.CSSProperties;

  const [activeTrack, setTrack] = useState<undefined | Track>(undefined);
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [homeMode, setHomeMode] = useState<HomeMode>("player");
  const [progress, setProgress] = useState(0);
  const [audioElem, setAudioElem] = useState<undefined | HTMLAudioElement>(
    undefined
  );
  useEffect(() => {
    console.log(progress);
  }, [progress]);

  // useEffect(() => {
  //   console.log(trackIndex);
  //   setTrack(tracks[trackIndex]);
  // }, [trackIndex]);

  // const audio = new AudioContext();
  // const [track, setTrack] = useState<undefined | Track>(undefined);

  // useEffect(() => {
  //   if (track) {
  //     console.log(trackSelection.src);
  //     console.log();
  //     setTrack(tracks.filter((t) => t.src == trackSelection.src)[0]);
  //   }
  // }, [trackSelection])
  useEffect(() => {
    console.log(playing);
  }, [playing]);

  const setToPlay = (
    track: Track,
    audioElem: RefObject<HTMLAudioElement>
  ): void => {
    setTrack(track);
    console.log(audioElem.current);
    setAudioElem(audioElem.current);
  };

  const [showAbout, ToggleAbout] = useToggle(false);
  const info = () => {
    if (activeTrack) {
      return activeTrack.about;
    } else {
      return "";
    }
  };
  const TrackContext = createContext(null);
  return (
    <section style={cotainerStyle}>
      {/* <FlexRow width="100%" justifyContent="space-around"> */}
      {/* <section style={cotainerStyle}> */}
      {/* <h1 style={headerStyle}>Seisolo.io</h1> */}
      {/* <div> */}
      {/* <p style={paragraphStyle}>
          SeiSolo.io is a multimedia web installation exploring classical and
          electronic music, aiming to create a unique and accessible way of
          engaging with both. It features a recorded solo violin recital, five
          commissioned remixes of the recital repertoire, and a web-based
          software for users to remix on their own.
        </p> */}
      {/* <TrackContext.Provider value={activeTrack}> */}

      {/* <BgBar audioElem={audioElem} /> */}
      <FlexColumn style={topStyle}>
        {/* <Bar audioElem={audioElem} /> */}

        <FlexColumn style={innerGroupStyle}>
          {/* <div>Seisolo.io</div> */}
          <InfoContainer
            setHomeMode={setHomeMode}
            track={activeTrack}
            visible={true}
            toggle={() => {
              console.log("hello");
            }}
          />
          <Viewer
            track={activeTrack}
            playing={playing}
            appMode={homeMode}
            setHomeMode={setHomeMode}
          />
          <AudioDataContainer
            tracks={tracks}
            track={activeTrack}
            audioElem={audioElem}
            playing={playing}
            // audioContext={audio}
          />
          <Player
            setTrackIndex={setTrackIndex}
            audioContext={audio}
            setTrack={setToPlay}
            activeTrack={activeTrack}
            setPlaying={setPlaying}
            setProgress={setProgress}
            // appMode={appMode}
          />
        </FlexColumn>
      </FlexColumn>
      <FlexColumn width={"50%"}>{/* <div>{info()}</div> */}</FlexColumn>
      {/* </TrackContext.Provider> */}

      {/* <Video /> */}
      {/* <Link to="/app">
          <img
            style={imageStyle}
            src={`${process.env.PUBLIC_URL}/MVNT Logo 1.svg`}
          ></img>
        </Link> */}
      {/* </div> */}
      {/* </FlexRow> */}
    </section>
  );
};

// const Bar

export default Home;

// const NavItem = ({src, text, link}:{src: string, text: string, link?: string}): JSX.Element =>{

//   return(
//     <img src = {}></img>
//     <div>hello</div>
//   )
// }

const BgBar = ({
  audioElem,
}: {
  audioElem: HTMLAudioElement;
  // audioElem: RefObject<HTMLAudioElement>;
}): JSX.Element => {
  // const [containerStyle, setcontainerStyle] = useState(")
  const [rect, setRect] = useState<DOMRect>(undefined);
  useEffect(() => {
    // audioElem.getBoundingClientRect()
    // setRect(audioElem.getBoundingClientRect());
  }, [audioElem]);

  // const {x, , width, height} = audioElem.
  const containerStyle = {
    margin: "auto",
    justifyContent: "center",
    width: "100%",
    height: 20,
    display: "flex",
    alignItems: "center",
    // left: rect.x,
    // top: rect.y,
    // overflow: "visible",
  } as React.CSSProperties;

  return <div style={containerStyle}>hello</div>;
};

const Bar = ({
  audioElem,
}: {
  audioElem: HTMLAudioElement;
  // audioElem: RefObject<HTMLAudioElement>;
}): JSX.Element => {
  const [curTime, setcurTime] = useState(0);

  const containerStyle = {
    margin: "auto",
    justifyContent: "center",
    width: "100%",
    // position: "relative",
    height: 20,
    // backgroundColor: "blue",
    display: "flex",
    alignItems: "center",
    // overflow: "visible",
  } as React.CSSProperties;

  const barStyle = {
    width: "50%",
    position: "relative",
    height: 2,
    backgroundColor: "black",
    overflow: "visible",
  } as React.CSSProperties;
  const s = 15;
  const playHeadStyle = {
    width: s,
    // width: "5%",
    position: "absolute",
    height: s,
    backgroundColor: "black",
    left: curTime,
    transform: "translate(0px, -50%)",
    borderRadius: "50%",
  } as React.CSSProperties;

  const headRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  // useEffect(()=>{
  //   console.log(dep);
  // },[dep]);

  useEffect(() => {
    if (audioElem) {
      audioElem.currentTime = 0;
      console.log(audioElem.currentTime);
      audioElem.ontimeupdate = (e: Event) => {
        console.log(e);
        let elem = e.target as HTMLAudioElement;
        const progress = elem.currentTime / elem.duration;
        const pos =
          (barRef.current.clientWidth - headRef.current.clientWidth) * progress;
        setcurTime(pos);
      };
    }
  }, [audioElem]);

  return (
    <div style={containerStyle}>
      <div style={barStyle} ref={barRef}>
        <div style={playHeadStyle} ref={headRef}></div>
      </div>
    </div>
  );
};

const InfoContainer = ({
  track,
  visible,
  toggle,
  setHomeMode,
}: {
  track: Track;
  visible: boolean;
  toggle: () => void;
  setHomeMode: (v: HomeMode) => void;
}): JSX.Element => {
  const s = 30;
  const containerRef = useRef(null);
  // useEffect(() => {
  //   if (visible) {
  //     setHomeMode("about");
  //   } else {
  //     setHomeMode("player");
  //   }
  // }, [visible]);

  const [isVisible, setVisible] = useState(false);
  useKeyboardShortcut({
    keyCode: 32, //f
    action: () => {
      console.log("GOT SPACEBART");
      setVisible(!isVisible);
      // toggleSampleTrayIsActive();
    },
    disabled: false, // This key is not required
  });

  useEffect(() => {
    console.log(isVisible);
  }, [isVisible]);
  const containerStyle = {
    // bottom: "-236%",
    backgroundColor: theme.primary,
    width: 1000,
    position: "absolute",
    height: 800,
    fontSize: 50,
    color: theme.secondary,
    fontWeight: "bold",
    lineHeight: 28,
    overflow: "scroll",
    overflowX: "hidden",
    top: 0,
    // height: "30vh",
    zIndex: 10000,
    left: "0%",
    transform: `translate(50%, 10%)`,
    // top: 0,
    display: isVisible ? "flex" : "none",
    // zIndex:100,
  } as React.CSSProperties;

  const text = (): string => {
    if (track) {
      return track.about;
    }
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      <p>{text()}</p>
    </div>
  );
};
