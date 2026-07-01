import { EQUIPMENT_ROOM_COLOR, FRAME_COLOR, OUTER_FRAME_COLOR } from '../constants'
import { NonNegativeIntInput } from './NonNegativeIntInput'

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
  const deviceRoomTruss200cm = u * 4 + t * 4 + (u + t) * 2
  const horizontal = x + 0.8
  const vertical = y + 0.8
  const horizontalStructure = Math.floor((horizontal - 0.2) / 1.4)
  const verticalStructure = Math.floor((vertical - 0.2) / 1.4)
  const horizontalRemain = Math.floor((horizontal - 0.2) % 1.4 / 0.2)
  const verticalRemain = Math.floor((vertical - 0.2) % 1.4 / 0.2)
  const nutBolts = (horizontalStructure + verticalStructure) * 2 * 16 + (horizontalRemain + verticalRemain) * 2 * 8 + (u + t) * 16 * 2
  const playgroundTruss120cm = (horizontalStructure + verticalStructure) * 3 * 2 + (horizontalRemain + verticalRemain) * 2 - 4
  

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
            {horizontal} m × {vertical} m
          </dd>
        </div>
        <div>
          <dt style={{ color: OUTER_FRAME_COLOR }}>水平方案</dt>
          <dd>
            {horizontalStructure} 匚 + {horizontalRemain} 补充柱
          </dd>
        </div>
        <div>
          <dt style={{ color: OUTER_FRAME_COLOR }}>垂直方案</dt>
          <dd>
            {verticalStructure} 匚 + {verticalRemain} 补充柱
          </dd>
        </div>
        <div>
          <dt style={{ color: OUTER_FRAME_COLOR }}>桁架（1.2m）</dt>
          <dd>{playgroundTruss120cm} 根</dd>
        </div>
        <div>
          <dt style={{ color: OUTER_FRAME_COLOR }}>桁架（2m）</dt>
          <dd>{deviceRoomTruss200cm} 根</dd>
        </div>
        <div>
          <dt style={{ color: OUTER_FRAME_COLOR }}>螺栓螺母</dt>
          <dd>{nutBolts} 个</dd>
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
            {(horizontal * vertical).toFixed(2)} 平方米
          </dd>
        </div>
      </dl>
    </aside>
  )
}
