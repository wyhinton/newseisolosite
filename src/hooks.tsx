// eslint-disable-next-line filenames/match-exported
import React, {
  EffectCallback,
  useCallback,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

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

const playListHooks = createTypedHooks<HomeModel>();
export const useHomeActions = playListHooks.useStoreActions;
export const useHomeDispatch = playListHooks.useStoreDispatch;
export const useHomeState = playListHooks.useStoreState;

interface useAppProps {
  setAppMode: ActionCreator<SSAppMode>;
  appMode: SSAppMode;
}
export function useApp(): useAppProps {
  const setAppMode = useHomeActions((actions) => actions.setAppMode);
  const appModeState = useHomeState((state) => state.appMode);
  const [appMode, setAppModeLocal] = useState(appModeState);
  useEffect(() => {
    console.log(appModeState);
    setAppModeLocal(appModeState);
  }, [appModeState]);
  return {
    setAppMode,
    appMode,
  };
}
//USE PLAYLIST

interface UsePlaylistProps {
  currentTrack: Track;
  setCurrentTrack: ActionCreator<string>;
  playTrack: (Track) => void;
  pauseTrack: (Track) => void;
  isPlaying: boolean;
  currentAudioRef: React.MutableRefObject<HTMLAudioElement>;
  currentAudio: HTMLAudioElement;
  currentDuration: number;
  trackCategory: TrackCategory;
  isRecital: boolean;
}

export function usePlaylist(): UsePlaylistProps {
  const currentTrackState = useHomeState((state) => state.currentTrack);
  const setCurrentTrack = useHomeActions((actions) => actions.setCurrentTrack);
  const allAudioElems = useRef<HTMLAudioElement[]>();
  const setIsPlayingAction = useHomeActions((actions) => actions.setIsPlaying);
  const isPlayingState = useHomeState((state) => state.isPlaying);
  const currentAudioRef = useRef<HTMLAudioElement>(null);

  const handleEnd = (e: Event) => {
    console.log(e.target);
    const targ = e.target as HTMLAudioElement;
    const title = targ.id.split("_")[1];
    const endedIndex = tracks.indexOf(
      tracks.filter((t) => t.title === title)[0]
    );
    playTrack(tracks[endedIndex + 1]);
  };

  useEffect(() => {
    const elems = tracks
      .map((t) => "audio_" + t.title)
      .map((id) => document.getElementById(id) as HTMLAudioElement)
      .filter((e) => e !== null);

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
  const [trackCategory, setTrackCategory] = useState(
    currentTrackState.category
  );
  const [isRecital, setIsRecital] = useState(
    currentTrackState.category === "recital"
  );
  const [currentAudio, setCurrentAudio] = useState(
    getTrackAudio(currentTrackState)
  );
  // const currentTrackCategory = currentTrackState.category;
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
    setTrackCategory(currentTrackState.category);
    setIsRecital(currentTrack.category === "recital");
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
    trackCategory,
    isRecital,
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
import { HomeModel, SSAppMode } from "model/homeModel";
import { Track, TrackCategory } from "@interfaces/Track";
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

// export function useAppMode()

type TStatus = "IDLE" | "PROCESSING" | "ERROR" | "SUCCESS";

export function useAsyncTask<T extends any[], R = any>(
  task: (...args: T) => Promise<R>
) {
  const [status, setStatus] = useState<TStatus>("IDLE");
  const [message, setMessage] = useState("");

  const run = useCallback(async (...arg: T) => {
    setStatus("PROCESSING");
    try {
      const resp: R = await task(...arg);
      setStatus("SUCCESS");
      return resp;
    } catch (error) {
      let message = error?.response?.data?.error?.message || error.message;
      setMessage(message);
      setStatus("ERROR");
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setMessage("");
    setStatus("IDLE");
  }, []);

  return {
    run,
    status,
    message,
    reset,
  };
}

// import { useEffect, useReducer, useRef } from "react";

interface State<T> {
  data?: T;
  error?: Error;
}

type Cache<T> = { [url: string]: T };

// discriminated union type
type Action<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

export function useFetch<T = unknown>(
  url?: string,
  options?: RequestInit
): State<T> {
  const cache = useRef<Cache<T>>({});

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return { ...initialState };
      case "fetched":
        return { ...initialState, data: action.payload };
      case "error":
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    // Do nothing if the url is not given
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: "loading" });

      // If a cache exists for this url, return it
      if (cache.current[url]) {
        dispatch({ type: "fetched", payload: cache.current[url] });
        return;
      }

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = (await response.json()) as T;
        cache.current[url] = data;
        if (cancelRequest.current) return;

        dispatch({ type: "fetched", payload: data });
      } catch (error) {
        if (cancelRequest.current) return;

        dispatch({ type: "error", payload: error as Error });
      }
    };

    void fetchData();

    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return state;
}

export default useFetch;

/**
 * Hook to get the width of a container
 */
export function useSize() {
  const [rect, setRect] = useState(null);
  const resizer = new ResizeObserver((entries) => {
    entries && setRect(entries[0].contentRect);
  });
  const ref = useCallback((node) => {
    if (node !== null) {
      resizer.observe(node);
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}

function useEffectOnce(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}

export function useHover<T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T>
): boolean {
  const [value, setValue] = useState<boolean>(false);

  const handleMouseEnter = () => setValue(true);
  const handleMouseLeave = () => setValue(false);

  useEventListener("mouseenter", handleMouseEnter, elementRef);
  useEventListener("mouseleave", handleMouseLeave, elementRef);

  return value;
}

function useEventListener<T extends HTMLElement = HTMLDivElement>(
  eventName: keyof WindowEventMap | string, // string to allow custom event
  handler: (event: Event) => void,
  element?: RefObject<T>
) {
  // Create a ref that stores handler
  const savedHandler = useRef<(event: Event) => void>();

  useEffect(() => {
    // Define the listening target
    const targetElement: T | Window = element?.current || window;
    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }

    // Update saved handler if necessary
    if (savedHandler.current !== handler) {
      savedHandler.current = handler;
    }

    // Create event listener that calls handler function stored in ref
    const eventListener = (event: Event) => {
      // eslint-disable-next-line no-extra-boolean-cast
      if (!!savedHandler?.current) {
        savedHandler.current(event);
      }
    };

    targetElement.addEventListener(eventName, eventListener);

    // Remove event listener on cleanup
    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element, handler]);
}
