import {
  useEffect,
  useRef,
} from "react";

export const useInterval = (
  callback: () => void,
  delay: number | null
) => {
  const savedCallback = useRef(() => {
    // do nothing
  });

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback &&
        savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(
        tick,
        delay
      );
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
};
