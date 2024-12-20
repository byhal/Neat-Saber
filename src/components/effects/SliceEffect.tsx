import { useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useSpring, animated } from '@react-spring/three';

interface SliceEffectProps {
  position: Vector3;
  color: string;
}

export function SliceEffect({ position, color }: SliceEffectProps) {
  const particles = useMemo(() => 
    Array.from({ length: 20 }, () => ({
      velocity: new Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ),
      scale: Math.random() * 0.2 + 0.1
    }))
  , []);

  const springs = useSpring({
    from: { opacity: 1, scale: 1 },
    to: { opacity: 0, scale: 0 },
    config: { duration: 500 }
  });

  return (
    <group position={position}>
      {particles.map((particle, i) => (
        <animated.mesh key={i} scale={springs.scale}>
          <sphereGeometry args={[particle.scale, 8, 8]} />
          <animated.meshStandardMaterial
            color={color}
            emissive={color}
            opacity={springs.opacity}
            transparent
          />
        </animated.mesh>
      ))}
    </group>
  );
}