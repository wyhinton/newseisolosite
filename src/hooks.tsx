import React, { useCallback, useMemo, useRef, useState } from "react";

import { StoreModel } from "./model";
import { ActionCreator, createTypedHooks } from "easy-peasy";
import { useArray } from "react-hanger";

const typedHooks = createTypedHooks<StoreModel>();

// We export the hooks from our store as they will contain the
// type information on them
// see https://easy-peasy.vercel.app/docs/api/use-store-actions.html for more on store hooks
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

const homeTypedHooks = createTypedHooks<HomeModel>();
export const useHomeActions = homeTypedHooks.useStoreActions;
export const useHomeDispatch = homeTypedHooks.useStoreDispatch;
export const useHomeState = homeTypedHooks.useStoreState;

interface UsePlaylistProps {
  currentTrack: Track;
  setCurrentTrack: ActionCreator<string>;
  playTrack: (Track) => void;
  pauseTrack: (Track) => void;
  isPlaying: boolean;
  currentAudioRef: React.MutableRefObject<HTMLAudioElement>;
  currentAudio: HTMLAudioElement;
  currentDuration: number;
}

export function usePlaylist(): UsePlaylistProps {
  const currentTrackState = useHomeState((state) => state.currentTrack);
  const setCurrentTrack = useHomeActions((actions) => actions.setCurrentTrack);
  const allAudioElems = useRef<HTMLAudioElement[]>();
  const setIsPlayingAction = useHomeActions((actions) => actions.setIsPlaying);
  const isPlayingState = useHomeState((state) => state.isPlaying);
  const currentAudioRef = useRef<HTMLAudioElement>(null);

  // const getCurrentAudio = () =>{

  // }
  // const pauseTrack = useHomeState((state) => state.pause)
  // const playNextTrack = () =>{
  //   const nextInd = tracks.findIndex(track)
  // }
  const handleEnd = (e: Event) => {
    console.log(e.target);
    const targ = e.target as HTMLAudioElement;
    const title = targ.id.split("_")[1];
    const endedIndex = tracks.indexOf(
      tracks.filter((t) => t.title === title)[0]
    );
    playTrack(tracks[endedIndex + 1]);
    console.log(endedIndex);
    console.log(title);
    // const title = e.target.
  };

  useEffect(() => {
    //TODO: ADD RECITAL TRACKS
    const elems = tracks
      .map((t) => "audio_" + t.title)
      .map((id) => document.getElementById(id) as HTMLAudioElement)
      .filter((e) => e !== null);

    console.log(elems);
    allAudioElems.current = elems;
    allAudioElems.current.forEach((audio) => {
      audio.addEventListener("ended", handleEnd);
    });
    currentAudioRef.current = getTrackAudio(currentTrackState);
    return () => {
      allAudioElems.current.forEach((audio) => {
        audio.removeEventListener("ended", handleEnd);
      });
    };
  }, []);

  const playTrack = (track: Track) => {
    if (allAudioElems.current) {
      allAudioElems.current.forEach((element) => {
        if (element.id === "audio_" + track.title) {
          element.play();
        } else {
          element.pause();
        }
      });
    }
    setCurrentTrack(track.title);
    setIsPlayingAction(true);
  };

  const pauseTrack = (track: Track) => {
    if (allAudioElems.current) {
      allAudioElems.current.forEach((element) => {
        if (element.id === "audio_" + track.title) {
          element.pause();
        }
      });
    }
    // setCurrentTrack(track.title);
    setIsPlayingAction(false);
  };

  const [currentTrack, setCurrentTrackLocal] = useState(currentTrackState);
  const [currentAudio, setCurrentAudio] = useState(
    getTrackAudio(currentTrackState)
  );
  const [currentDuration, setCurrentDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const onRefChange = useCallback((node) => {
    if (node === null) {
      // DOM node referenced by ref has been unmounted
    } else {
      // DOM node referenced by ref has changed and exists
    }
  }, []); // adjust deps
  // const curentAudioRef = () =>{getTrackAudio()}

  useEffect(() => {
    // console.log(currentTrackState);
    setCurrentTrackLocal(currentTrackState);
    // setCurrentAudio(getTrackAudio(currentTrackState));
    setCurrentAudio(getTrackAudio(currentTrack));
    // setCurrentDuration(currentAudio.duration);
    currentAudioRef.current = getTrackAudio(currentTrack);
    if (currentAudioRef.current) {
      setCurrentDuration(currentAudioRef.current.duration);
    }
  }, [currentTrackState]);

  useEffect(() => {
    // console.log(currentTrackState);
    setIsPlaying(isPlayingState);
  }, [isPlayingState]);

  return {
    currentTrack,
    setCurrentTrack,
    playTrack,
    pauseTrack,
    isPlaying,
    currentAudioRef,
    currentAudio,
    currentDuration,
  };
}

export const useIsPlaying = (track: Track) => {
  const currentTrackState = useHomeState((state) => state.currentTrack);
  const [isPlaying, setIsPlaying] = useState(
    currentTrackState.title === track.title
  );
  useEffect(() => {
    if (track.title === currentTrackState.title) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [currentTrackState]);
  return isPlaying;
};

const getTrackAudio = (track: Track): HTMLMediaElement => {
  return document.getElementById("audio_" + track.title) as HTMLMediaElement;
};

export function useToggle(initialValue: boolean): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggleValue = () => setValue(!value);

  return [value, toggleValue];
}

export { useArray };

const test = "test";

import { RefObject, useEffect } from "react";
import { HomeModel } from "model/homeModel";
import { Track } from "@interfaces/Track";
import tracks from "@static/tracks";

type AnyEvent = MouseEvent | TouchEvent;

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: AnyEvent) => void
): void {
  useEffect(() => {
    const listener = (event: AnyEvent) => {
      const el = ref?.current;

      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener(`mousedown`, listener);
    document.addEventListener(`touchstart`, listener);

    return () => {
      document.removeEventListener(`mousedown`, listener);
      document.removeEventListener(`touchstart`, listener);
    };

    // Reload only if ref or handler changes
  }, [ref, handler]);
}

function handlePlay(e: HTMLMediaElement) {
  // var playPromise = e.play();
  console.log(e);
  console.log("GOING TO PLAY ", e.id);
  var nopromise = {
    catch: new Function(),
  };
  (e.play() || nopromise).catch(function () {});
  // console.log("HANDLING AUDIO PLAY");
  // if (playPromise !== undefined) {
  //   playPromise
  //     .then((_) => {
  //       // Automatic playback started!
  //       // Show playing UI.
  //     })
  //     .catch((error) => {
  //       // Auto-play was prevented
  //       // Show paused UI.
  //     });
  // }
}

// export function useAppMode()
