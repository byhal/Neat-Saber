export const songs = [
  {
    id: '1',
    title: 'Synthwave Dreams',
    artist: 'Digital Pulse',
    difficulty: 'normal',
    bpm: 128,
    duration: 180,
    audioUrl: '/songs/synthwave-dreams.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d',
    beatmap: [
      // Example beatmap - in production this would be much longer
      { id: '1', timestamp: 1000, type: 'red', direction: 'up', position: [-1, 1, -5] },
      { id: '2', timestamp: 2000, type: 'blue', direction: 'down', position: [1, 1, -5] },
      // ... more beats
    ]
  },
  // ... more songs
] as const;