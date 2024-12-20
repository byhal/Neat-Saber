import { useXR } from '@react-three/xr';

export function useHaptics() {
  const { controllers } = useXR();

  const triggerHaptics = (hand: 'left' | 'right', intensity = 1, duration = 100) => {
    const controller = controllers[hand === 'left' ? 0 : 1];
    controller?.controller.hapticActuators?.[0]?.pulse(intensity, duration);
  };

  return { triggerHaptics };
}