import { motion, useMotionValue, useDragControls } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

// A dragged window must always leave this much of itself on screen.
const KEEP_VISIBLE = 120
// Bottom limit for the title bar so it never hides behind the dock.
const DOCK_CLEARANCE = 120

// A maximized window leaves this strip free for the dock.
const MAXIMIZED_BOTTOM_GAP = 96

// While a window is dragged or resized, embedded PDFs/iframes must not capture
// the pointer (they would swallow the move events). CSS keys off this class.
const setInteracting = (on) => document.documentElement.classList.toggle('is-interacting', on)

function Window({
  id, title, position, size, zIndex, minimized, maximized,
  onClose, onFocus, onMinimize, onToggleMaximize, onUpdatePosition, onUpdateSize,
  children,
}) {
  const x = useMotionValue(position.x)
  const y = useMotionValue(position.y)
  const dragControls = useDragControls()
  const [isHoveredButtons, setIsHoveredButtons] = useState(false)
  const rootRef = useRef(null)

  // Clicks inside an iframe never reach React, but the page loses focus to it.
  // Raise this window when focus moves into one of its iframes.
  useEffect(() => {
    const onBlur = () => {
      setTimeout(() => {
        const active = document.activeElement
        const isEmbed = active?.tagName === 'IFRAME' || active?.tagName === 'OBJECT'
        if (isEmbed && rootRef.current?.contains(active)) onFocus(id)
      }, 0)
    }
    window.addEventListener('blur', onBlur)
    return () => window.removeEventListener('blur', onBlur)
  }, [id, onFocus])

  // Keep the motion values in step with state: pinned to the corner while
  // maximized, back at the stored position otherwise.
  useEffect(() => {
    x.set(maximized ? 0 : position.x)
    y.set(maximized ? 0 : position.y)
  }, [maximized, position.x, position.y, x, y])

  return (
    <motion.div
      ref={rootRef}
      data-window
      role="dialog"
      aria-label={title}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={
        minimized
          ? { opacity: 0, scale: 0.85, transitionEnd: { display: 'none' } }
          : { opacity: 1, scale: 1, display: 'flex' }
      }
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      drag={!maximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{
        left: -(size.width - KEEP_VISIBLE),
        right: window.innerWidth - KEEP_VISIBLE,
        top: 0,
        bottom: window.innerHeight - DOCK_CLEARANCE,
      }}
      onDragStart={() => setInteracting(true)}
      onDragEnd={() => {
        setInteracting(false)
        onUpdatePosition(id, { x: x.get(), y: y.get() })
      }}
      onPointerDownCapture={() => onFocus(id)}
      style={{
        x, y,
        width: maximized ? '100%' : size.width,
        height: maximized ? `calc(100% - ${MAXIMIZED_BOTTOM_GAP}px)` : size.height,
        zIndex,
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      className="glass-heavy rounded-xl window-shadow flex flex-col overflow-hidden"
    >
      {/* Title bar */}
      <div
        onPointerDown={(e) => { if (!maximized) dragControls.start(e) }}
        onDoubleClick={() => onToggleMaximize(id)}
        className={`h-11 flex items-center px-3 shrink-0 ${maximized ? '' : 'cursor-grab active:cursor-grabbing'} select-none border-b border-white/[0.06] relative`}
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 100%)',
        }}
      >
        {/* Traffic light buttons */}
        <div
          className="flex items-center gap-2 z-10"
          onPointerDown={e => e.stopPropagation()}
          onDoubleClick={e => e.stopPropagation()}
          onMouseEnter={() => setIsHoveredButtons(true)}
          onMouseLeave={() => setIsHoveredButtons(false)}
        >
          <button
            onMouseDown={e => e.stopPropagation()}
            onClick={() => onClose(id)}
            aria-label={`Close ${title}`}
            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all cursor-default flex items-center justify-center"
          >
            {isHoveredButtons && (
              <svg width="6" height="6" viewBox="0 0 6 6" className="text-[#4a0002]">
                <path d="M0.5 0.5L5.5 5.5M5.5 0.5L0.5 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
          <button
            onClick={() => onMinimize(id)}
            aria-label={`Minimize ${title}`}
            className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 transition-all cursor-default flex items-center justify-center"
          >
            {isHoveredButtons && (
              <svg width="6" height="2" viewBox="0 0 6 2" className="text-[#995700]">
                <path d="M0.5 1H5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
          <button
            onClick={() => onToggleMaximize(id)}
            aria-label={`${maximized ? 'Restore' : 'Maximize'} ${title}`}
            className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110 transition-all cursor-default flex items-center justify-center"
          >
            {isHoveredButtons && (
              <svg width="6" height="6" viewBox="0 0 6 6" className="text-[#006500]">
                {maximized ? (
                  <path d="M2.2 0.8V2.2H0.8M3.8 5.2V3.8H5.2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                ) : (
                  <path d="M0.8 5.2L5.2 0.8M2.6 0.8H5.2V3.4M3.4 5.2H0.8V2.6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                )}
              </svg>
            )}
          </button>
        </div>

        {/* Centered title */}
        <span className="absolute inset-0 flex items-center justify-center text-[11px] text-zinc-400 font-medium pointer-events-none">
          {title}
        </span>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-auto p-4 text-zinc-200 select-text">
        {children}
      </div>

      {/* Resize handle (not while maximized) */}
      {!maximized && (
      <div
        className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize group"
        onPointerDown={(e) => {
          e.stopPropagation()
          e.preventDefault()

          // Capture pointer for reliable tracking even outside window
          e.target.setPointerCapture(e.pointerId)
          setInteracting(true)

          const startX = e.clientX
          const startY = e.clientY
          const startW = size.width
          const startH = size.height

          const onMove = (ev) => {
            const newW = Math.max(320, startW + (ev.clientX - startX))
            const newH = Math.max(240, startH + (ev.clientY - startY))
            onUpdateSize(id, { width: newW, height: newH })
          }

          const onUp = (ev) => {
            ev.target.releasePointerCapture(ev.pointerId)
            setInteracting(false)
            window.removeEventListener('pointermove', onMove)
            window.removeEventListener('pointerup', onUp)
          }

          window.addEventListener('pointermove', onMove)
          window.addEventListener('pointerup', onUp)
        }}
      >
        {/* Grip dots */}
        <svg className="absolute bottom-1 right-1 text-zinc-600 opacity-40 group-hover:opacity-70 transition-opacity" width="10" height="10" viewBox="0 0 10 10">
          <circle cx="7" cy="7" r="1" fill="currentColor"/>
          <circle cx="4" cy="7" r="1" fill="currentColor"/>
          <circle cx="7" cy="4" r="1" fill="currentColor"/>
          <circle cx="1" cy="7" r="1" fill="currentColor"/>
          <circle cx="4" cy="4" r="1" fill="currentColor"/>
          <circle cx="7" cy="1" r="1" fill="currentColor"/>
        </svg>
      </div>
      )}
    </motion.div>
  )
}

export default Window