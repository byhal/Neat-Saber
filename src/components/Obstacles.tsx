import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface ObstacleProps {
  position: [number, number, number];
  size: [number, number, number];
  speed?: number;
}

export function Obstacle({ position, size, speed = 2 }: ObstacleProps) {
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.position.z += speed * delta;
      
      if (ref.current.position.z > 5) {
        ref.current.removeFromParent();
      }
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color="#ff0000"
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}