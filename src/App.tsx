import { useState } from 'react'
import Box from './components/Box'
import Controls from './components/Controls'
import { createBox } from './components/BoxFactory'
import AsyncTaskSimulator from "./components/AsyncTaskSimulator";
import PatternInfoPanel from './components/PatternInfoPanel';
import FactoryPatternPanel from './components/FactoryPatternPanel';
import StrategyPatternPanel from './components/StrategyPatternPanel';
import AsyncPanel from './components/AsyncPanel';
import Preview from './components/Preview';

export default function App() {
  const [boxes, setBoxes] = useState([createBox()])
  const [flexDir, setFlexDir] = useState('flex-row')
  const [justify, setJustify] = useState('justify-start')
  const [align, setAlign] = useState('items-start')
  const [wrap, setWrap] = useState("flex-wrap")
  const [gap, setGap] = useState("gap-4")
  const [padding, setPadding] = useState("p-6")
  const [layoutType, setLayoutType] = useState("flex")

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
        />

  
      <div>
      <AsyncTaskSimulator />
    </div>
    <div>
      <AsyncPanel />
    </div>
    <div>
      <PatternInfoPanel />
    </div>
    <div>
      <FactoryPatternPanel />
    </div>
    <div>
      <StrategyPatternPanel />
    </div>

    </div>
  )
}
