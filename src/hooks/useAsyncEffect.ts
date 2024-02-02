import { useEffect } from "react";

export function useAsyncEffect(callback: () => Promise<unknown>, deps: unknown[]) {
  return useEffect(() => {
    (function() {
      callback();
    })();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
