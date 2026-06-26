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
  SQUARE_COLOR_PREVIEW,
  SQUARE_GAP,
  SQUARE_SIZE,
} from '../constants'
import { getCanvasSize, getGridOffset, getGridSize } from '../utils/gridLayout'
import {
  cellKey,
  getCellFromPointer,
  getRegionCellKeys,
  type Cell,
} from '../utils/cellSelection'

type GridCanvasProps = {
  x: number
  y: number
  annotateMode: boolean
  pendingCell: Cell | null
  previewCell: Cell | null
  markedCells: Set<string>
  onCellClick: (cell: Cell) => void
  onCellHover: (cell: Cell | null) => void
}

export function GridCanvas({
  x,
  y,
  annotateMode,
  pendingCell,
  previewCell,
  markedCells,
  onCellClick,
  onCellHover,
}: GridCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const gridWidth = getGridSize(x)
  const gridHeight = getGridSize(y)
  const width = getCanvasSize(gridWidth)
  const height = getCanvasSize(gridHeight)
  const gridOffset = getGridOffset()

  const previewCells =
    annotateMode && pendingCell && previewCell
      ? getRegionCellKeys(pendingCell, previewCell)
      : annotateMode && pendingCell
        ? new Set([cellKey(pendingCell.col, pendingCell.row)])
        : null

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
        const key = cellKey(col, row)
        const isMarked = markedCells.has(key)
        const isPreview = previewCells?.has(key) ?? false

        if (isMarked) {
          ctx.fillStyle = SQUARE_COLOR_MARKED
        } else if (isPreview) {
          ctx.fillStyle = SQUARE_COLOR_PREVIEW
        } else {
          ctx.fillStyle = SQUARE_COLOR_DEFAULT
        }
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
  }, [x, y, width, height, gridWidth, gridHeight, gridOffset, markedCells, previewCells])

  const pickCell = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    if (!canvas) return null
    return getCellFromPointer(canvas, clientX, clientY, x, y, gridOffset)
  }

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!annotateMode) return
    const cell = pickCell(e.clientX, e.clientY)
    if (cell) onCellClick(cell)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!annotateMode || !pendingCell) {
      onCellHover(null)
      return
    }
    onCellHover(pickCell(e.clientX, e.clientY))
  }

  const handleMouseLeave = () => {
    onCellHover(null)
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={`${x} 列 × ${y} 行方块网格`}
    />
  )
}
