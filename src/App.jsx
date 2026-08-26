import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import MLoader from './components/MLoader'

const Home = lazy(() => import('./pages/Home'))

const App = () => {
  const [loading, setLoading] = useState(true)

  const handleLoaderComplete = useCallback(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <BrowserRouter basename="/Markcoders">
      {loading && <MLoader duration={2.8} onComplete={handleLoaderComplete} />}
      <Suspense fallback={null}>
        <div
          aria-hidden={loading}
          style={{
            opacity: loading ? 0 : 1,
            transition: 'opacity 0.45s ease',
            pointerEvents: loading ? 'none' : 'auto',
          }}
        >
          <Home />
        </div>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
