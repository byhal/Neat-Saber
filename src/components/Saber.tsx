import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useXR, Interactive } from '@react-three/xr';
import { Mesh, Vector3 } from 'three';

interface SaberProps {
  color: string;
  hand: 'left' | 'right';
}

export function Saber({ color, hand }: SaberProps) {
  const ref = useRef<Mesh>(null);
  const { controller } = useXR();
  const saberLength = 1;

  useFrame(() => {
    if (ref.current && controller) {
      const controllerPos = new Vector3();
      controller.controller.getWorldPosition(controllerPos);
      ref.current.position.copy(controllerPos);
      ref.current.rotation.copy(controller.controller.rotation);
    }
  });

  return (
    <Interactive>
      <group>
        {/* Saber handle */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.1, 32]} />
          <meshStandardMaterial color="gray" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Saber blade */}
        <mesh position={[0, saberLength / 2, 0]}>
          <cylinderGeometry args={[0.01, 0.01, saberLength, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>
      </group>
    </Interactive>
  );
}