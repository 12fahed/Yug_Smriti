// "use client"

// import { useState, useRef } from "react"
// import { Canvas, useFrame, useLoader } from "@react-three/fiber"
// import { OrbitControls, useGLTF } from "@react-three/drei"
// import type * as THREE from "three"

// const badges = [
//   { name: "Neolithic Pioneer", points: 0, model: "/models/neolithic_badge.glb" },
//   { name: "Bronze Age Artisan", points: 1000, model: "/models/bronze_age_badge.glb" },
//   { name: "Iron Age Warrior", points: 2000, model: "/models/iron_age_badge.glb" },
//   { name: "Classical Scholar", points: 3000, model: "/models/classical_badge.glb" },
//   { name: "Medieval Knight", points: 4000, model: "/models/medieval_badge.glb" },
//   { name: "Renaissance Maestro", points: 5000, model: "/models/renaissance_badge.glb" },
//   { name: "Enlightenment Philosopher", points: 6000, model: "/models/enlightenment_badge.glb" },
//   { name: "Modern Era Visionary", points: 7000, model: "/models/modern_badge.glb" },
// ]

// function Badge({
//   name,
//   isUnlocked,
//   position,
//   model,
// }: { name: string; isUnlocked: boolean; position: [number, number, number]; model: string }) {
//   const meshRef = useRef<THREE.Mesh>(null!)
//   const [hovered, setHovered] = useState(false)
//   const { scene } = useGLTF(model)

//   useFrame((state, delta) => {
//     meshRef.current.rotation.y += delta * 0.5
//   })

//   return (
//     <group position={position}>
//       <mesh ref={meshRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
//         <primitive object={scene} scale={0.5} />
//         <meshStandardMaterial
//           color={isUnlocked ? (hovered ? "#D4AF37" : "#8B4513") : "#555555"}
//           metalness={0.8}
//           roughness={0.2}
//         />
//       </mesh>
//       <Text
//         position={[0, -1, 0]}
//         fontSize={0.2}
//         color={isUnlocked ? "#2C1810" : "#555555"}
//         anchorX="center"
//         anchorY="middle"
//       >
//         {name}
//       </Text>
//     </group>
//   )
// }

// export function HistoricalBadges({ userPoints }: { userPoints: number }) {
//   return (
//     <div className="w-full h-[400px]">
//       <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
//         <ambientLight intensity={0.5} />
//         <pointLight position={[10, 10, 10]} />
//         <OrbitControls enableZoom={false} />
//         {badges.map((badge, index) => (
//           <Badge
//             key={badge.name}
//             name={badge.name}
//             isUnlocked={userPoints >= badge.points}
//             position={[(index % 4) * 2.5 - 3.75, Math.floor(index / 4) * -2.5 + 1.25, 0]}
//             model={badge.model}
//           />
//         ))}
//       </Canvas>
//     </div>
//   )
// }

