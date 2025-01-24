"use client"
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Lock } from 'lucide-react';
import * as THREE from 'three';

const CoinModel: React.FC<{ path: string; isLocked: boolean }> = ({ path, isLocked }) => {
  const { scene } = useGLTF(path);
  const modelRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!isLocked && modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  return <primitive ref={modelRef} object={scene} />;
};

const CoinCanvas: React.FC<{ 
  path: string; 
  name: string; 
  isLocked?: boolean 
}> = ({ path, name, isLocked = false }) => {
  return (
    <div className="relative flex flex-col items-center">
      <div 
        className="w-[220px] h-[220px] bg-cornsilk rounded-xl shadow-lg 
        border-2 border-[#8B4513] relative overflow-hidden"
      >
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 5, 5]} intensity={1.2} />
          {isLocked && <OrbitControls enableZoom={false} enablePan={false} />}
          <CoinModel path={path} isLocked={isLocked} />
        </Canvas>
        
        {isLocked && (
          <div 
            className="absolute inset-0 bg-black bg-opacity-60 
            flex items-center justify-center z-10"
          >
            <Lock 
              className="text-[#D4AF37]" 
              size={54} 
              strokeWidth={1.5}
            />
          </div>
        )}
      </div>
      
      <p 
        className={`mt-3 text-sm font-semibold tracking-wider uppercase 
        ${isLocked ? 'text-[#8B4513] opacity-50' : 'text-[#2C1810]'}`}
      >
        {name}
      </p>
    </div>
  );
};

const Coin3D: React.FC = () => {
  const coins = [
    { id: 1, name: 'Trailblazer', path: '/coins/gold1/scene.gltf', locked: false },
    { id: 2, name: 'Master Strategist', path: '/coins/gold2/scene.gltf', locked: true },
    { id: 3, name: 'Historian Extraordinaire', path: '/coins/gold3/scene.gltf', locked: true },
    { id: 4, name: 'Dedication Badge', path: '/coins/silver2/scene.gltf', locked: true },
    { id: 5, name: 'Time Traveler\'s Trophy', path: '/coins/silver3/scene.gltf', locked: true },
    { id: 6, name: 'Wisdom Seeker', path: '/coins/bronze1/scene.gltf', locked: true },
  ];

  return (
    <div 
      className="bg-[#F5E6D3] min-h-screen p-8 
      flex flex-col items-center justify-center"
    >
      <h1 
        className="text-4xl font-bold text-[#2C1810] 
        mb-12 tracking-wide border-b-2 border-[#8B4513] pb-4"
      >
        Achievement Badges
      </h1>
      
      <div 
        className="grid grid-cols-3 gap-10 
        justify-items-center items-center"
      >
        {coins.map((coin) => (
          <CoinCanvas 
            key={coin.id} 
            path={coin.path} 
            name={coin.name} 
            isLocked={coin.locked} 
          />
        ))}
      </div>
    </div>
  );
};

export default Coin3D;