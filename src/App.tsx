import { useState } from 'react'
import Controls from './components/Controls'
import { createBox } from './components/BoxFactory'
import PatternInfoPanel from './components/PatternInfoPanel';
import FactoryPatternPanel from './components/FactoryPatternPanel';
import StrategyPatternPanel from './components/StrategyPatternPanel';
import AsyncPanel from './components/AsyncPanel';
import Preview from './components/Preview';
import CommandPatternPanel from './components/CommandPatternPanel';
import AdapterPatternPanel from './components/AdapterPatternPanel';

const TABS = [
  { label: "Factory", component: <FactoryPatternPanel /> },
  { label: "Strategy", component: <StrategyPatternPanel /> },
  { label: "Command", component: <CommandPatternPanel /> },
  { label: "Observer", component: <PatternInfoPanel /> },
  { label: "Async", component: <AsyncPanel /> },
  { label: "Adapter", component: <AdapterPatternPanel /> },
];

export default function App() {
  const [boxes, setBoxes] = useState([createBox()])
  const [flexDir, setFlexDir] = useState('flex-row')
  const [justify, setJustify] = useState('justify-start')
  const [align, setAlign] = useState('items-start')
  const [wrap, setWrap] = useState("flex-wrap")
  const [gap, setGap] = useState("gap-4")
  const [padding, setPadding] = useState("p-6")
  const [layoutType, setLayoutType] = useState("flex")
  const [goCrazy, setGoCrazy] = useState(false)
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🎨 Flexbox Playground</h1>

      <Controls
        layoutType={layoutType}
        direction={flexDir}
        justify={justify}
        align={align}
        wrap={wrap}
        gap={gap}
        padding={padding}
        onLayoutTypeChange={setLayoutType}
        onDirectionChange={setFlexDir}
        onJustifyChange={setJustify}
        onAlignChange={setAlign}
        onWrapChange={setWrap}
        onGapChange={setGap}
        onPaddingChange={setPadding}
        onAddBox={() => setBoxes((prev) => [...prev, createBox()])}
        onGoCrazy={() => setGoCrazy(!goCrazy)}
        goCrazy={goCrazy}
      />

      <Preview
        layoutType={layoutType}
        direction={flexDir}
        justify={justify}
        align={align}
        wrap={wrap}
        gap={gap}
        padding={padding}
        boxes={boxes}
        goCrazy={goCrazy}
      />

      {/* Tabs for pattern demos */}
      <div className="mt-8">
      <h1 className="text-3xl font-bold mb-4">👨🏼‍💻 Design Pattern Demos</h1>
        <div className="flex gap-2 mb-4 border-b">
          {TABS.map((tab, idx) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
                activeTab === idx
                  ? "border-blue-600 text-blue-700"
                  : "border-transparent text-gray-500 hover:text-blue-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div>
          {TABS[activeTab].component}
        </div>
      </div>
    </div>
  )
}
