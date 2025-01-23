import React from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

const AvatarCanvas: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 1, 5], fov: 25 }}>
      <Experience />
    </Canvas>
  );
};

export default AvatarCanvas;