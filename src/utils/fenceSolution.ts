export type FenceCounts = {
  count40cm: number
  count50cm: number
  count80cm: number
  count100cm: number
  count120cm: number
  count150cm: number
  count200cm: number
}

export type FenceSolution = {
  counts: FenceCounts
  postCount: number
}

const EMPTY_FENCE_COUNTS: FenceCounts = {
  count40cm: 0,
  count50cm: 0,
  count80cm: 0,
  count100cm: 0,
  count120cm: 0,
  count150cm: 0,
  count200cm: 0,
}

// 栏杆长度（米）与计数键，优先级从长到短
const BAR_MAP: [number, keyof FenceCounts][] = [
  [2.0, 'count200cm'],
  [1.5, 'count150cm'],
  [1.2, 'count120cm'],
  [1.0, 'count100cm'],
  [0.8, 'count80cm'],
  [0.5, 'count50cm'],
  [0.4, 'count40cm'],
]

const POST_LEN_TENTHS = 2 // 桩 0.2m
const MIN_BAR_TENTHS = 4 // 最短栏杆 0.4m
const MAX_BAR_TENTHS = 20 // 最长栏杆 2.0m

function toTenths(meters: number): number {
  return Math.round(meters * 10)
}

const BAR_KEYS_LONG_TO_SHORT: (keyof FenceCounts)[] = [
  'count200cm',
  'count150cm',
  'count120cm',
  'count100cm',
  'count80cm',
  'count50cm',
  'count40cm',
]

function prefersLongerBars(a: FenceCounts, b: FenceCounts): boolean {
  for (const key of BAR_KEYS_LONG_TO_SHORT) {
    if (a[key] > b[key]) return true
    if (a[key] < b[key]) return false
  }
  return false
}

function barCountOf(counts: FenceCounts): number {
  return BAR_KEYS_LONG_TO_SHORT.reduce((sum, key) => sum + counts[key], 0)
}

function toFenceSolution(counts: FenceCounts): FenceSolution {
  const barCount = barCountOf(counts)
  return { counts, postCount: barCount + 1 }
}

/**
 * 在固定栏杆数量下，用回溯搜索总长恰好为 targetTenths 的组合；
 * 同长度规格内优先使用更多长杆。
 */
function findBarCombination(
  targetTenths: number,
  barCount: number,
): FenceCounts | null {
  const counts = { ...EMPTY_FENCE_COUNTS }

  function search(
    barIndex: number,
    remainingBars: number,
    remainingTenths: number,
  ): boolean {
    if (remainingBars === 0) return remainingTenths === 0
    if (barIndex >= BAR_MAP.length) return false

    const minSum = remainingBars * MIN_BAR_TENTHS
    const maxSum = remainingBars * MAX_BAR_TENTHS
    if (remainingTenths < minSum || remainingTenths > maxSum) return false

    const [meters, key] = BAR_MAP[barIndex]
    const barTenths = toTenths(meters)
    const maxUse = Math.min(remainingBars, Math.floor(remainingTenths / barTenths))

    for (let use = maxUse; use >= 0; use--) {
      counts[key] = use
      if (
        search(
          barIndex + 1,
          remainingBars - use,
          remainingTenths - use * barTenths,
        )
      ) {
        return true
      }
    }

    counts[key] = 0
    return false
  }

  return search(0, barCount, targetTenths) ? counts : null
}

/**
 * 计算最优围栏排布：在所有可行解中优先使用更多长栏杆（2m > 1.5m > … > 0.4m）
 * @param totalLength 总长度(米)
 * @returns 栏杆排布及桩数量，无解时返回 null
 */
export function calculateFence(totalLength: number): FenceSolution | null {
  const totalTenths = toTenths(totalLength)
  const maxPossibleBars = Math.max(
    Math.floor((totalTenths - POST_LEN_TENTHS * 2) / (MIN_BAR_TENTHS + POST_LEN_TENTHS)),
    1,
  )

  let best: FenceSolution | null = null

  for (let barCount = 1; barCount <= maxPossibleBars; barCount++) {
    const barAvailableTenths =
      totalTenths - POST_LEN_TENTHS * (barCount + 1)
    if (barAvailableTenths <= 0) continue

    const result = findBarCombination(barAvailableTenths, barCount)
    if (result && (!best || prefersLongerBars(result, best.counts))) {
      best = toFenceSolution(result)
    }
  }

  return best
}

export function formatFenceCount(solution: FenceSolution | null): string {
  if (!solution) return '无正整数解'
  const { counts, postCount } = solution
  const parts: string[] = []
  if (counts.count200cm > 0) parts.push(`${counts.count200cm}组2m`)
  if (counts.count150cm > 0) parts.push(`${counts.count150cm}组1.5m`)
  if (counts.count120cm > 0) parts.push(`${counts.count120cm}组1.2m`)
  if (counts.count100cm > 0) parts.push(`${counts.count100cm}组1m`)
  if (counts.count80cm > 0) parts.push(`${counts.count80cm}组0.8m`)
  if (counts.count50cm > 0) parts.push(`${counts.count50cm}组0.5m`)
  if (counts.count40cm > 0) parts.push(`${counts.count40cm}组0.4m`)
  return parts.length > 1 ? parts.join('+') : '无正整数解'
}
