import React, { useState } from "react";

// Command interface
interface Command {
  execute(): void;
  undo(): void;
  description: string;
}

// Receiver: manages the list
class ItemList {
  private _items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;

  constructor(items: string[], setItems: React.Dispatch<React.SetStateAction<string[]>>) {
    this._items = items;
    this.setItems = setItems;
  }

  get items() {
    return this._items;
  }

  set items(newItems: string[]) {
    this._items = newItems;
    this.setItems([...newItems]);
  }

  add(item: string) {
    this.items = [...this._items, item];
  }

  remove(index: number) {
    this.items = this._items.filter((_, i) => i !== index);
  }

  clear() {
    this.items = [];
  }
}

// Concrete Commands
class AddCommand implements Command {
  private receiver: ItemList;
  private item: string;
  private index: number | null = null;
  description: string;

  constructor(receiver: ItemList, item: string) {
    this.receiver = receiver;
    this.item = item;
    this.description = `Add "${item}"`;
  }

  execute() {
    this.receiver.add(this.item);
    this.index = this.receiver.items.length - 1;
  }

  undo() {
    if (this.index !== null) {
      this.receiver.remove(this.index);
    }
  }
}

class RemoveCommand implements Command {
  private receiver: ItemList;
  private index: number;
  private removedItem: string | null = null;
  description: string;

  constructor(receiver: ItemList, index: number) {
    this.receiver = receiver;
    this.index = index;
    this.description = `Remove item at index ${index + 1}`;
  }

  execute() {
    this.removedItem = this.receiver.items[this.index];
    this.receiver.remove(this.index);
  }

  undo() {
    if (this.removedItem !== null) {
      const items = [...this.receiver.items];
      items.splice(this.index, 0, this.removedItem);
      this.receiver.items = items;
    }
  }
}

class ClearCommand implements Command {
  private receiver: ItemList;
  private prevItems: string[] = [];
  description: string;

  constructor(receiver: ItemList) {
    this.receiver = receiver;
    this.description = "Clear all items";
  }

  execute() {
    this.prevItems = [...this.receiver.items];
    this.receiver.clear();
  }

  undo() {
    this.receiver.items = this.prevItems;
  }
}

// Invoker (history manager)
class CommandInvoker {
  private history: Command[] = [];

  executeCommand(command: Command) {
    command.execute();
    this.history.push(command);
  }

  undo() {
    const command = this.history.pop();
    if (command) {
      command.undo();
    }
  }

  getHistory() {
    return this.history;
  }
}

export default function CommandPatternPanel() {
  const [items, setItems] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [_, setForceUpdate] = useState(0); // for re-rendering after undo
  const [invoker] = useState(() => new CommandInvoker());

  // OOP receiver instance
  const receiver = new ItemList(items, setItems);

  const handleAdd = () => {
    if (!input.trim()) return;
    const cmd = new AddCommand(receiver, input.trim());
    invoker.executeCommand(cmd);
    setInput("");
    setForceUpdate((n) => n + 1);
  };

  const handleRemove = (index: number) => {
    const cmd = new RemoveCommand(receiver, index);
    invoker.executeCommand(cmd);
    setForceUpdate((n) => n + 1);
  };

  const handleClear = () => {
    if (items.length === 0) return;
    const cmd = new ClearCommand(receiver);
    invoker.executeCommand(cmd);
    setForceUpdate((n) => n + 1);
  };

  const handleUndo = () => {
    invoker.undo();
    setForceUpdate((n) => n + 1);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">🕹️ Command Pattern</h2>
      <div className="mb-4 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="p-2 border rounded flex-1"
          placeholder="Enter item..."
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
        <button
          onClick={handleClear}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Clear All
        </button>
        <button
          onClick={handleUndo}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Undo
        </button>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-1 bg-gray-100 border px-3 py-1 rounded">
            <span>{item}</span>
            <button
              onClick={() => handleRemove(idx)}
              className="text-red-500 hover:text-red-700 ml-2"
              title="Remove"
            >
              ×
            </button>
          </div>
        ))}
        {items.length === 0 && <span className="text-gray-400">No items</span>}
      </div>
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Command History</h3>
        <ol className="list-decimal list-inside text-sm text-gray-600">
          {invoker.getHistory().map((cmd, idx) => (
            <li key={idx}>{cmd.description}</li>
          ))}
          {invoker.getHistory().length === 0 && <li>No commands executed yet.</li>}
        </ol>
      </div>
    </div>
  );
} 