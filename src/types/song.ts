export interface BeatMap {
  id: string;
  timestamp: number;
  type: 'red' | 'blue';
  direction: 'up' | 'down' | 'left' | 'right';
  position: [number, number, number];
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  difficulty: 'easy' | 'normal' | 'hard' | 'expert';
  bpm: number;
  duration: number;
  audioUrl: string;
  coverUrl: string;
  beatmap: BeatMap[];
}