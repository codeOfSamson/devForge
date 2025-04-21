import { useState } from "react";

type Subscriber = {
  id: number;
  value: number;
};

export default function PatternInfoPanel() {
  const [value, setValue] = useState(0);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [nextId, setNextId] = useState(1);

  const notifySubscribers = (newValue: number) => {
    setSubscribers((subs) =>
      subs.map((s) => ({ ...s, value: newValue }))
    );
  };

  const updateValue = () => {
    const newValue = Math.floor(Math.random() * 100);
    setValue(newValue);
    notifySubscribers(newValue);
  };

  const addSubscriber = () => {
    setSubscribers((subs) => [
      ...subs,
      { id: nextId, value },
    ]);
    setNextId(nextId + 1);
  };

  const removeSubscriber = (id: number) => {
    setSubscribers((subs) => subs.filter((s) => s.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">📡 Observer Pattern</h2>

      <div className="mb-4 flex gap-2">
        <button onClick={updateValue} className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Publisher
        </button>
        <button onClick={addSubscriber} className="bg-green-600 text-white px-4 py-2 rounded">
          Add Subscriber
        </button>
      </div>

      <div className="mb-4 p-4 bg-gray-200 rounded">
        <strong>Publisher Value:</strong> {value}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subscribers.map((sub) => (
          <div
            key={sub.id}
            className="bg-indigo-500 text-white p-4 rounded flex justify-between items-center"
          >
            <span>Sub {sub.id}: {sub.value}</span>
            <button
              onClick={() => removeSubscriber(sub.id)}
              className="bg-red-500 px-2 py-1 rounded text-sm"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
