import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

export function useAudio(url: string) {
  const sound = useRef<Howl | null>(null);

  useEffect(() => {
    sound.current = new Howl({
      src: [url],
      html5: true,
    });

    return () => {
      sound.current?.unload();
    };
  }, [url]);

  const play = () => sound.current?.play();
  const pause = () => sound.current?.pause();
  const stop = () => sound.current?.stop();

  return { play, pause, stop };
}