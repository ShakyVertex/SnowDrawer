/** 2.2x + 1.4y = z ⟺ 11x + 7y = 5z，求 y 最大的正整数解 */
export function getMaxSolution(z: number): { x: number; y: number } | null {
  const target = Math.round(5 * z)
  const maxPossibleX = Math.floor(target / 11)

  for (let x = 1; x <= maxPossibleX; x++) {
    const remainder = target - 11 * x
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

/** 1.2x + 1.4y = z ⟺ 6x + 7y = 5z，求 y 最大的正整数解 */
export function getMaxSolutionDeprecated(z: number): { x: number; y: number } | null {
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

export type TrussCounts = {
  count1m: number
  count12m: number
  count2m: number
}

const EMPTY_TRUSS_COUNTS: TrussCounts = {
  count1m: 0,
  count12m: 0,
  count2m: 0,
}

/** 优先 2m+1.2m 方案，否则 1m+1.2m 方案；无法整除时各数量为 0 */
export function getTrussCounts(z: number): TrussCounts {
  const solution = getMaxSolution(z)
  if (solution) {
    return {
      count1m: 0,
      count12m: solution.y,
      count2m: solution.x,
    }
  }

  const deprecated = getMaxSolutionDeprecated(z)
  if (deprecated) {
    return {
      count1m: deprecated.x,
      count12m: deprecated.y,
      count2m: 0,
    }
  }

  return EMPTY_TRUSS_COUNTS
}

function formatTrussCounts({ count1m, count12m, count2m }: TrussCounts): string {
  const parts: string[] = []
  if (count2m > 0) parts.push(`${count2m}组2m`)
  if (count12m > 0) parts.push(`${count12m}组1.2m`)
  if (count1m > 0) parts.push(`${count1m}组1m`)
  return parts.length > 0 ? parts.join(' + ') : '无正整数解'
}

export function formatTrussSolution(z: number): string {
  return formatTrussCounts(getTrussCounts(z))
}