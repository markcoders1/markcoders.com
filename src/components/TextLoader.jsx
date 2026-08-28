import { useEffect, useRef, useState } from 'react'
import './TextLoader.css'

export default function TextLoader({ duration = 3, onComplete }) {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)
  const startRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const tick = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp
      const elapsed = (timestamp - startRef.current) / 1000
      const pct = Math.min(elapsed / duration, 1)

      setProgress(pct * 100)

      if (pct < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        // Loading complete — begin exit
        setExiting(true)
        setTimeout(() => {
          onComplete?.()
        }, 600) // matches CSS transition duration
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [duration, onComplete])

  return (
    <div className={`text-loader-overlay ${exiting ? 'is-exiting' : ''}`}>
      {/* Glow behind text */}
      <div className="text-loader-glow" />

      {/* Animated gradient text */}
      <div className="text-loader-text">MarkCoders/&gt;</div>

      {/* Progress bar at bottom */}
      <div className="text-loader-progress-track">
        <div
          className="text-loader-progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
