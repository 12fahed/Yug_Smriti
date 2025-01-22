import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import EarthImage from '../public/earth.png';

interface GlobeProps {
    onAnimationComplete: () => void;
}

const Globe = ({ onAnimationComplete }: GlobeProps) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const globeRef = useRef<THREE.Mesh | null>(null);
    const controlsRef = useRef<OrbitControls | null>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Create globe
        const geometry = new THREE.SphereGeometry(5, 64, 64);
        const texture = new THREE.TextureLoader().load(EarthImage.src);
        
        // Improve texture appearance
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        
        const material = new THREE.MeshStandardMaterial({
            map: texture,
            metalness: 0,
            roughness: 1,
        });
        
        const globe = new THREE.Mesh(geometry, material);
        globeRef.current = globe;
        scene.add(globe);

        // Enhanced lighting setup
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 3, 5);
        scene.add(directionalLight);

        // Camera position
        camera.position.z = 15;

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.rotateSpeed = 0.5;
        controls.enableZoom = false;
        controlsRef.current = controls;

        // Initial rotation animation
        let rotationAnimation = gsap.to(globe.rotation, {
            y: Math.PI * 2,
            duration: 8,
            repeat: -1,
            ease: "none"
        });

        // Animation to India coordinates
        const animateToIndia = () => {
            const indiaLat = 20.5937;
            const indiaLong = 78.9629;
            const latRad = (indiaLat * Math.PI) / 180;
            const longRad = -(indiaLong * Math.PI) / 180;

            rotationAnimation.pause();

            gsap.timeline()
                .to(globe.rotation, {
                    y: longRad,
                    x: latRad,
                    duration: 1.5, // Reduced from 2
                    ease: "power2.inOut"
                })
                .to(camera.position, {
                    z: 6,
                    duration: 1, // Reduced from 1.5
                    ease: "power2.inOut",
                    onComplete: () => {
                        gsap.to(globe.scale, {
                            x: 1.5,
                            y: 1.5,
                            z: 1.5,
                            duration: 0.75, // Reduced from 1
                            ease: "power2.inOut",
                            onComplete: () => {
                                gsap.to(material, {
                                    opacity: 0,
                                    duration: 0.5, // Reduced from 1
                                    onComplete: onAnimationComplete
                                });
                            }
                        });
                    }
                });
        };

        // Start animation after 0.5 second
        setTimeout(animateToIndia, 500); // Reduced from 1000

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Handle resize
        const handleResize = () => {
            if (!mountRef.current) return;
            camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            window.removeEventListener('resize', handleResize);
            
            geometry.dispose();
            material.dispose();
            texture.dispose();
            renderer.dispose();
            
            while(scene.children.length > 0) {
                const object = scene.children[0];
                scene.remove(object);
                if ('geometry' in object) {
                    (object as THREE.Mesh).geometry?.dispose();
                }
                if ('material' in object) {
                    const material = (object as THREE.Mesh).material as THREE.Material;
                    material?.dispose();
                }
            }
        };
    }, [onAnimationComplete]);

    return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default Globe;