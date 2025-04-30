type Props = {
    logs: string[];
  };
  
  export default function LogPanel({ logs }: Props) {
    return (
      <div className="mt-4 bg-black text-green-300 text-xs font-mono p-2 rounded max-h-48 overflow-y-auto">
        {logs.length === 0 ? (
          <div className="opacity-50">No logs yet...</div>
        ) : (
          logs.map((log, i) => <div key={i}>{log}</div>)
        )}
      </div>
    );
  }
  