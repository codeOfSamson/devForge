import { useState, useEffect } from "react";

type Subscriber = {
  id: number;
  value: number;
  lastUpdated: string;
};

export default function ObserverPatternPanel() {
  const [publisherValue, setPublisherValue] = useState<number>(0);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [nextId, setNextId] = useState(1);

  // Update subscribers when publisher value changes
  useEffect(() => {
    const timestamp = new Date().toLocaleTimeString();
    setSubscribers(prev => 
      prev.map(sub => ({
        ...sub,
        value: publisherValue,
        lastUpdated: timestamp
      }))
    );
  }, [publisherValue]);

  const addSubscriber = () => {
    const timestamp = new Date().toLocaleTimeString();
    setSubscribers(prev => [...prev, {
      id: nextId,
      value: publisherValue,
      lastUpdated: timestamp
    }]);
    setNextId(prev => prev + 1);
  };

  const removeSubscriber = (id: number) => {
    setSubscribers(prev => prev.filter(sub => sub.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">👀 Observer Pattern</h2>
      
      {/* Publisher Section */}
      <div className="mb-6 p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
        <h3 className="text-lg font-semibold mb-3">Publisher</h3>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setPublisherValue(prev => prev - 1)}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            -
          </button>
          <span className="text-2xl font-bold text-purple-800">{publisherValue}</span>
          <button
            onClick={() => setPublisherValue(prev => prev + 1)}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            +
          </button>
        </div>
      </div>

      {/* Subscribers Section */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Subscribers</h3>
          <button
            onClick={addSubscriber}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Subscriber
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subscribers.map(subscriber => (
            <div
              key={subscriber.id}
              className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 relative"
            >
              <button
                onClick={() => removeSubscriber(subscriber.id)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              >
                ×
              </button>
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-gray-700">
                  Subscriber #{subscriber.id}
                </div>
                <div className="text-2xl font-bold text-blue-800">
                  {subscriber.value}
                </div>
                <div className="text-sm text-gray-500">
                  Last updated: {subscriber.lastUpdated}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 