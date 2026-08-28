import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MLoader from './components/MLoader'

gsap.registerPlugin(ScrollTrigger)
import { BrowserRouter } from 'react-router-dom'
import TextLoader from './components/TextLoader'

const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))

function ScrollRefresh() {
  const location = useLocation()

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh(true)
    requestAnimationFrame(refresh)
    const t = window.setTimeout(refresh, 300)
    return () => window.clearTimeout(t)
  }, [location.pathname])

  return null
}

const App = () => {
  const [loading, setLoading] = useState(true)

  const handleLoaderComplete = useCallback(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    if (!loading) {
      const t = window.setTimeout(() => ScrollTrigger.refresh(true), 500)
      return () => {
        document.body.style.overflow = ''
        window.clearTimeout(t)
      }
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <BrowserRouter basename="/Markcoders">
      <ScrollRefresh />
      {loading && <MLoader duration={2.8} onComplete={handleLoaderComplete} />}
      <BrowserRouter>
        {loading && <TextLoader duration={3} onComplete={handleLoaderComplete} />}
        <Suspense fallback={null}>
          <div
            aria-hidden={loading}
            style={{
              opacity: loading ? 0 : 1,
              transition: 'opacity 0.5s ease',
              pointerEvents: loading ? 'none' : 'auto',
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/project" element={<Projects />} />
            </Routes>
          </div>
        </Suspense>
      </BrowserRouter>
      )
}

      export default App


