import React, {useState} from 'react';

import { StoreModel } from "./model";
import { createTypedHooks } from "easy-peasy";
import { useArray } from "react-hanger";

const typedHooks = createTypedHooks<StoreModel>();

// We export the hooks from our store as they will contain the
// type information on them
// see https://easy-peasy.vercel.app/docs/api/use-store-actions.html for more on store hooks
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;


export function useToggle(initialValue: boolean): [boolean, () => void] {
    const [value, setValue] = useState<boolean>(initialValue);
  
    const toggleValue = () => setValue(!value);
  
    return [value, toggleValue];
}

export {useArray}


const test = "test";