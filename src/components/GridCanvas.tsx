import { useEffect, useRef } from 'react'
import {
  FRAME_BORDER_WIDTH,
  FRAME_COLOR,
  FRAME_PADDING,
  OUTER_FRAME_BORDER_WIDTH,
  OUTER_FRAME_COLOR,
  OUTER_FRAME_PADDING,
  SQUARE_COLOR_DEFAULT,
  SQUARE_COLOR_MARKED,
  SQUARE_GAP,
  SQUARE_SIZE,
} from '../constants'
import { getCanvasSize, getGridOffset, getGridSize } from '../utils/gridLayout'
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

  const gridWidth = getGridSize(x)
  const gridHeight = getGridSize(y)
  const width = getCanvasSize(gridWidth)
  const height = getCanvasSize(gridHeight)
  const gridOffset = getGridOffset()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || x <= 0 || y <= 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, width, height)

    for (let row = 0; row < y; row++) {
      for (let col = 0; col < x; col++) {
        const px = gridOffset + col * (SQUARE_SIZE + SQUARE_GAP)
        const py = gridOffset + row * (SQUARE_SIZE + SQUARE_GAP)
        const isMarked = markedCells.has(cellKey(col, row))
        ctx.fillStyle = isMarked ? SQUARE_COLOR_MARKED : SQUARE_COLOR_DEFAULT
        ctx.fillRect(px, py, SQUARE_SIZE, SQUARE_SIZE)
      }
    }

    ctx.strokeStyle = FRAME_COLOR
    ctx.lineWidth = FRAME_BORDER_WIDTH
    const purpleX = gridOffset - FRAME_PADDING - FRAME_BORDER_WIDTH / 2
    const purpleY = gridOffset - FRAME_PADDING - FRAME_BORDER_WIDTH / 2
    const purpleW = gridWidth + 2 * FRAME_PADDING + FRAME_BORDER_WIDTH
    const purpleH = gridHeight + 2 * FRAME_PADDING + FRAME_BORDER_WIDTH
    ctx.strokeRect(purpleX, purpleY, purpleW, purpleH)

    ctx.strokeStyle = OUTER_FRAME_COLOR
    ctx.lineWidth = OUTER_FRAME_BORDER_WIDTH
    const redX =
      purpleX - OUTER_FRAME_PADDING - OUTER_FRAME_BORDER_WIDTH / 2 - FRAME_BORDER_WIDTH / 2
    const redY =
      purpleY - OUTER_FRAME_PADDING - OUTER_FRAME_BORDER_WIDTH / 2 - FRAME_BORDER_WIDTH / 2
    const redW = purpleW + 2 * OUTER_FRAME_PADDING + FRAME_BORDER_WIDTH + OUTER_FRAME_BORDER_WIDTH
    const redH = purpleH + 2 * OUTER_FRAME_PADDING + FRAME_BORDER_WIDTH + OUTER_FRAME_BORDER_WIDTH
    ctx.strokeRect(redX, redY, redW, redH)
  }, [x, y, width, height, gridWidth, gridHeight, gridOffset, markedCells])

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!annotateMode) return
    const canvas = canvasRef.current
    if (!canvas) return

    const cell = getCellFromPointer(canvas, e.clientX, e.clientY, x, y, gridOffset)
    if (cell) onCellClick(cell)
  }

  if (x <= 0 || y <= 0) {
    return <div className="canvas-empty" />
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
