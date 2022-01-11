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
import FlexRow from "@components/FlexRow";
import FlexColumn from "@components/FlexColumn";
import theme from "@static/theme";
import AudioDataContainer from "@components/Home/Player/EQ/AudioDataContainer";
import { TrackSelection } from "@interfaces/TrackSelection";
import Viewer from "@components/Home/Player/Viewer";
import tracks from "@static/tracks";
import { Track } from "@interfaces/Track";
<<<<<<< HEAD
import { useToggle } from "@hooks";
=======
import { usePlaylist, useToggle } from "@hooks";
>>>>>>> noclasses
import { useKeyboardShortcut } from "crooks";
import { motion } from "framer-motion";
import "@css/blockquote.scss";
import Model from "@components/Home/Model";
import Waveform3d from "@components/Home/Waveform3d";
import Time from "@components/Home/Player/Time";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import "@css/Layout.scss";
import ViewCard from "@components/Home/ViewCard";
export type HomeMode = "player" | "notes" | "about";
<<<<<<< HEAD
import "@css/react-grid-layout.css";
import "@css/react-resizable.css";
import GridLayout from "@components/Home/GridLayout";
import ArtistWidget from "@components/Home/Widgets/ArtistWidget";
=======
import "@css/react-grid-layout.scss";
import "@css/react-resizable.css";
import GridLayout from "@components/Home/GridLayout";
import TrackInfoWidget from "@components/Home/Widgets/TrackInfoWidget";
>>>>>>> noclasses
import AboutWidget from "@components/Home/Widgets/AboutWidget";
import ViolinWidget from "@components/Home/Widgets/ViolinWidget";
import WaveformWidget from "@components/Home/Widgets/WaveformWidget";
import TitleWidget from "@components/Home/Widgets/TitleWidget";
import RecitalWidgets from "@components/Home/Widgets/RecitalWidgets";
import ThreeRemixes from "@components/Home/Widgets/ThreeRemixes";
import ArrowWidget from "@components/Home/Widgets/ArrowWidget";
import { StoreProvider } from "easy-peasy";
<<<<<<< HEAD
import homeStore from "../homeStore";
import OneRecitalTextWidget from "@components/Home/Widgets/OneRecitalTextWidget";
import RemixesWidget from "@components/Home/Widgets/RemixesWidget";
=======
import homeStore from "../stores/homeStore";
import OneRecitalTextWidget from "@components/Home/Widgets/OneRecitalTextWidget";
import RemixesWidget from "@components/Home/Widgets/RemixesWidget";
import "@css/Body.scss";
import ProjectInfo from "@components/Home/Widgets/ProjectInfo";
import { defaultLayout, recitalLayout } from "@static/gridLayouts";
import Intro from "@components/Intro";
>>>>>>> noclasses
const Home = (): JSX.Element => {
  const audio = useRef(null);

  useEffect(() => {
    audio.current = new AudioContext();
  }, []);

<<<<<<< HEAD
  const topStyle = {
    textAlign: "center",
    zIndex: 10,
  } as React.CSSProperties;

  const innerGroupStyle = {
    width: "100%",
    textAlign: "center",
    zIndex: 10,
  } as React.CSSProperties;

  const [activeTrack, setTrack] = useState<undefined | Track>(tracks[0]);
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [homeMode, setHomeMode] = useState<HomeMode>("player");
  const [progress, setProgress] = useState(0);
  const [audioElem, setAudioElem] = useState<undefined | HTMLAudioElement>(
    undefined
  );
  // useEffect(() => {
  //   console.log(progress);
  // }, [progress]);

  // useEffect(() => {
  //   console.log(playing);
  // }, [playing]);

  // const setToPlay = (
  //   track: Track,
  //   audioElem: RefObject<HTMLAudioElement>
  // ): void => {
  //   setTrack(track);
  //   // console.log(audioElem.current);
  //   setAudioElem(audioElem.current);
  // };

  const layout = [
    // { i: "artist", x: 0, y: 0, w: 1, h: 1 },

    { i: "title", x: 0, y: 0, w: 5, h: 1 },
    // {i}
    { i: "time", x: 6, y: 0, w: 2, h: 1 },

    { i: "oneRecitalText", x: 0, y: 3, w: 4, h: 1 },
    { i: "oneRecital", x: 0, y: 4, w: 4, h: 2 },
    { i: "violin", x: 4, y: 4, w: 1, h: 2 },
    { i: "arrow", x: 5, y: 4, w: 1, h: 2 },
    //REMIXES
    { i: "threeRemixes", x: 6, y: 3, w: 4, h: 1 },
    { i: "player", x: 6, y: 4, w: 5, h: 2 },
    { i: "about", x: 0, y: 1, w: 2, h: 1 },

    //BOTTOM ROW
    { i: "image", x: 0, y: 6, w: 3, h: 6 },
    { i: "waveform", x: 3, y: 6, w: 9, h: 6 },
  ];

  // export default React.memo(CardGrid);

  const TrackContext = createContext(null);
  return (
    <section style={{ backgroundColor: theme.primary }}>
      <StoreProvider store={homeStore}>
        <GridLayout className={"layout"} layout={layout}>
          {/* <About key="about" track={activeTrack} /> */}
          <RecitalWidgets key="oneRecital" />
          <OneRecitalTextWidget key="oneRecitalText" />
          <ArrowWidget key="arrow" />
          <ThreeRemixes key="threeRemixes" />
          <TitleWidget key="title" />
          <AboutWidget key="about" track={activeTrack} />
          <ArtistWidget key="image" track={activeTrack} />
          <Time key="time" progress={progress} track={activeTrack} />
=======
  const [activeTrack, setTrack] = useState<undefined | Track>(tracks[0]);
  const [progress, setProgress] = useState(0);

  const [curLayout, setCurLayout] = useState<Layout[]>(defaultLayout);
  useEffect(() => {
    setCurLayout(defaultLayout);
  }, []);
  const { trackCategory } = usePlaylist();
  useEffect(() => {
    let newLayout: Layout[] = [...curLayout];
    // defaultLayout[0].w =
    if (trackCategory === "remix") {
      setCurLayout(defaultLayout);
    }

    if (trackCategory === "recital") {
      setCurLayout(recitalLayout);
    }
  }, [trackCategory]);

  // export default React.memo(CardGrid);
  console.log(curLayout);
  const TrackContext = createContext(null);
  return (
    <section style={{ width: "100vw" }} className="dot-fill">
      <Intro />
      <section id="home-body" style={{ width: "100vw" }}>
        {/* <StoreProvider store={homeStore}> */}
        <GridLayout className={"layout"} layout={[...curLayout]}>
          {/* <GridLayout className={"layout"} layout={defaultLayout}> */}
          {/* <About key="about" track={activeTrack} /> */}
          <ProjectInfo key="projectInfo" />
          <OneRecitalTextWidget key="oneRecitalText" />
          <RecitalWidgets key="recitalTracks" />

          <ArrowWidget key="arrow" />
          <ThreeRemixes key="threeRemixes" />
          <RemixesWidget
            key="remixes"
            // appMode={appMode}
          />
          <TitleWidget key="title" />
          {/* <AboutWidget key="about" track={activeTrack} /> */}
          <TrackInfoWidget key="trackInfo" track={activeTrack} />
          {/* <Time key="time" progress={progress} track={activeTrack} /> */}
>>>>>>> noclasses
          <WaveformWidget
            key="waveform"
            progress={progress}
            track={activeTrack}
          />
          <ViolinWidget key="violin" />
          {/* <Bar audioElem={audioElem} /> */}
<<<<<<< HEAD
          <RemixesWidget
            key="player"
            // setTrackIndex={setTrackIndex}
            // audioContext={audio}
            // setTrack={setToPlay}
            // activeTrack={activeTrack}
            // setPlaying={setPlaying}
            // setProgress={setProgress}
            // appMode={appMode}
          />
=======

>>>>>>> noclasses
          {/* <FlexColumn style={innerGroupStyle}>
          <div>Seisolo.io</div>
          {activeTrack && (
          <h1 style={{ fontSize: "3vh" }}>{activeTrack.about}</h1>
        )}

          <InfoContainer
            setHomeMode={setHomeMode}
            track={activeTrack}
            visible={true}
            toggle={() => {
              console.log("hello");
            }}
          />
        </FlexColumn> */}
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
        </GridLayout>
<<<<<<< HEAD
      </StoreProvider>
=======
        {/* </StoreProvider> */}
      </section>
>>>>>>> noclasses
    </section>
  );
};

// const Bar

export default Home;

type LayoutPos = Pick<Layout, "x" | "y" | "w" | "h">;

<<<<<<< HEAD
//   return(
//     <img src = {}></img>
//     <div>hello</div>
//   )
// }

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
=======
const DoGrid = ({ layout, activeTrack, progress }): JSX.Element => {
  return (
    <GridLayout className={"layout"} layout={layout}>
      {/* <About key="about" track={activeTrack} /> */}
      <RecitalWidgets key="recitalTracks" />
      <OneRecitalTextWidget key="oneRecitalText" />
      <ArrowWidget key="arrow" />
      <ThreeRemixes key="threeRemixes" />
      <TitleWidget key="title" />
      {/* <AboutWidget key="about" track={activeTrack} /> */}
      <TrackInfoWidget key="trackInfo" track={activeTrack} />
      {/* <Time key="time" progress={progress} track={activeTrack} /> */}
      <WaveformWidget key="waveform" progress={progress} track={activeTrack} />
      <ViolinWidget key="violin" />
      {/* <Bar audioElem={audioElem} /> */}
      <RemixesWidget key="remixes" />
    </GridLayout>
  );
};

function alterLayout(id: string, layout: Layout[], newLayout: LayoutPos) {
  console.log(layout);
  const toGet = layout.filter((l) => l.i === id)[0];
  const ind = layout.indexOf(toGet);
  // layout[ind] = { i: id, ...newLayout };
}
>>>>>>> noclasses

{
  /* <p style={paragraphStyle}>
          SeiSolo.io is a multimedia web installation exploring classical and
          electronic music, aiming to create a unique and accessible way of
          engaging with both. It features a recorded solo violin recital, five
          commissioned remixes of the recital repertoire, and a web-based
          software for users to remix on their own.
        </p> */
}
{
  /* <TrackContext.Provider value={activeTrack}> */
}

{
  /* <BgBar audioElem={audioElem} /> */
}
{
  /* <Viewer
        track={activeTrack}
        playing={playing}
        appMode={homeMode}
        setHomeMode={setHomeMode}
      /> */
}

{
  /* <AudioDataContainer
            tracks={tracks}
            track={activeTrack}
            audioElem={audioElem}
            playing={playing}
            // audioContext={audio}
          /> */
}

//12 rows
// const layout = [
//   // { i: "artist", x: 0, y: 0, w: 1, h: 1 },

//   { i: "title", x: 0, y: 0, w: 3, h: 2 },
//   // {i}
//   { i: "time", x: 6, y: 0, w: 3, h: 2 },
//   { i: "oneRecital", x: 0, y: 1, w: 5, h: 1 },
//   //REMIXES
//   { i: "threeRemixes", x: 6, y: 2, w: 3, h: 1 },
//   { i: "player", x: 3, y: 4, w: 6, h: 2 },
//   { i: "about", x: 8, y: 4, w: 2, h: 4 },
//   //

//   // { i: "violin", x: 1, y: 1, w: 1, h: 1 },
//   //BOTTOM ROW
//   { i: "image", x: 0, y: 6, w: 3, h: 6 },
//   { i: "waveform", x: 3, y: 6, w: 9, h: 6 },
// ];
