import { useEffect, useState } from "react";
import './loading.scss';

export default function Loading() {
  const [elispses, setElispses] = useState("...");

  useEffect(() => {
    const elipses = setInterval(() => {
      elispses.length >= 3
        ? setElispses("")
        : elispses.length === 0
        ? setElispses(".")
        : elispses.length === 1
        ? setElispses("..")
        : elispses.length === 2
        ? setElispses("...")
        : null;
    }, 200);

    return () => {
      clearInterval(elipses);
    };
  }, [elispses]);
  return (
    <div className="container__loading">
      <h1>Loading {elispses}</h1>
    </div>
  );
}
