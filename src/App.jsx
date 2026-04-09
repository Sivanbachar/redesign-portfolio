import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav.jsx'
import Loader from './components/Loader.jsx'
import CaseStudyOutline from './components/CaseStudyOutline.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Hotspots from './pages/cases/Hotspots.jsx'
import BookPins from './pages/cases/BookPins.jsx'
import Rokt from './pages/cases/Rokt.jsx'
import SwiftShift from './pages/cases/SwiftShift.jsx'
import AI from './pages/AI.jsx'
import InterviewMe from './pages/InterviewMe.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <Loader />
      <ScrollToTop />
      <Nav />
      <CaseStudyOutline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects/hotspots" element={<Hotspots />} />
        <Route path="/projects/bookpins" element={<BookPins />} />
        <Route path="/projects/rokt" element={<Rokt />} />
        <Route path="/projects/swiftshift" element={<SwiftShift />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/interview" element={<InterviewMe />} />
        {/* Catch-all: redirect to home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}
