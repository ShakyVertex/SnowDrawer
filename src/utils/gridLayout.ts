import { FRAME_BORDER_WIDTH, FRAME_PADDING, SQUARE_GAP, SQUARE_SIZE } from '../constants'

export function getGridSize(count: number): number {
  if (count <= 0) return 0
  return count * SQUARE_SIZE + (count - 1) * SQUARE_GAP
}

export function getGridOffset(): number {
  return FRAME_PADDING + FRAME_BORDER_WIDTH
}

export function getCanvasSize(gridSize: number): number {
  if (gridSize <= 0) return 0
  return gridSize + 2 * getGridOffset()
}

export function getFrameSize(gridSize: number): number {
  if (gridSize <= 0) return 0
  return gridSize + 2 * FRAME_PADDING + 2 * FRAME_BORDER_WIDTH
}
