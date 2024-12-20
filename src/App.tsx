import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { VRButton, XR, Controllers, Hands } from '@react-three/xr';
import { Saber } from './components/Saber';
import { GameEnvironment } from './components/GameEnvironment';
import { Note } from './components/Note';
import { Obstacle } from './components/Obstacles';
import { GameHUD } from './components/GameHUD';
import { Menu } from './components/ui/Menu';
import { useGameStore } from './store/gameStore';
import { useAudio } from './hooks/useAudio';

function App() {
  const { isPlaying, currentSong } = useGameStore();
  const audio = useAudio(currentSong?.audioUrl || '');

  return (
    <>
      <VRButton />
      {!isPlaying && <Menu />}
      {isPlaying && <GameHUD />}
      
      <Canvas>
        <XR>
          <Suspense fallback={null}>
            <GameEnvironment />
            
            <Saber color="#ff0000" hand="left" />
            <Saber color="#0000ff" hand="right" />
            
            {isPlaying && currentSong && (
              <>
                {/* Notes will be spawned based on beatmap */}
                {currentSong.beatmap.map((beat) => (
                  <Note
                    key={beat.id}
                    position={beat.position}
                    color={beat.type === 'red' ? '#ff0000' : '#0000ff'}
                    direction={beat.direction}
                    hand={beat.type === 'red' ? 'left' : 'right'}
                  />
                ))}
                
                {/* Example obstacles */}
                <Obstacle
                  position={[0, 1, -10]}
                  size={[2, 2, 0.5]}
                />
              </>
            )}
            
            <Controllers />
            <Hands />
          </Suspense>
        </XR>
      </Canvas>
    </>
  );
}

export default App;