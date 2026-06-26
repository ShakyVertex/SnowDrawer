import { FRAME_COLOR, OUTER_FRAME_COLOR } from '../constants'
import { getMaxSolution, getMaxSolutionDeprecated } from '../utils/trussSolution'

type ParameterPanelProps = {
  x: number
  y: number
  m: number
  n: number
  annotateMode: boolean
  annotateStep: 0 | 1
  markedCount: number
  onXChange: (value: number) => void
  onYChange: (value: number) => void
  onAnnotateToggle: () => void
  onReset: () => void
}

function parseNonNegativeInt(value: string): number {
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0
}

export function ParameterPanel({
  x,
  y,
  m,
  n,
  annotateMode,
  annotateStep,
  onXChange,
  onYChange,
  onAnnotateToggle,
  onReset,
}: ParameterPanelProps) {
  const trussX = x + 0.8
  const trussY = y + 0.4
  const trussSolutionX = getMaxSolution(trussX)
  const trussSolutionY = getMaxSolution(trussY)
  const trussSolutionXDeprecated = getMaxSolutionDeprecated(trussX)
  const trussSolutionYDeprecated = getMaxSolutionDeprecated(trussY)

  return (
    <aside className="parameter-panel">
      <label className="field">
        <span className="field-label">模块</span>
        <div className="field-row">
          <input
            type="number"
            min={0}
            step={1}
            value={x}
            onChange={(e) => onXChange(parseNonNegativeInt(e.target.value))}
          />
          <span className="field-op" aria-hidden="true">
            ×
          </span>
          <input
            type="number"
            min={0}
            step={1}
            value={y}
            onChange={(e) => onYChange(parseNonNegativeInt(e.target.value))}
          />
        </div>
      </label>

      <div className="panel-actions">
        <button
          type="button"
          className={`btn btn-primary${annotateMode ? ' btn-active' : ''}`}
          onClick={onAnnotateToggle}
        >
          标注
        </button>
        <button type="button" className="btn btn-secondary" onClick={onReset}>
          重置
        </button>
      </div>

      {annotateMode && (
        <p className="annotate-hint">
          {annotateStep === 0
            ? '请点击左上角区域的方块'
            : '请点击右下角区域的方块'}
        </p>
      )}

      <dl className="stats">
        <div>
          <dt>模块</dt>
          <dd>{x * y}</dd>
        </div>
        <div>
          <dt>水箱</dt>
          <dd>
            {m} × {n} = {m * n}
          </dd>
        </div>
        <div>
          <dt>水重</dt>
          <dd>
            {m * n * 0.37} 吨
          </dd>
        </div>
        <div>
          <dt>格网</dt>
          <dd>{m * n * 4 * 4 + x * y * 4}</dd>
        </div>
        <div>
          <dt style={{ color: FRAME_COLOR }}>5cm泡沫板</dt>
          <dd>{Math.ceil(x / 0.6) * Math.ceil(y / 1.8) + Math.ceil(((x + 0.2) * 2 + (y + 0.2) * 2) / 1.8)}</dd>
        </div>
        <div>
          <dt style={{ color: FRAME_COLOR }}>3cm泡沫板</dt>
          <dd>{Math.ceil(x / 0.6) * Math.ceil(y / 1.8) * 4 - Math.floor(m / 0.6) * Math.floor(n / 1.8) * 3}</dd>
        </div>
        <div>
          <dt style={{ color: OUTER_FRAME_COLOR }}>桁架尺寸</dt>
          <dd>
            {x + 0.6} m × {y + 0.6} m
          </dd>
        </div>
        <div>
          <dt style={{ color: OUTER_FRAME_COLOR }}>水平方案</dt>
          <dd>
            {trussSolutionX
              ? `${trussSolutionX.x}组2m + ${trussSolutionX.y}组1.2m`
              : trussSolutionXDeprecated
                ? `${trussSolutionXDeprecated.x}组1m + ${trussSolutionXDeprecated.y}组1.2m`
                : '无正整数解'}
          </dd>
        </div>
        <div>
          <dt style={{ color: OUTER_FRAME_COLOR }}>垂直方案</dt>
          <dd>
            {trussSolutionY
              ? `${trussSolutionY.x}组2m + ${trussSolutionY.y}组1.2m`
              : trussSolutionYDeprecated
                ? `${trussSolutionYDeprecated.x}组1m + ${trussSolutionYDeprecated.y}组1.2m`
                : '无正整数解'}
          </dd>
        </div>
      </dl>
    </aside>
  )
}
