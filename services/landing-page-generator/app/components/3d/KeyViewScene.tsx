'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

interface KeyViewSceneProps {
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
}

export function KeyViewMonogram({ colors }: KeyViewSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const scanBeamRef = useRef<THREE.Mesh>(null);

  // Rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }

    // Scanning beam animation
    if (scanBeamRef.current) {
      const time = state.clock.elapsedTime;
      scanBeamRef.current.position.y = Math.sin(time * 2) * 0.5;
      if (scanBeamRef.current.material && !Array.isArray(scanBeamRef.current.material)) {
        (scanBeamRef.current.material as any).opacity = 0.3 + Math.sin(time * 3) * 0.2;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* KV Monogram - simplified geometric representation */}
      <Center>
        <group>
          {/* K letter - left vertical + diagonal */}
          <mesh position={[-0.6, 0, 0]} castShadow>
            <boxGeometry args={[0.3, 2.5, 0.3]} />
            <MeshTransmissionMaterial
              color={colors.secondary}
              metalness={1}
              roughness={0.1}
              transmission={0.2}
              thickness={0.5}
              envMapIntensity={1.5}
            />
          </mesh>

          <mesh position={[-0.2, 0.3, 0]} rotation={[0, 0, -0.6]} castShadow>
            <boxGeometry args={[0.25, 1.2, 0.3]} />
            <MeshTransmissionMaterial
              color={colors.secondary}
              metalness={1}
              roughness={0.1}
              transmission={0.2}
              thickness={0.5}
              envMapIntensity={1.5}
            />
          </mesh>

          {/* V letter - two diagonals meeting */}
          <mesh position={[0.3, 0.4, 0]} rotation={[0, 0, 0.5]} castShadow>
            <boxGeometry args={[0.3, 1.8, 0.3]} />
            <MeshTransmissionMaterial
              color={colors.secondary}
              metalness={1}
              roughness={0.1}
              transmission={0.2}
              thickness={0.5}
              envMapIntensity={1.5}
            />
          </mesh>

          <mesh position={[0.9, 0.4, 0]} rotation={[0, 0, -0.5]} castShadow>
            <boxGeometry args={[0.3, 1.8, 0.3]} />
            <MeshTransmissionMaterial
              color={colors.secondary}
              metalness={1}
              roughness={0.1}
              transmission={0.2}
              thickness={0.5}
              envMapIntensity={1.5}
            />
          </mesh>

          {/* Horizontal "data slice" scanning beam */}
          <mesh ref={scanBeamRef} position={[0, 0, 0.2]}>
            <planeGeometry args={[3, 0.05]} />
            <meshBasicMaterial
              color={colors.primary}
              transparent
              opacity={0.4}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Glow effect behind the slice */}
          <mesh position={[0, 0, 0.15]}>
            <planeGeometry args={[3.2, 0.3]} />
            <meshBasicMaterial
              color={colors.primary}
              transparent
              opacity={0.2}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      </Center>

      {/* Rim lighting effect */}
      <pointLight position={[2, 2, 2]} intensity={1} color={colors.primary} />
      <pointLight position={[-2, -2, 2]} intensity={0.5} color={colors.primary} />
    </group>
  );
}

export function ParticleField({ colors }: { colors: { primary: string } }) {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={colors.primary}
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}
