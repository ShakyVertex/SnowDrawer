import { useCallback, useMemo, useState } from 'react'
import { GridCanvas } from './components/GridCanvas'
import { ParameterPanel } from './components/ParameterPanel'
import { cellKey, getRegionCells, getTankDimensions, type Cell } from './utils/cellSelection'
import './App.css'

function App() {
  const [x, setX] = useState(8)
  const [y, setY] = useState(6)
  const [u, setU] = useState(0)
  const [t, setT] = useState(0)
  const [m, setM] = useState(0)
  const [n, setN] = useState(0)
  const [annotateMode, setAnnotateMode] = useState(false)
  const [pendingCell, setPendingCell] = useState<Cell | null>(null)
  const [previewCell, setPreviewCell] = useState<Cell | null>(null)
  const [markedCells, setMarkedCells] = useState<Set<string>>(() => new Set())

  const clearMarks = useCallback(() => {
    setMarkedCells(new Set())
    setPendingCell(null)
    setPreviewCell(null)
    setM(0)
    setN(0)
  }, [])

  const handleDimensionChange = useCallback(
    (setter: (value: number) => void) => (value: number) => {
      setter(value)
      clearMarks()
    },
    [clearMarks],
  )

  const handleAnnotateToggle = () => {
    setAnnotateMode((prev) => {
      if (prev) {
        setPendingCell(null)
        setPreviewCell(null)
        return false
      }
      clearMarks()
      return true
    })
  }

  const handleReset = () => {
    clearMarks()
    setAnnotateMode(false)
  }

  const handleCellClick = (cell: Cell) => {
    if (!pendingCell) {
      setPendingCell(cell)
      setPreviewCell(cell)
      return
    }

    const region = getRegionCells(pendingCell, cell)
    const { m: nextM, n: nextN } = getTankDimensions(pendingCell, cell)

    setMarkedCells((prev) => {
      const next = new Set(prev)
      for (const { col, row } of region) {
        next.add(cellKey(col, row))
      }
      return next
    })
    setM(nextM)
    setN(nextN)
    setPendingCell(null)
    setPreviewCell(null)
    setAnnotateMode(false)
  }

  const displayTank = useMemo(() => {
    if (annotateMode && pendingCell) {
      if (previewCell) {
        return getTankDimensions(pendingCell, previewCell)
      }
      return { m: 1, n: 1 }
    }
    return { m, n }
  }, [annotateMode, pendingCell, previewCell, m, n])

  return (
    <div className="app">
      <header className="app-header">
        <h1>SnowDrawer</h1>
        <p>欢雪奇遇场地绘制系统</p>
      </header>

      <main className="workspace">
        <section className="canvas-area">
          <GridCanvas
            x={x}
            y={y}
            annotateMode={annotateMode}
            pendingCell={pendingCell}
            previewCell={previewCell}
            markedCells={markedCells}
            onCellClick={handleCellClick}
            onCellHover={setPreviewCell}
          />
        </section>
        <ParameterPanel
          x={x}
          y={y}
          u={u}
          t={t}
          m={displayTank.m}
          n={displayTank.n}
          isPreviewing={annotateMode && pendingCell !== null}
          annotateMode={annotateMode}
          annotateStep={pendingCell ? 1 : 0}
          markedCount={markedCells.size}
          onXChange={handleDimensionChange(setX)}
          onYChange={handleDimensionChange(setY)}
          onUChange={setU}
          onTChange={setT}
          onAnnotateToggle={handleAnnotateToggle}
          onReset={handleReset}
        />
      </main>
    </div>
  )
}

export default App
