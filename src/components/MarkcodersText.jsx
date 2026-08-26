import { useRef } from 'react'
import './MarkcodersText.css'

/**
 * Mouse spotlight reveal — blue fill only under the cursor
 */
export default function MarkcodersText() {
  const textRef = useRef(null)

  const handleMouseMove = (e) => {
    const el = textRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    el.style.setProperty('--mouse-x', `${x}px`)
    el.style.setProperty('--mouse-y', `${y}px`)
  }

  const handleMouseLeave = () => {
    const el = textRef.current
    if (!el) return

    el.style.setProperty('--mouse-x', '-9999px')
    el.style.setProperty('--mouse-y', '-9999px')
  }

  return (
    <div
      ref={textRef}
      className="markcoders-wrap markcoders-wrap--footer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="MarkCoders"
    >
      <div className="markcoders-stack" aria-hidden="true">
        <div className="markcoders-brand">MarkCoders</div>
      </div>

      <div className="markcoders-reveal markcoders-reveal--blue" aria-hidden="true">
        <div className="markcoders-stack">
          <div className="markcoders-brand markcoders-fill--blue">MarkCoders</div>
        </div>
      </div>
    </div>
  )
}
