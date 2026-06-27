import { EQUIPMENT_ROOM_COLOR, FRAME_COLOR, OUTER_FRAME_COLOR } from '../constants'
import { NonNegativeIntInput } from './NonNegativeIntInput'
import { calculateFence, EMPTY_FENCE_SOLUTION, formatFenceCount } from '../utils/fenceSolution'

type ParameterPanelProps = {
  x: number
  y: number
  u: number
  t: number
  m: number
  n: number
  isPreviewing?: boolean
  annotateMode: boolean
  annotateStep: 0 | 1
  markedCount: number
  onXChange: (value: number) => void
  onYChange: (value: number) => void
  onUChange: (value: number) => void
  onTChange: (value: number) => void
  onAnnotateToggle: () => void
  onReset: () => void
}

export function ParameterPanel({
  x,
  y,
  u,
  t,
  m,
  n,
  isPreviewing = false,
  annotateMode,
  annotateStep,
  onXChange,
  onYChange,
  onUChange,
  onTChange,
  onAnnotateToggle,
  onReset,
}: ParameterPanelProps) {
  const horizontalSolution = calculateFence(x + 0.6) ?? EMPTY_FENCE_SOLUTION
  const verticalSolution = calculateFence(y + 0.6) ?? EMPTY_FENCE_SOLUTION
  const totalPost = horizontalSolution.postCount * 2 + verticalSolution.postCount * 2 - 4
  const deviceRoomTruss = u * 4 + t * 4 + (u + t) * 2
  const doorTruss40cm = 40
  const doorTruss80cm = 16
  const doorTruss200cm = 12
  const truss40cm = horizontalSolution.counts.count40cm * 4 + verticalSolution.counts.count40cm * 4 + doorTruss40cm
  const truss50cm = horizontalSolution.counts.count50cm * 4 + verticalSolution.counts.count50cm * 4
  const truss80cm = horizontalSolution.counts.count80cm * 4 + verticalSolution.counts.count80cm * 4 + doorTruss80cm
  const truss100cm = horizontalSolution.counts.count100cm * 4 + verticalSolution.counts.count100cm * 4
  const truss120cm = horizontalSolution.counts.count120cm * 4 + verticalSolution.counts.count120cm * 4 + totalPost
  const truss150cm = horizontalSolution.counts.count150cm * 4 + verticalSolution.counts.count150cm * 4
  const truss200cm = horizontalSolution.counts.count200cm * 4 + verticalSolution.counts.count200cm * 4 + deviceRoomTruss + doorTruss200cm
  
  return (
    <aside className="parameter-panel">
      <label className="field">
        <span className="field-label">模块</span>
        <div className="field-row">
          <NonNegativeIntInput value={x} onChange={onXChange} />
          <span className="field-op" aria-hidden="true">
            ×
          </span>
          <NonNegativeIntInput value={y} onChange={onYChange} />
        </div>
      </label>

      <label className="field">
        <span className="field-label">设备房桁架</span>
        <div className="field-row">
          <NonNegativeIntInput value={u} onChange={onUChange} />
          <span className="field-op" aria-hidden="true">
            ×
          </span>
          <NonNegativeIntInput value={t} onChange={onTChange} />
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
            : '移动鼠标预览范围，点击右下角确认'}
        </p>
      )}

      <dl className="stats">
        <div>
          <dt title="尺寸：100cm*100cm*25cm">模块</dt>
          <dd>{x * y} 个</dd>
        </div>
        <div>
          <dt>水箱</dt>
          <dd className={isPreviewing ? 'stats-preview' : undefined}>
            {m} × {n} = {m * n}
          </dd>
        </div>
        <div>
          <dt>水重</dt>
          <dd>
            {(m * n * 0.37).toFixed(1)} 吨
          </dd>
        </div>
        <div>
          <dt title="尺寸：50cm*50cm*3cm">格网</dt>
          <dd>{m * n * 4 * 4 + x * y * 4} 块</dd>
        </div>
        <div>
          <dt style={{ color: FRAME_COLOR }} title="尺寸：60cm*180cm*3cm">泡沫板（3cm）</dt>
          <dd>{Math.ceil(x / 0.6) * Math.ceil(y / 1.8) * 4 - Math.floor(m / 0.6) * Math.floor(n / 1.8) * 3} 块</dd>
        </div>
        <div>
          <dt style={{ color: FRAME_COLOR }} title="尺寸：60cm*180cm*5cm">泡沫板（5cm）</dt>
          <dd>{Math.ceil(x / 0.6) * Math.ceil(y / 1.8) + Math.ceil(((x + 0.2) * 2 + (y + 0.2) * 2) / 1.8)} 块</dd>
        </div>
        <div>
          <dt style={{ color: OUTER_FRAME_COLOR }} title="长度：0.2m 0.5m 0.8m 1m 1.2m 1.5m 2m">桁架尺寸</dt>
          <dd>
            {x + 0.6} m × {y + 0.6} m
          </dd>
        </div>
        <div>
          <dt style={{ color: OUTER_FRAME_COLOR }}>水平方案</dt>
          <dd>
            {formatFenceCount(horizontalSolution)}
          </dd>
        </div>
        <div>
          <dt style={{ color: OUTER_FRAME_COLOR }}>垂直方案</dt>
          <dd>
            {formatFenceCount(verticalSolution)}
          </dd>
        </div>
        <div>
          <dt style={{ color: OUTER_FRAME_COLOR }}>桁架（0.4m）</dt>
          <dd>
            {truss40cm} 根
          </dd>
        </div>
        <div>
          <dt style={{ color: OUTER_FRAME_COLOR }}>桁架（0.5m）</dt>
          <dd>
            {truss50cm} 根
          </dd>
        </div>
        <div>
          <dt style={{ color: OUTER_FRAME_COLOR }}>桁架（0.8m）</dt>
          <dd>
            {truss80cm} 根
          </dd>
        </div>
        <div>
          <dt style={{ color: OUTER_FRAME_COLOR }}>桁架（1m）</dt>
          <dd>
            {truss100cm} 根
          </dd>
        </div>
        <div>
          <dt style={{ color: OUTER_FRAME_COLOR }}>桁架（1.2m）</dt>
          <dd>
            {truss120cm} 根
          </dd>
        </div>
        <div>
          <dt style={{ color: OUTER_FRAME_COLOR }}>桁架（1.5m）</dt>
          <dd>
            {truss150cm} 根
          </dd>
        </div>
        <div>
          <dt style={{ color: OUTER_FRAME_COLOR }} >桁架（2m）</dt>
          <dd>
            {truss200cm} 根
          </dd>
        </div>
        <div>
          <dt style={{ color: EQUIPMENT_ROOM_COLOR }}>设备房尺寸</dt>
          <dd>
            {u * 2 + 0.2 * (u + 1)} m × {t * 2 + 0.2 * (t + 1)} m
          </dd>
        </div>
        <div>
          <dt style={{ color: EQUIPMENT_ROOM_COLOR }}>设备房面积</dt>
          <dd>
            {((u * 2 + 0.2 * (u + 1)) * (t * 2 + 0.2 * (t + 1))).toFixed(2)} 平方米
          </dd>
        </div>
        <div>
          <dt style={{ color: EQUIPMENT_ROOM_COLOR }}>戏雪区面积</dt>
          <dd>
            {((x + 0.6) * (y + 0.6)).toFixed(2)} 平方米
          </dd>
        </div>
      </dl>
    </aside>
  )
}
