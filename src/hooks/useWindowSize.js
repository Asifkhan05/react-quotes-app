import { useEffect, useState } from "react";

const useWindowSize = () => {
  let [windowSize, reWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    let handSize = () => {
      reWindowSize({
        width: window.innerWidth,
        height: window.innerWidth,
      });
    };
    handSize();
    window.addEventListener("resize", handSize);

    return () => window.removeEventListener("resize", handSize);
  }, []);
  return windowSize;
};
export default useWindowSize;
