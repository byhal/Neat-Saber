import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import { useGameStore } from '../store/gameStore';
import { SliceEffect } from './effects/SliceEffect';
import { useHaptics } from '../hooks/useHaptics';

interface NoteProps {
  position: [number, number, number];
  color: string;
  direction: 'up' | 'down' | 'left' | 'right';
  speed?: number;
  hand: 'left' | 'right';
}

export function Note({ position, color, direction, speed = 2, hand }: NoteProps) {
  const ref = useRef<Mesh>(null);
  const [hit, setHit] = useState(false);
  const [showEffect, setShowEffect] = useState(false);
  const addScore = useGameStore((state) => state.addScore);
  const missNote = useGameStore((state) => state.missNote);
  const { triggerHaptics } = useHaptics();

  useFrame((_, delta) => {
    if (ref.current && !hit) {
      ref.current.position.z += speed * delta;
      
      // Miss the note if it goes too far
      if (ref.current.position.z > 5) {
        missNote();
        ref.current.removeFromParent();
      }
    }
  });

  const handleCollision = (sliceDirection: string) => {
    if (!hit && isCorrectDirection(direction, sliceDirection)) {
      setHit(true);
      setShowEffect(true);
      
      // Calculate accuracy based on timing and position
      const accuracy = calculateAccuracy(ref.current?.position.z || 0);
      addScore(100, accuracy);
      
      // Trigger haptic feedback
      triggerHaptics(hand, accuracy);

      // Remove note and effect after animation
      setTimeout(() => {
        setShowEffect(false);
        if (ref.current) {
          ref.current.removeFromParent();
        }
      }, 500);
    }
  };

  const calculateAccuracy = (zPosition: number): number => {
    // Perfect hit is at z = 0, calculate accuracy based on distance
    const distance = Math.abs(zPosition);
    return Math.max(0, 100 - (distance * 50));
  };

  const isCorrectDirection = (noteDir: string, sliceDir: string): boolean => {
    // Implement direction checking logic
    return true; // Simplified for this example
  };

  return (
    <>
      <mesh ref={ref} position={new Vector3(...position)} onClick={handleCollision}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
        {/* Direction arrow */}
        <mesh position={[0, 0, 0.21]}>
          <coneGeometry args={[0.1, 0.2, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>
      </mesh>
      
      {showEffect && (
        <SliceEffect
          position={new Vector3(...position)}
          color={color}
        />
      )}
    </>
  );
}