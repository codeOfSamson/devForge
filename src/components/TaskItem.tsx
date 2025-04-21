type Task = {
    id: string;
    status: "idle" | "loading" | "success" | "error" | "cancelled";
  };
  
  type Props = {
    task: Task;
    onCancel: (id: string) => void;
  };
  
  const statusColor = {
    loading: "bg-yellow-400",
    success: "bg-green-500",
    error: "bg-red-500",
    cancelled: "bg-gray-500",
    idle: "bg-gray-300",
  };
  
  export default function TaskItem({ task, onCancel }: Props) {
    return (
      <div className="flex items-center justify-between p-2 border rounded">
        <div className="flex items-center gap-4">
          <div
            className={`w-4 h-4 rounded-full animate-pulse ${statusColor[task.status]}`}
          ></div>
          <span className="text-sm">Task ID: {task.id}</span>
          <span className="text-sm font-medium capitalize">{task.status}</span>
        </div>
  
        {task.status === "loading" && (
          <button
            onClick={() => onCancel(task.id)}
            className="text-xs text-red-600 underline"
          >
            Cancel
          </button>
        )}
      </div>
    );
  }
  