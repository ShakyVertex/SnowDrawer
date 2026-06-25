import { SQUARE_GAP, SQUARE_SIZE } from '../constants'

export function getGridCanvasSize(count: number): number {
  if (count <= 0) return 0
  return count * SQUARE_SIZE + (count - 1) * SQUARE_GAP
}
