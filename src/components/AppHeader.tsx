import { Link } from 'react-router-dom'

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="app-header-main">
        <Link to="/" className="app-header-brand">
          <h1>SnowDrawer</h1>
          <p>欢雪奇遇场地绘制系统</p>
        </Link>
      </div>
      <div className="app-header-actions">
        <Link to="/materials" className="btn-header">
          物料清单
        </Link>
      </div>
    </header>
  )
}
