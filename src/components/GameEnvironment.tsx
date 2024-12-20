import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

export function GameEnvironment() {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (gridRef.current) {
      gridRef.current.position.z += delta * 2;
      if (gridRef.current.position.z > 2) {
        gridRef.current.position.z = 0;
      }
    }
  });

  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} />
      
      {/* Moving grid floor */}
      <group ref={gridRef}>
        <gridHelper
          args={[100, 100, '#444444', '#222222']}
          position={[0, -2, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>

      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />
      
      {/* Main directional light */}
      <directionalLight
        position={[0, 10, 0]}
        intensity={0.5}
        castShadow
      />
      
      {/* Side lights for atmosphere */}
      <pointLight position={[-10, 0, 0]} color="#ff0000" intensity={2} />
      <pointLight position={[10, 0, 0]} color="#0000ff" intensity={2} />
    </>
  );
}