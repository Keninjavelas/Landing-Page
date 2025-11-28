'use client';

import { useRef, useState, useEffect, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Robot Model Component - Optimized
const Robot = memo(({ mousePosition, themeColor }: { mousePosition: { x: number; y: number }, themeColor: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);

  // Parse theme color to THREE.Color - memoized
  const mainColor = new THREE.Color(themeColor);
  const accentColor = new THREE.Color(themeColor).multiplyScalar(1.5);

  useFrame((state) => {
    if (headRef.current && groupRef.current) {
      // Make the head look at mouse position
      const targetRotationY = mousePosition.x * 0.5;
      const targetRotationX = -mousePosition.y * 0.3;
      
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetRotationY,
        0.1
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetRotationX,
        0.1
      );

      // Gentle floating animation using state clock
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }

    // Eye blink animation
    if (leftEyeRef.current && rightEyeRef.current) {
      const blinkPhase = Math.sin(state.clock.elapsedTime * 3);
      const blink = blinkPhase < -0.95 ? 0.1 : 1;
      leftEyeRef.current.scale.y = blink;
      rightEyeRef.current.scale.y = blink;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[0.8, 1, 0.6]} />
        <meshStandardMaterial
          color={mainColor}
          metalness={0.6}
          roughness={0.3}
          emissive={mainColor}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Head */}
      <group ref={headRef} position={[0, 0.5, 0]}>
        <mesh>
          <boxGeometry args={[0.9, 0.7, 0.7]} />
          <meshStandardMaterial
            color={mainColor}
            metalness={0.7}
            roughness={0.2}
            emissive={mainColor}
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Left Eye */}
        <mesh ref={leftEyeRef} position={[-0.25, 0.1, 0.36]}>
          <boxGeometry args={[0.15, 0.15, 0.05]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* Right Eye */}
        <mesh ref={rightEyeRef} position={[0.25, 0.1, 0.36]}>
          <boxGeometry args={[0.15, 0.15, 0.05]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* Antenna */}
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
          <meshStandardMaterial
            color={mainColor}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Antenna Ball */}
        <mesh position={[0, 0.65, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={1}
          />
        </mesh>
      </group>

      {/* Left Arm */}
      <mesh position={[-0.5, -0.3, 0]}>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial
          color={mainColor}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Right Arm */}
      <mesh position={[0.5, -0.3, 0]}>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial
          color={mainColor}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Left Leg */}
      <mesh position={[-0.25, -1.3, 0]}>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial
          color={mainColor}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Right Leg */}
      <mesh position={[0.25, -1.3, 0]}>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial
          color={mainColor}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
});

Robot.displayName = 'Robot';

// Scene Component - Optimized
const Scene = memo(({ themeColor }: { themeColor: string }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={themeColor} />
      <Robot mousePosition={mousePosition} themeColor={themeColor} />
    </>
  );
});

Scene.displayName = 'Scene';

export default Scene;
