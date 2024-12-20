import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { getLatestMaps, searchMaps } from '../../api/beatsaver';
import { convertBeatSaverMap } from '../../utils/mapConverter';
import { useGameStore } from '../../store/gameStore';

export function MapBrowser() {
  const [maps, setMaps] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const setCurrentSong = useGameStore((state) => state.setCurrentSong);
  const startGame = useGameStore((state) => state.startGame);

  useEffect(() => {
    loadLatestMaps();
  }, []);

  async function loadLatestMaps() {
    setLoading(true);
    try {
      const data = await getLatestMaps();
      setMaps(data.docs);
    } catch (error) {
      console.error('Failed to load maps:', error);
    }
    setLoading(false);
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const data = await searchMaps(query);
      setMaps(data.docs);
    } catch (error) {
      console.error('Failed to search maps:', error);
    }
    setLoading(false);
  }

  async function handleSelectMap(map: any) {
    try {
      const convertedMap = convertBeatSaverMap(map);
      setCurrentSong(convertedMap);
      startGame();
    } catch (error) {
      console.error('Failed to load map:', error);
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg max-w-4xl w-full">
      <h2 className="text-2xl font-bold mb-6">Custom Maps</h2>
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search maps..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid gap-4">
          {maps.map((map) => (
            <div
              key={map.id}
              className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => handleSelectMap(map)}
            >
              <div className="flex gap-4">
                <img
                  src={map.versions[0].coverURL}
                  alt={map.name}
                  className="w-16 h-16 rounded object-cover"
                />
                <div>
                  <h3 className="font-bold">{map.name}</h3>
                  <p className="text-sm text-gray-600">
                    {map.metadata.songAuthorName} · Mapped by {map.metadata.levelAuthorName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {map.metadata.bpm} BPM · {map.stats.downloads.toLocaleString()} downloads
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}