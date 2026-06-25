import { SQUARE_GAP, SQUARE_SIZE } from '../constants'
import { getCanvasSize, getPurpleFrameSize, getRedFrameSize, getGridSize } from '../utils/gridLayout'

type ParameterPanelProps = {
  x: number
  y: number
  annotateMode: boolean
  annotateStep: 0 | 1
  markedCount: number
  onXChange: (value: number) => void
  onYChange: (value: number) => void
  onAnnotateToggle: () => void
  onReset: () => void
}

function parsePositiveInt(value: string): number {
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}

export function ParameterPanel({
  x,
  y,
  annotateMode,
  annotateStep,
  markedCount,
  onXChange,
  onYChange,
  onAnnotateToggle,
  onReset,
}: ParameterPanelProps) {
  const gridWidth = getGridSize(x)
  const gridHeight = getGridSize(y)
  const canvasWidth = getCanvasSize(gridWidth)
  const canvasHeight = getCanvasSize(gridHeight)
  const frameWidth = getPurpleFrameSize(gridWidth)
  const frameHeight = getPurpleFrameSize(gridHeight)
  const redFrameWidth = getRedFrameSize(gridWidth)
  const redFrameHeight = getRedFrameSize(gridHeight)

  return (
    <aside className="parameter-panel">
      <label className="field">
        <span className="field-label">列数（水平方向）</span>
        <input
          type="number"
          min={1}
          step={1}
          value={x}
          onChange={(e) => onXChange(parsePositiveInt(e.target.value))}
        />
      </label>

      <label className="field">
        <span className="field-label">行数（垂直方向）</span>
        <input
          type="number"
          min={1}
          step={1}
          value={y}
          onChange={(e) => onYChange(parsePositiveInt(e.target.value))}
        />
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
          <dt>方块总数</dt>
          <dd>{x * y}</dd>
        </div>
        <div>
          <dt>已标注</dt>
          <dd>{markedCount}</dd>
        </div>
        <div>
          <dt>方块边长</dt>
          <dd>{SQUARE_SIZE}px</dd>
        </div>
        <div>
          <dt>方块间距</dt>
          <dd>{SQUARE_GAP}px</dd>
        </div>
        <div>
          <dt>紫色框尺寸</dt>
          <dd>
            {frameWidth} × {frameHeight} px
          </dd>
        </div>
        <div>
          <dt>红色框尺寸</dt>
          <dd>
            {redFrameWidth} × {redFrameHeight} px
          </dd>
        </div>
        <div>
          <dt>画布尺寸</dt>
          <dd>
            {canvasWidth} × {canvasHeight} px
          </dd>
        </div>
      </dl>
    </aside>
  )
}
