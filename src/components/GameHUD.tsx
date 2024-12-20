import { useGameStore } from '../store/gameStore';

export function GameHUD() {
  const { score, combo, multiplier, accuracy } = useGameStore();

  return (
    <div className="absolute top-0 left-0 w-full p-4 text-white">
      <div className="flex justify-between items-start max-w-4xl mx-auto">
        <div>
          <h2 className="text-4xl font-bold">{score.toLocaleString()}</h2>
          <p className="text-xl">
            Combo: {combo} (x{multiplier})
          </p>
        </div>
        <div className="text-right">
          <p className="text-xl">Accuracy</p>
          <p className="text-2xl font-bold">{accuracy.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
}