import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import HomePage from './pages/HomePage'
import AnthemPage from './pages/AnthemPage'
import GroundFloorPage from './pages/GroundFloorPage'
import WomensCollectivePage from './pages/WomensCollectivePage'
import Cellar54Page from './pages/Cellar54Page'
import FaqPage from './pages/FaqPage'
import LeasingPage from './pages/LeasingPage'
import DirectoryPage from './pages/DirectoryPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminWelcomePage from './pages/AdminWelcomePage'
import InformationPage from './pages/InformationPage'

function ScrollHandler() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100)
      }
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollHandler />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/anthem" element={<AnthemPage />} />
        <Route path="/ground-floor" element={<GroundFloorPage />} />
        <Route path="/womens-collective" element={<WomensCollectivePage />} />
        <Route path="/cellar-54" element={<Cellar54Page />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/leasing" element={<LeasingPage />} />
        <Route path="/directory" element={<DirectoryPage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/welcome" element={<AdminWelcomePage />} />
        <Route path="/information" element={<InformationPage />} />
      </Routes>
    </BrowserRouter>
  )
}
