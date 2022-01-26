import { StoreModel } from "./model";
import { ActionCreator, createTypedHooks } from "easy-peasy";
import SampleData from "@classes/SampleData";

const typedHooks = createTypedHooks<StoreModel>();

const useStoreActions = typedHooks.useStoreActions;
const useStoreDispatch = typedHooks.useStoreDispatch;
const useStoreState = typedHooks.useStoreState;


interface UseDawStoreProps {
    samples: SampleData[],

}
export function useDawStore(): UseDawStoreProps {
    const samples = useStoreState(state => state.samplesModel.samples)

    return {
        samples
    }
}