import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MaterialListPage from './pages/MaterialListPage'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/materials" element={<MaterialListPage />} />
      </Routes>
    </BrowserRouter>
  )
}
