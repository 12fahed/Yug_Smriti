import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';

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
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Create globe
        const geometry = new THREE.SphereGeometry(5, 64, 64);
        const texture = new THREE.TextureLoader().load('/earth_texture.jpg'); // Updated path with leading slash
        const material = new THREE.MeshPhongMaterial({
            map: texture,
            bumpMap: texture,
            bumpScale: 0.1,
        });
        const globe = new THREE.Mesh(geometry, material);
        globeRef.current = globe;
        scene.add(globe);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(15, 15, 15);
        scene.add(pointLight);

        // Camera position
        camera.position.z = 15;

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.rotateSpeed = 0.5;
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
            const longRad = (indiaLong * Math.PI) / 180;

            rotationAnimation.pause();

            gsap.timeline()
                .to(globe.rotation, {
                    y: -longRad,
                    x: latRad,
                    duration: 2,
                    ease: "power2.inOut"
                })
                .to(camera.position, {
                    z: 8,
                    duration: 1.5,
                    ease: "power2.inOut",
                    onComplete: () => {
                        gsap.to(material, {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                onAnimationComplete();
                            }
                        });
                    }
                });
        };

        // Start animation after 1 second
        setTimeout(animateToIndia, 1000);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, [onAnimationComplete]);

    return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default Globe;