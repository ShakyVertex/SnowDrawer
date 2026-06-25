import {
  FRAME_BORDER_WIDTH,
  FRAME_PADDING,
  OUTER_FRAME_BORDER_WIDTH,
  OUTER_FRAME_PADDING,
  SQUARE_GAP,
  SQUARE_SIZE,
} from '../constants'

export function getGridSize(count: number): number {
  if (count <= 0) return 0
  return count * SQUARE_SIZE + (count - 1) * SQUARE_GAP
}

export function getPurpleFrameSize(gridSize: number): number {
  if (gridSize <= 0) return 0
  return gridSize + 2 * FRAME_PADDING + 2 * FRAME_BORDER_WIDTH
}

export function getRedFrameSize(gridSize: number): number {
  const purpleSize = getPurpleFrameSize(gridSize)
  if (purpleSize <= 0) return 0
  return purpleSize + 2 * OUTER_FRAME_PADDING + 2 * OUTER_FRAME_BORDER_WIDTH
}

export function getGridOffset(): number {
  return (
    OUTER_FRAME_PADDING +
    OUTER_FRAME_BORDER_WIDTH +
    FRAME_PADDING +
    FRAME_BORDER_WIDTH
  )
}

export function getCanvasSize(gridSize: number): number {
  return getRedFrameSize(gridSize)
}

// 兼容旧命名
export const getFrameSize = getPurpleFrameSize
