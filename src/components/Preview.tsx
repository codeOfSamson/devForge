type Box = {
    id: number
    color: string
    size: string
  }
  
type Props = {
    layoutType: string
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
      ? `flex ${direction} ${wrap} ${justify} ${align}`
      : `grid grid-cols-4`
    
    return (
      <div className={`border rounded-md min-h-[200px] ${padding} ${gap} ${layoutClass}`}>
      {boxes.map((box, i) => (
        <div
          key={box.id}
          className={`${box.color} ${box.size}  text-white p-4 rounded shadow`}
          style={{
            width: box.size,
            height: box.size,
            backgroundColor: box.color,
          }}
            >
             Box {i + 1}
       </div>
))}

      </div>
    )
  }
  