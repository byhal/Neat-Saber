import { BeatMap, Song } from '../types/song';

interface BeatSaverNote {
  _time: number;
  _lineIndex: number;
  _lineLayer: number;
  _type: number;
  _cutDirection: number;
}

interface BeatSaverMap {
  _notes: BeatSaverNote[];
  _obstacles: any[];
}

const LANE_WIDTH = 0.6;
const SPAWN_DISTANCE = -10;

function convertDirection(cutDirection: number): 'up' | 'down' | 'left' | 'right' {
  switch (cutDirection) {
    case 0: return 'up';
    case 1: return 'down';
    case 2: return 'left';
    case 3: return 'right';
    default: return 'up';
  }
}

function calculatePosition(lineIndex: number, lineLayer: number): [number, number, number] {
  const x = (lineIndex - 1.5) * LANE_WIDTH;
  const y = lineLayer * LANE_WIDTH + 1;
  return [x, y, SPAWN_DISTANCE];
}

export function convertBeatSaverMap(
  mapData: any,
  difficulty: string = 'Expert'
): Song {
  const difficultyData = mapData.versions[0].diffs.find(
    (diff: any) => diff.difficulty.toLowerCase() === difficulty.toLowerCase()
  );
  
  if (!difficultyData) {
    throw new Error(`Difficulty ${difficulty} not found`);
  }

  const noteData: BeatSaverMap = JSON.parse(difficultyData.notes);
  
  const beatmap: BeatMap[] = noteData._notes.map((note, index) => ({
    id: `${index}`,
    timestamp: note._time * (60000 / mapData.metadata.bpm), // Convert beats to ms
    type: note._type === 0 ? 'red' : 'blue',
    direction: convertDirection(note._cutDirection),
    position: calculatePosition(note._lineIndex, note._lineLayer)
  }));

  return {
    id: mapData.id,
    title: mapData.metadata.songName,
    artist: mapData.metadata.songAuthorName,
    difficulty: difficulty.toLowerCase() as 'easy' | 'normal' | 'hard' | 'expert',
    bpm: mapData.metadata.bpm,
    duration: mapData.metadata.duration,
    audioUrl: mapData.versions[0].previewURL,
    coverUrl: mapData.versions[0].coverURL,
    beatmap
  };
}