import { useEffect } from "react";

export function useAsyncEffect(callback: () => Promise<unknown>, deps: unknown[]) {
  return useEffect(() => {
    (function () {
      callback();
    })();
  }, deps);
}
