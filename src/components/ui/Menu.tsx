import { useState } from 'react';
import { Music, Download } from 'lucide-react';
import { songs } from '../../data/songs';
import { useGameStore } from '../../store/gameStore';
import { MapBrowser } from './MapBrowser';

export function Menu() {
  const [view, setView] = useState<'default' | 'custom'>('default');
  const [selectedSong, setSelectedSong] = useState(songs[0]);
  const startGame = useGameStore((state) => state.startGame);
  const setCurrentSong = useGameStore((state) => state.setCurrentSong);

  const handleStart = () => {
    setCurrentSong(selectedSong);
    startGame();
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="max-w-4xl w-full">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setView('default')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-colors ${
              view === 'default'
                ? 'bg-white text-black'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            <Music size={20} />
            Built-in Songs
          </button>
          <button
            onClick={() => setView('custom')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-colors ${
              view === 'custom'
                ? 'bg-white text-black'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            <Download size={20} />
            Custom Maps
          </button>
        </div>

        {view === 'default' ? (
          <div className="bg-white p-8 rounded-lg">
            <h1 className="text-3xl font-bold mb-6">Built-in Songs</h1>
            <div className="grid gap-4">
              {songs.map((song) => (
                <div
                  key={song.id}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedSong.id === song.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedSong(song)}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={song.coverUrl}
                      alt={song.title}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div>
                      <h3 className="font-bold">{song.title}</h3>
                      <p className="text-sm opacity-80">{song.artist}</p>
                      <p className="text-sm">
                        {song.difficulty.toUpperCase()} · {song.bpm} BPM
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleStart}
              className="mt-6 w-full py-3 px-6 bg-green-500 text-white rounded-lg
                       font-bold hover:bg-green-600 transition-colors"
            >
              Start Game
            </button>
          </div>
        ) : (
          <MapBrowser />
        )}
      </div>
    </div>
  );
}