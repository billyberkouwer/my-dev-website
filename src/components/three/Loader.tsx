import { Html, useProgress } from "@react-three/drei";
import "./loading.scss";

export default function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return (
    <Html wrapperClass="container__loading">
      <h1>{progress}% loaded</h1>
    </Html>
  );
}
