import { useState } from "react";
import TaskItem from "./TaskItem";
import LogPanel from "./LogPanel";

type Task = {
  id: string;
  status: "idle" | "loading" | "success" | "error" | "cancelled" | "canceling";
  controller: AbortController;
};

export default function AsyncPanel() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timestamp}] ${message}`, ...prev]);
  };

  const startTask = () => {
    const id = Math.random().toString(36).slice(2);
    const controller = new AbortController();

    const newTask: Task = {
      id,
      status: "loading",
      controller,
    };

    setTasks((prev) => [newTask, ...prev]);
    addLog(`Started task ${id}`);

    // Simulate async API call
    fetch("https://jsonplaceholder.typicode.com/todos/1", {
      signal: controller.signal,
    }).then((res) => {
      if (!res.ok) throw new Error("Request failed");
      return res.json();
    })
      .then(async () => {
        const time = 4000 + Math.random() * 4000;
        const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
        addLog(`Task ${id} will take ${(time / 1000).toFixed(1)} seconds`);
        if (controller.signal.aborted) throw new Error("Aborted before delay");

        await delay(time);  
        if (controller.signal.aborted) throw new Error("Aborted during delay");
  
      })
      .then(() => {
        if (!controller.signal.aborted) {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id ? { ...task, status: "success" } : task
          )
        );
        addLog(`Task ${id} completed successfully`);
      }
      })
      .catch((err) => {
        if (controller.signal.aborted) {
          setTasks((prev) =>
            prev.map((task) =>
              task.id === id ? { ...task, status: "cancelled" } : task
            )
          );
          addLog(`Task ${id} was cancelled`);
        } else {
          setTasks((prev) =>
            prev.map((task) =>
              task.id === id ? { ...task, status: "error" } : task
            )
          );
          addLog(`Task ${id} failed: ${err.message}`);
        }
      });
  };

  const cancelTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task && task.status === "loading") {
      task.controller.abort();
           setTasks((prev) =>
            prev.map((task) =>
              task.id === id ? { ...task, status: "canceling" } : task
            )
          );
    }

  };

  return (
    <div className="p-4 border rounded shadow-lg space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold mb-4">🔄 Async Task Panel</h2>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={startTask}
        >
          Start Task
        </button>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onCancel={cancelTask} />
        ))}
      </div>

      <LogPanel logs={logs} />
    </div>
  );
}
