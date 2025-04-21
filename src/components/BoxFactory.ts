let nextId = 1

export function createBox(): {
  id: number
  color: string
  size: string
} {
  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500']
  const sizes = ['w-20 h-20', 'w-24 h-24', 'w-16 h-16']

  return {
    id: nextId++,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: sizes[Math.floor(Math.random() * sizes.length)],
  }
}
