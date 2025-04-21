type Box = {
    id: number
    color: string
    size: string
  }
  
type Props = {
    layoutType: "flex" | "grid"
    direction: string
    justify: string
    align: string
    wrap: string
    gap: string
    padding: string
    boxes: Box[]
  }
  
  export default function Preview({
    layoutType,
    direction,
    justify,
    align,
    wrap,
    gap,
    padding,
    boxes,
  }: Props) {
    const layoutClass =
      layoutType === "flex"
        ? `flex flex-${direction} flex-${wrap} justify-${justify} items-${align}`
        : `grid grid-cols-3`
  
    return (
      <div className={`border rounded-md min-h-[200px] ${padding} ${gap} ${layoutClass}`}>
        {[...Array(boxes)].map((_, i) => (
          <div key={i} className="bg-indigo-400 text-white p-4 rounded shadow">
            Box {i + 1}
          </div>
        ))}
      </div>
    )
  }
  