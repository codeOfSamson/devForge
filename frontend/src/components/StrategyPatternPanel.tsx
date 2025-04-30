import { useState } from "react";

type Strategy = "asc" | "desc" | "shuffle";

function sortNumbers(strategy: Strategy, data: number[]): number[] {
  switch (strategy) {
    case "asc":
      return [...data].sort((a, b) => a - b);
    case "desc":
      return [...data].sort((a, b) => b - a);
    case "shuffle":
      return [...data].sort(() => Math.random() - 0.5);
    default:
      return data;
  }
}

export default function StrategyPatternPanel() {
  const initial = [4, 1, 9, 2, 6];
  const [data, setData] = useState(initial);
  const [strategy, setStrategy] = useState<Strategy>("asc");

  const applyStrategy = () => {
    const result = sortNumbers(strategy, initial);
    setData(result);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">🧠 Strategy Pattern</h2>

      <div className="mb-4 flex gap-2">
        <select
          value={strategy}
          onChange={(e) => setStrategy(e.target.value as Strategy)}
          className="p-2 rounded border"
        >
          <option value="asc">Sort Ascending</option>
          <option value="desc">Sort Descending</option>
          <option value="shuffle">Shuffle</option>
        </select>
        <button
          onClick={applyStrategy}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Apply Strategy
        </button>
      </div>

      <div className="flex gap-2">
        {data.map((num, idx) => (
          <div
            key={idx}
            className="w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-800 border border-indigo-300 rounded"
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
}
