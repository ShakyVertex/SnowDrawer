import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ConstructionProcessPage from './pages/ConstructionProcessPage'
import HomePage from './pages/HomePage'
import MaterialListPage from './pages/MaterialListPage'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/construction" element={<ConstructionProcessPage />} />
        <Route path="/materials" element={<MaterialListPage />} />
      </Routes>
    </BrowserRouter>
  )
}
