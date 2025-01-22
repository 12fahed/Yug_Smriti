// src/types/three.d.ts
declare module 'three/examples/jsm/controls/OrbitControls' {
    import { Camera, EventDispatcher, MOUSE, TOUCH, Vector3 } from 'three';
    export class OrbitControls extends EventDispatcher {
      constructor(camera: Camera, domElement: HTMLElement);
      object: Camera;
      domElement: HTMLElement;
      enabled: boolean;
      target: Vector3;
      minDistance: number;
      maxDistance: number;
      enableDamping: boolean;
      dampingFactor: number;
      enableZoom: boolean;
      zoomSpeed: number;
      enableRotate: boolean;
      rotateSpeed: number;
      enablePan: boolean;
      panSpeed: number;
      screenSpacePanning: boolean;
      maxPolarAngle: number;
      minPolarAngle: number;
      maxAzimuthAngle: number;
      minAzimuthAngle: number;
      update(): void;
      reset(): void;
    }
  }
  