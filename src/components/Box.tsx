type BoxProps = {
    id: number
    color: string
    size: string
    animation?: string 

  }
  
  export default function Box({ id, color, size }: BoxProps) {
    return (
      <div
        className={`flex items-center justify-center ${color} ${size} rounded text-white font-bold`}
      >
        Box {id}
      </div>
    )
  }
  