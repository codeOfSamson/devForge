// src/components/AsyncTaskSimulator.tsx
import { useState } from "react";

type Task = {
  id: number;
  label: string;
  status: "Pending" | "Running" | "Done";
};

export default function AsyncTaskSimulator() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [nextId, setNextId] = useState(1);

  const startTask = () => {
    const id = nextId;
    const newTask: Task = { id, label: `Task ${id}`, status: "Pending" };

    setTasks((prev) => [...prev, newTask]);
    setNextId(id + 1);

    setTimeout(() => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, status: "Running" } : t
        )
      );

      const delay = 2000 + Math.random() * 2000;

      setTimeout(() => {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === id ? { ...t, status: "Done" } : t
          )
        );
      }, delay);
    }, 100);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">⚙️ Async Task Simulator</h2>

      <button
        onClick={startTask}
        className="bg-teal-600 text-white px-4 py-2 rounded mb-4"
      >
        Start Task
      </button>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`rounded p-4 text-white font-semibold ${
              task.status === "Pending"
                ? "bg-gray-500"
                : task.status === "Running"
                ? "bg-yellow-500"
                : "bg-green-600"
            }`}
          >
            {task.label} - {task.status}
          </div>
        ))}
      </div>
    </div>
  );
}
