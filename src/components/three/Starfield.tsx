"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Stars({ count = 2000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Random point inside unit sphere
      const r = Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      array.set([x, y, z], i * 3);
    }
    return array;
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x -= delta * 0.02;
      pointsRef.current.rotation.y -= delta * 0.04;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.005}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

export default function Starfield() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-20">
      <Canvas camera={{ position: [0, 0, 1] }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0} />
        <Stars />
      </Canvas>
    </div>
  );
}
