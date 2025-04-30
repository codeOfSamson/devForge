import { useState } from "react";

type BoxType = "info" | "warning" | "success";

type Box = {
  id: number;
  type: BoxType;
  content: string;
};

function createBox(type: BoxType, id: number): Box {
  const contentMap = {
    info: "This is an info box.",
    warning: "Watch out! Warning box.",
    success: "Operation successful!",
  };

  return {
    id,
    type,
    content: contentMap[type],
  };
}

export default function FactoryPatternPanel() {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [selectedType, setSelectedType] = useState<BoxType>("info");
  const [nextId, setNextId] = useState(1);

  const addBox = () => {
    const newBox = createBox(selectedType, nextId);
    setBoxes((prev) => [...prev, newBox]);
    setNextId(nextId + 1);
  };

  const getBoxStyle = (type: BoxType) => {
    switch (type) {
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-500";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-500";
      case "success":
        return "bg-green-100 text-green-800 border-green-500";
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">🏭 Factory Pattern</h2>

      <div className="mb-4 flex gap-2">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as BoxType)}
          className="p-2 rounded border"
        >
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="success">Success</option>
        </select>
        <button
          onClick={addBox}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Create Box
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {boxes.map((box) => (
          <div
            key={box.id}
            className={`p-4 border rounded ${getBoxStyle(box.type)}`}
          >
            <strong>{box.type.toUpperCase()} #{box.id}</strong>
            <p>{box.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
