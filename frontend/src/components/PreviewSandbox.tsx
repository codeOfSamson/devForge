import { useState } from 'react';
import Preview from './Preview';

type Box = {
  id: number;
  color: string;
  size: string;
  animation?: string;
};

type LayoutType = 'flex' | 'grid';
type Direction = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export default function PreviewSandbox() {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [layoutType, setLayoutType] = useState<LayoutType>('flex');
  const [direction, setDirection] = useState<Direction>('row');
  const [justifyContent, setJustifyContent] = useState<JustifyContent>('flex-start');
  const [alignItems, setAlignItems] = useState<AlignItems>('stretch');
  const [flexWrap, setFlexWrap] = useState<FlexWrap>('nowrap');
  const [gap, setGap] = useState<string>('0');
  const [padding, setPadding] = useState<string>('0');
  const [gridColumns, setGridColumns] = useState<string>('1');

  const addBox = () => {
    const newBox: Box = {
      id: Date.now(),
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      size: '100px',
    };
    setBoxes([...boxes, newBox]);
  };

  const removeBox = (id: number) => {
    setBoxes(boxes.filter(box => box.id !== id));
  };

  const updateBox = (id: number, updates: Partial<Box>) => {
    setBoxes(boxes.map(box => 
      box.id === id ? { ...box, ...updates } : box
    ));
  };

  const containerStyle = {
    display: layoutType,
    flexDirection: layoutType === 'flex' ? direction : undefined,
    justifyContent: layoutType === 'flex' ? justifyContent : undefined,
    alignItems: layoutType === 'flex' ? alignItems : undefined,
    flexWrap: layoutType === 'flex' ? flexWrap : undefined,
    gap: `${gap}px`,
    padding: `${padding}px`,
    gridTemplateColumns: layoutType === 'grid' ? `repeat(${gridColumns}, 1fr)` : undefined,
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex gap-4">
        <button
          onClick={addBox}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Box
        </button>
        <button
          onClick={() => setBoxes([])}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Layout Type</label>
            <select
              value={layoutType}
              onChange={(e) => setLayoutType(e.target.value as LayoutType)}
              className="w-full p-2 border rounded"
            >
              <option value="flex">Flex</option>
              <option value="grid">Grid</option>
            </select>
          </div>

          {layoutType === 'flex' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Direction</label>
                <select
                  value={direction}
                  onChange={(e) => setDirection(e.target.value as Direction)}
                  className="w-full p-2 border rounded"
                >
                  <option value="row">Row</option>
                  <option value="column">Column</option>
                  <option value="row-reverse">Row Reverse</option>
                  <option value="column-reverse">Column Reverse</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Justify Content</label>
                <select
                  value={justifyContent}
                  onChange={(e) => setJustifyContent(e.target.value as JustifyContent)}
                  className="w-full p-2 border rounded"
                >
                  <option value="flex-start">Flex Start</option>
                  <option value="flex-end">Flex End</option>
                  <option value="center">Center</option>
                  <option value="space-between">Space Between</option>
                  <option value="space-around">Space Around</option>
                  <option value="space-evenly">Space Evenly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Align Items</label>
                <select
                  value={alignItems}
                  onChange={(e) => setAlignItems(e.target.value as AlignItems)}
                  className="w-full p-2 border rounded"
                >
                  <option value="flex-start">Flex Start</option>
                  <option value="flex-end">Flex End</option>
                  <option value="center">Center</option>
                  <option value="stretch">Stretch</option>
                  <option value="baseline">Baseline</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Flex Wrap</label>
                <select
                  value={flexWrap}
                  onChange={(e) => setFlexWrap(e.target.value as FlexWrap)}
                  className="w-full p-2 border rounded"
                >
                  <option value="nowrap">No Wrap</option>
                  <option value="wrap">Wrap</option>
                  <option value="wrap-reverse">Wrap Reverse</option>
                </select>
              </div>
            </>
          )}

          {layoutType === 'grid' && (
            <div>
              <label className="block text-sm font-medium mb-1">Grid Columns</label>
              <input
                type="number"
                min="1"
                max="12"
                value={gridColumns}
                onChange={(e) => setGridColumns(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Gap (px)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={gap}
              onChange={(e) => setGap(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Padding (px)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={padding}
              onChange={(e) => setPadding(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="border rounded p-4 min-h-[400px]" style={containerStyle}>
          {boxes.map(box => (
            <div
              key={box.id}
              className="flex items-center justify-center"
              style={{
                backgroundColor: box.color,
                width: box.size,
                height: box.size,
                animation: box.animation,
              }}
            >
              <button
                onClick={() => removeBox(box.id)}
                className="text-white bg-black bg-opacity-50 rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 