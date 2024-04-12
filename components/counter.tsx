"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { useBoundStore, StoreProvider } from "@/lib/store";

export default function Counter() {
  return (
    <StoreProvider count={0}>
      <CounterButton />
    </StoreProvider>
  );
}

function CounterButton() {
  const { count, incrBy } = useBoundStore((state) => state);
  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => incrBy(1)}>Increment</button>
    </>
  );
}
