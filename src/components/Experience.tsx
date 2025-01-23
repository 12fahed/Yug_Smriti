import React from 'react';
import { FemaleAvatar } from "./AvatarWoman";
import { OrbitControls } from "@react-three/drei";

const Experience: React.FC = () => {
  return (
    <>
      <OrbitControls />
      <group scale={3.1} position-z={0} position-y={-4.6} position-x={0}>
        <FemaleAvatar />
      </group>
      <ambientLight intensity={2.4} />
    </>
  );
};

export default Experience;