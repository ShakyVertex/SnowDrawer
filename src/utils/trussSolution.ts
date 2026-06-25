/** 1.2x + 1.4y = z ⟺ 6x + 7y = 5z，求 y 最大的正整数解 */
export function getMaxYSolution(z: number): { x: number; y: number } | null {
  const target = Math.round(5 * z)
  const maxPossibleX = Math.floor(target / 6)

  for (let x = 1; x <= maxPossibleX; x++) {
    const remainder = target - 6 * x
    if (remainder <= 0) continue
    if (remainder % 7 === 0) {
      const y = remainder / 7
      if (y >= 1) {
        return { x, y }
      }
    }
  }

  return null
}
