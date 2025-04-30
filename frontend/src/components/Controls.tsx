import StyledSelect from "./StyledSelect";

type Props = {
  layoutType: string
  direction: string
  justify: string
  align: string
  wrap: string
  gap: string
  padding: string
  onLayoutTypeChange: (val: string) => void
  onDirectionChange: (val: string) => void
  onJustifyChange: (val: string) => void
  onAlignChange: (val: string) => void
  onWrapChange: (val: string) => void
  onGapChange: (val: string) => void
  onPaddingChange: (val: string) => void
  onAddBox: () => void
  onGoCrazy: () => void
  goCrazy: boolean
}

export default function Controls({
  layoutType,
  direction,
  justify,
  align,
  wrap,
  gap,
  padding,
  onLayoutTypeChange,
  onDirectionChange,
  onJustifyChange,
  onAlignChange,
  onWrapChange,
  onGapChange,
  onPaddingChange,
  onAddBox,
  onGoCrazy,
  goCrazy
}: Props) {
  return (
    <div className="mb-4 flex flex-wrap gap-4 items-center ">
      <button onClick={onAddBox} className="bg-indigo-600 text-white px-4 py-2 rounded">
        Add Box
      </button>
      <button onClick={onGoCrazy} className="bg-yellow-600 text-white px-4 py-2 rounded">
       {!goCrazy? 'Go Crazy!' : 'Please Stop!' } 
      </button>
      <StyledSelect value={layoutType} onChange={(e) => onLayoutTypeChange(e.target.value)}>
        <option value="flex">Flex</option>
        <option value="grid">Grid</option>
      </StyledSelect>

      {layoutType === "flex" && (
        <>
          <StyledSelect value={direction} onChange={(e) => onDirectionChange(e.target.value)}>
            <option value="flex-row">Row</option>
            <option value="flex-col">Column</option>
          </StyledSelect>

          <StyledSelect value={wrap} onChange={(e) => onWrapChange(e.target.value)}>
            <option value="flex-wrap">Wrap</option>
            <option value="flex-nowrap">No Wrap</option>
            <option value="flex-wrap-reverse">Wrap Reverse</option>
          </StyledSelect>

          <StyledSelect value={justify} onChange={(e) => onJustifyChange(e.target.value)}>
            <option value="justify-start">Start</option>
            <option value="justify-center">Center</option>
            <option value="justify-end">End</option>
            <option value="justify-between">Space Between</option>
            <option value="justify-around">Space Around</option>
          </StyledSelect>

          <StyledSelect value={align} onChange={(e) => onAlignChange(e.target.value)}>
            <option value="items-start">Items Start</option>
            <option value="items-center">Items Center</option>
            <option value="items-end">Items End</option>
            <option value="items-stretch">Stretch</option>
          </StyledSelect>
        </>
      )}

      <StyledSelect value={gap} onChange={(e) => onGapChange(e.target.value)}>
        <option value="gap-1">gap-1</option>
        <option value="gap-4">gap-4</option>
        <option value="gap-8">gap-8</option>
      </StyledSelect>

      <StyledSelect value={padding} onChange={(e) => onPaddingChange(e.target.value)}>
        <option value="p-2">p-2</option>
        <option value="p-4">p-4</option>
        <option value="p-8">p-8</option>
      </StyledSelect>
    </div>
  )
}
