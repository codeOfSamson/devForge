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
    goCrazy: boolean
  }

  const builtInAnimations = [
    "animate-pulse",
    "animate-bounce",
    "animate-ping",
    "animate-spin",
  ];

  

  export default function Preview({
    layoutType,
    direction,
    justify,
    align,
    wrap,
    gap,
    padding,
    boxes,
    goCrazy
  }: Props) {

    function applyRandomAnimations(boxes: Box[]): Box[] {
      return boxes.map((box) => {
        const randomAnimation =
          builtInAnimations[Math.floor(Math.random() * builtInAnimations.length)];
        return { ...box, animation: randomAnimation };
      });
    }

    const animatedBoxes = goCrazy ? applyRandomAnimations(boxes) : boxes;

    console.log(animatedBoxes)


    const layoutClass =
    layoutType === "flex"
      ? `flex ${direction} ${wrap} ${justify} ${align}`
      : `grid grid-cols-4`

    
    return (
      <div className={`border rounded-md min-h-[200px] ${padding} ${gap} ${layoutClass}`}>
      {animatedBoxes.map((box, i) => (
        <div
          key={box.id}
          className={`${box.color} ${box.size} ${box.animation}  text-white p-4 rounded shadow`}
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
  