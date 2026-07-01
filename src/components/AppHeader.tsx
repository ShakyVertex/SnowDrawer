import { Link } from 'react-router-dom'

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="app-header-main">
        <Link to="/" className="app-header-brand">
          <h1>欢雪奇遇 WEB SUPPORT</h1>
          <p>系统问题联系微信: lkn_cintaiuo</p>
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
