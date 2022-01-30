import { DawModel } from "@components/DAW/state/dawMod";
import DawTrack from "@interfaces/DawTrack";
import { ActionCreator, createTypedHooks } from "easy-peasy";
import { useEffect, useState } from "react";
import { Layout } from "react-grid-layout";

const dawHooks = createTypedHooks<DawModel>();

// We export the hooks from our store as they will contain the
// type information on them
// see https://easy-peasy.vercel.app/docs/api/use-store-actions.html for more on store hooks
export const useDawActions = dawHooks.useStoreActions;
export const useStoreDispatch = dawHooks.useStoreDispatch;
export const useDawState = dawHooks.useStoreState;



interface UseDAWProps {
    tracks: DawTrack[]
    gridState: Layout[],
    setGridState: (l: Layout[]) => void;


}

export function useDaw(): UseDAWProps {
    const currentTracksState = useDawState((state) => state.tracks);
    const layoutsState = useDawState((state) => state.layout);
    const setGridState = useDawActions((actions) => actions.setLayout)


    const [tracks, setTracks] = useState(currentTracksState)
    const [gridState, setGridStateLocal] = useState(layoutsState)

    useEffect(() => {
        setTracks(currentTracksState)
    }, [currentTracksState])

    useEffect(() => {
        setGridStateLocal(layoutsState)
    }, [layoutsState])

    return {
        tracks,
        gridState,
        setGridState,

    }

}