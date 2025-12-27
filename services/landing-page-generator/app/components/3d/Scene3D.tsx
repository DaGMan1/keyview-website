'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { KeyViewMonogram, ParticleField } from './KeyViewScene';
import { Suspense } from 'react';

interface Scene3DProps {
  analysis: any;
  autoRotate?: boolean;
}

export default function Scene3D({ analysis, autoRotate = true }: Scene3DProps) {
  const colors = {
    primary: analysis?.colorPalette?.primary || '#2E5BFF',
    secondary: analysis?.colorPalette?.secondary || '#6E7C91',
    background: analysis?.colorPalette?.background || '#0F1115',
  };

  return (
    <div className="w-full h-[600px] relative rounded-xl overflow-hidden shadow-2xl">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
        }}
        style={{ background: colors.background }}
      >
        <Suspense fallback={null}>
          {/* Camera */}
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

          {/* Lights */}
          <ambientLight intensity={0.2} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />

          {/* Main 3D Content */}
          <KeyViewMonogram colors={colors} />
          <ParticleField colors={{ primary: colors.primary }} />

          {/* Environment */}
          <Environment preset="city" />

          {/* Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>

      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent" />
    </div>
  );
}
