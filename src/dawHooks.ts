import { DawModel } from "@components/DAW/state/dawMod";
import DawTrack from "@interfaces/DawTrack";
import { ActionCreator, createTypedHooks } from "easy-peasy";
import { useEffect, useState } from "react";

const dawHooks = createTypedHooks<DawModel>();

// We export the hooks from our store as they will contain the
// type information on them
// see https://easy-peasy.vercel.app/docs/api/use-store-actions.html for more on store hooks
export const useDawActions = dawHooks.useStoreActions;
export const useStoreDispatch = dawHooks.useStoreDispatch;
export const useDawState = dawHooks.useStoreState;



interface UseDAWProps {
    tracks: DawTrack[]

}

export function useDaw(): UseDAWProps {
    const currentTracksState = useDawState((state) => state.tracks);
    const [tracks, setTracks] = useState(currentTracksState)
    useEffect(() => {
        setTracks(currentTracksState)
    }, [currentTracksState])

    return {
        tracks
    }

}