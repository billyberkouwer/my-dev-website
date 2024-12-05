import { Html, useProgress } from "@react-three/drei";
import "./loading.scss";
import CountUp from "react-countup";
import { useEffect, useState } from "react";

export default function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  const [roundedProgress, setRoundedProgress] = useState(0);

  useEffect(() => {
    setRoundedProgress(Math.round(progress));
  }, [progress]);

  return (
    <Html wrapperClass="container__loading">
      <span>
        <CountUp end={roundedProgress} />% loaded
      </span>
    </Html>
  );
}
