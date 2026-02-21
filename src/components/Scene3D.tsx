import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, GradientTexture } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!sphereRef.current) return;
    const t = state.clock.getElapsedTime();
    sphereRef.current.rotation.x = t * 0.2;
    sphereRef.current.rotation.y = t * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={sphereRef} args={[1, 100, 100]} scale={2.5}>
        <MeshDistortMaterial
          color="#f27d26"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        >
          <GradientTexture
            stops={[0, 1]}
            colors={['#f27d26', '#ff4e00']}
          />
        </MeshDistortMaterial>
      </Sphere>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10 opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}
