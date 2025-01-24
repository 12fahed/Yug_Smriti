"use client"

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Text } from './Text'; // Import the new small component for Kargil War


const CloudTextScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [textVisible, setTextVisible] = useState(false);
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Black background for the scene

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20; // Adjusted position for better coverage

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Reduced fog effect
    scene.fog = new THREE.Fog(0x000000, 30, 70); // Much lighter fog

    // Create Cloud Group
    const createCloudGroup = (x: number, y: number, z: number) => {
      const cloudGroup = new THREE.Group();
      const cloudCount = 20 + Math.floor(Math.random() * 10); // Increased cloud count variation

      for (let i = 0; i < cloudCount; i++) {
        const sphereGeometry = new THREE.SphereGeometry(3 + Math.random() * 4, 32, 32); // Larger clouds
        const cloudMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,  // Pure white color (already correct)
          transparent: true,
          opacity: 0.9,     // Increased opacity
          roughness: 0.5,   // Reduced roughness for smoother appearance
          metalness: 0.0,   // No metalness
        });

        const cloudSphere = new THREE.Mesh(sphereGeometry, cloudMaterial);
        cloudSphere.position.set(
          Math.random() * 15 - 7.5, // Even more spread within each cloud group
          Math.random() * 8 - 4,
          Math.random() * 8 - 4
        );
        cloudSphere.castShadow = true;
        cloudSphere.receiveShadow = true;

        cloudGroup.add(cloudSphere);
      }

      cloudGroup.position.set(x, y, z);
      return cloudGroup;
    };

    const clouds: THREE.Group[] = [];
    const cloudSpread = 25; // Spread for cloud groups
    const cloudCount = 50; // Cloud count increased

    for (let i = 0; i < cloudCount; i++) {
      const angle = (i / cloudCount) * Math.PI * 2; // More uniform circular distribution
      const radius = cloudSpread * (0.3 + Math.random() * 0.7); // More varied radius
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.8;
      const z = Math.random() * -25 - 25; // Spread clouds even deeper into scene
      const cloudGroup = createCloudGroup(x, y, z);
      scene.add(cloudGroup);
      clouds.push(cloudGroup);
    }

    // Create "WHAT IF?" Text
    const createTextSprite = (text: string) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = 2048;
        canvas.height = 1024;

        context.fillStyle = 'rgba(255,255,255,0)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.font = 'bold 150px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        context.shadowColor = 'rgba(0,0,0,0.5)';
        context.shadowBlur = 15;
        context.shadowOffsetX = 5;
        context.shadowOffsetY = 5;

        context.fillStyle = 'rgba(0, 0, 100, 1)';
        context.fillText(text, canvas.width / 2, canvas.height / 2);
      }

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(30, 15, 1);
      sprite.position.set(0, 0, -10); // Centered vertically
      return sprite;
    };

    const textSprite = createTextSprite('WHAT IF?');
    scene.add(textSprite);

    // Raycasting to detect click on text sprite
    const onMouseClick = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Raycasting to detect intersection
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(textSprite);

      if (intersects.length > 0) {
        setTextVisible(true); // Show Kargil War info component
      }
    };

    // Add the event listener to detect clicks
    window.addEventListener('click', onMouseClick);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      clouds.forEach((cloud, index) => {
        cloud.rotation.y += 0.001 * (index + 1);
        cloud.rotation.x += 0.0005 * (index + 1);
        cloud.position.x += Math.sin(Date.now() * 0.001 + index) * 0.01;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', onMouseClick); // Clean up event listener
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [textVisible]);

  return (
    <div ref={mountRef} className="w-full h-screen">
      {textVisible && <Text />}
    </div>
  );
};

export default CloudTextScene;
