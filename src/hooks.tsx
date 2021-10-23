import React, { useState } from "react";

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

export { useArray };

const test = "test";

import { RefObject, useEffect } from "react";

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
