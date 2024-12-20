import { create } from 'zustand';
import type { Song } from '../types/song';

interface GameState {
  score: number;
  combo: number;
  multiplier: number;
  isPlaying: boolean;
  currentSong: Song | null;
  songProgress: number;
  maxCombo: number;
  accuracy: number;
  totalNotes: number;
  hitNotes: number;
  missedNotes: number;

  addScore: (points: number, accuracy: number) => void;
  missNote: () => void;
  resetGame: () => void;
  startGame: () => void;
  endGame: () => void;
  setCurrentSong: (song: Song) => void;
  updateProgress: (progress: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  combo: 0,
  multiplier: 1,
  isPlaying: false,
  currentSong: null,
  songProgress: 0,
  maxCombo: 0,
  accuracy: 100,
  totalNotes: 0,
  hitNotes: 0,
  missedNotes: 0,

  addScore: (points, accuracy) =>
    set((state) => {
      const newCombo = state.combo + 1;
      const newMultiplier = Math.floor(newCombo / 8) + 1;
      const finalPoints = points * newMultiplier;

      return {
        score: state.score + finalPoints,
        combo: newCombo,
        multiplier: Math.min(newMultiplier, 8),
        maxCombo: Math.max(state.maxCombo, newCombo),
        hitNotes: state.hitNotes + 1,
        totalNotes: state.totalNotes + 1,
        accuracy: ((state.accuracy * state.totalNotes + accuracy) / (state.totalNotes + 1)),
      };
    }),

  missNote: () =>
    set((state) => ({
      combo: 0,
      multiplier: 1,
      missedNotes: state.missedNotes + 1,
      totalNotes: state.totalNotes + 1,
      accuracy: ((state.accuracy * state.totalNotes + 0) / (state.totalNotes + 1)),
    })),

  resetGame: () =>
    set({
      score: 0,
      combo: 0,
      multiplier: 1,
      isPlaying: false,
      currentSong: null,
      songProgress: 0,
      maxCombo: 0,
      accuracy: 100,
      totalNotes: 0,
      hitNotes: 0,
      missedNotes: 0,
    }),

  startGame: () => set({ isPlaying: true }),
  endGame: () => set({ isPlaying: false }),
  setCurrentSong: (song) => set({ currentSong: song }),
  updateProgress: (progress) => set({ songProgress: progress }),
}));