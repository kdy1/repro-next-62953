"use client";

import { useContext, createContext, useRef } from "react";
import { createStore, useStore, StoreApi } from "zustand";
import { createCounterSlice } from "./counterSlice";

export type Store = {
  count: number;
  incrBy: (amount: number) => void;
};

export const StoreContext = createContext<StoreApi<Store> | null>(null);

type StoreProviderProps = React.PropsWithChildren<Partial<Store>>;

export function StoreProvider({ children, ...props }: StoreProviderProps) {
  const initialProps = useRef(props);
  const storeRef = useRef<StoreApi<Store>>();
  if (!storeRef.current) {
    storeRef.current = createBoundStore(props);
  } else if (props !== initialProps.current) {
    // If the props change, we need to update the store
    initialProps.current = props;
    storeRef.current.setState(props);
  }
  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
}

export function useBoundStore<T>(selector: (state: Store) => T): T {
  const store =
    useContext(StoreContext) ??
    (() => {
      throw new Error("Store not found");
    })();
  return useStore(store, selector);
}

const createBoundStore: (initialState: Partial<Store>) => StoreApi<Store> = (
  initialState: Partial<Store>,
) => {
  const boundStore = createStore<Store>()((...a) => ({
    ...createCounterSlice(a, initialState),
  }));

  boundStore.setState(initialState);
  return boundStore;
};
