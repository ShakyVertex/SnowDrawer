import type { ReactNode } from 'react'

type PopOutPanelProps = {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function PopOutPanel({ open, onClose, title, children }: PopOutPanelProps) {
  if (!open) return null

  const titleId = 'popout-panel-title'

  return (
    <div
      className="popout-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="popout-panel">
        <button
          type="button"
          className="popout-close"
          onClick={onClose}
          aria-label="关闭"
        >
          ×
        </button>
        <h2 id={titleId} className="popout-title">
          {title}
        </h2>
        <div className="popout-body">{children}</div>
      </div>
    </div>
  )
}
