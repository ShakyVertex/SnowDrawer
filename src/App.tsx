import { useCallback, useState } from 'react'
import { GridCanvas } from './components/GridCanvas'
import { ParameterPanel } from './components/ParameterPanel'
import { cellKey, getRegionCells, type Cell } from './utils/cellSelection'
import './App.css'

function App() {
  const [x, setX] = useState(8)
  const [y, setY] = useState(6)
  const [annotateMode, setAnnotateMode] = useState(false)
  const [pendingCell, setPendingCell] = useState<Cell | null>(null)
  const [markedCells, setMarkedCells] = useState<Set<string>>(() => new Set())

  const handleDimensionChange = useCallback(
    (setter: (value: number) => void) => (value: number) => {
      setter(value)
      setMarkedCells(new Set())
      setPendingCell(null)
    },
    [],
  )

  const handleAnnotateToggle = () => {
    setAnnotateMode((prev) => {
      if (prev) setPendingCell(null)
      return !prev
    })
  }

  const handleReset = () => {
    setMarkedCells(new Set())
    setPendingCell(null)
    setAnnotateMode(false)
  }

  const handleCellClick = (cell: Cell) => {
    if (!pendingCell) {
      setPendingCell(cell)
      return
    }

    const region = getRegionCells(pendingCell, cell)
    setMarkedCells((prev) => {
      const next = new Set(prev)
      for (const { col, row } of region) {
        next.add(cellKey(col, row))
      }
      return next
    })
    setPendingCell(null)
    setAnnotateMode(false)
  }

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
            markedCells={markedCells}
            onCellClick={handleCellClick}
          />
        </section>
        <ParameterPanel
          x={x}
          y={y}
          annotateMode={annotateMode}
          annotateStep={pendingCell ? 1 : 0}
          markedCount={markedCells.size}
          onXChange={handleDimensionChange(setX)}
          onYChange={handleDimensionChange(setY)}
          onAnnotateToggle={handleAnnotateToggle}
          onReset={handleReset}
        />
      </main>
    </div>
  )
}

export default App
