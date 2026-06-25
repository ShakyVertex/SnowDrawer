import { useEffect, useRef } from 'react'
import {
  SQUARE_COLOR_DEFAULT,
  SQUARE_COLOR_MARKED,
  SQUARE_GAP,
  SQUARE_SIZE,
} from '../constants'
import { getGridCanvasSize } from '../utils/gridLayout'
import { cellKey, getCellFromPointer, type Cell } from '../utils/cellSelection'

type GridCanvasProps = {
  x: number
  y: number
  annotateMode: boolean
  markedCells: Set<string>
  onCellClick: (cell: Cell) => void
}

export function GridCanvas({ x, y, annotateMode, markedCells, onCellClick }: GridCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const width = getGridCanvasSize(x)
  const height = getGridCanvasSize(y)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || x <= 0 || y <= 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, width, height)

    for (let row = 0; row < y; row++) {
      for (let col = 0; col < x; col++) {
        const px = col * (SQUARE_SIZE + SQUARE_GAP)
        const py = row * (SQUARE_SIZE + SQUARE_GAP)
        const isMarked = markedCells.has(cellKey(col, row))
        ctx.fillStyle = isMarked ? SQUARE_COLOR_MARKED : SQUARE_COLOR_DEFAULT
        ctx.fillRect(px, py, SQUARE_SIZE, SQUARE_SIZE)
      }
    }
  }, [x, y, width, height, markedCells])

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!annotateMode) return
    const canvas = canvasRef.current
    if (!canvas) return

    const cell = getCellFromPointer(canvas, e.clientX, e.clientY, x, y)
    if (cell) onCellClick(cell)
  }

  if (x <= 0 || y <= 0) {
    return <div className="canvas-empty">请输入有效的长、宽参数</div>
  }

  return (
    <canvas
      ref={canvasRef}
      className={`grid-canvas${annotateMode ? ' grid-canvas--annotate' : ''}`}
      width={width}
      height={height}
      onClick={handleClick}
      aria-label={`${x} 列 × ${y} 行方块网格`}
    />
  )
}
