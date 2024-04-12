"use client";

import { StateCreator } from "zustand";

import { Store } from "./store";

export const createCounterSlice = (
  a: Parameters<StateCreator<Store, [], [], Store>>,
  initialValues: Partial<Store>,
) => {
  const createCounterSliceInner: StateCreator<Store, [], [], Store> = (
    set,
    get,
  ) => ({
    count: initialValues.count ?? 0,
    incrBy: (by: number) => set({ count: get().count + by }), // error is introduced here
  });

  return createCounterSliceInner(...a);
};
