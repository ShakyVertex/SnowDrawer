import { SQUARE_GAP, SQUARE_SIZE } from '../constants'

export type Cell = { col: number; row: number }

export function cellKey(col: number, row: number): string {
  return `${col},${row}`
}

export function getCellFromPointer(
  canvas: HTMLCanvasElement,
  clientX: number,
  clientY: number,
  cols: number,
  rows: number,
  gridOffset = 0,
): Cell | null {
  const rect = canvas.getBoundingClientRect()
  const scaleX = canvas.width / rect.width
  const scaleY = canvas.height / rect.height
  const px = (clientX - rect.left) * scaleX - gridOffset
  const py = (clientY - rect.top) * scaleY - gridOffset

  const col = Math.floor(px / (SQUARE_SIZE + SQUARE_GAP))
  const row = Math.floor(py / (SQUARE_SIZE + SQUARE_GAP))

  if (col < 0 || col >= cols || row < 0 || row >= rows) return null

  const localX = px - col * (SQUARE_SIZE + SQUARE_GAP)
  const localY = py - row * (SQUARE_SIZE + SQUARE_GAP)
  if (localX > SQUARE_SIZE || localY > SQUARE_SIZE) return null

  return { col, row }
}

export function getRegionBounds(a: Cell, b: Cell) {
  const colMin = Math.min(a.col, b.col)
  const colMax = Math.max(a.col, b.col)
  const rowMin = Math.min(a.row, b.row)
  const rowMax = Math.max(a.row, b.row)
  return { colMin, colMax, rowMin, rowMax }
}

export function getTankDimensions(a: Cell, b: Cell) {
  const { colMin, colMax, rowMin, rowMax } = getRegionBounds(a, b)
  return {
    m: colMax - colMin + 1,
    n: rowMax - rowMin + 1,
  }
}

export function getRegionCells(a: Cell, b: Cell): Cell[] {
  const { colMin, colMax, rowMin, rowMax } = getRegionBounds(a, b)
  const cells: Cell[] = []
  for (let row = rowMin; row <= rowMax; row++) {
    for (let col = colMin; col <= colMax; col++) {
      cells.push({ col, row })
    }
  }
  return cells
}

export function getRegionCellKeys(a: Cell, b: Cell): Set<string> {
  const keys = new Set<string>()
  for (const { col, row } of getRegionCells(a, b)) {
    keys.add(cellKey(col, row))
  }
  return keys
}
