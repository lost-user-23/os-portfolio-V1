import { motion, useMotionValue, useDragControls } from 'framer-motion'
import { useState } from 'react'

function Window({
  id, title, position, size, zIndex,
  onClose, onFocus, onUpdatePosition, onUpdateSize,
  children,
}) {
  const x = useMotionValue(position.x)
  const y = useMotionValue(position.y)
  const dragControls = useDragControls()
  const [isHoveredButtons, setIsHoveredButtons] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 8 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      onDragEnd={() => {
        onUpdatePosition(id, { x: x.get(), y: y.get() })
      }}
      onMouseDown={() => onFocus(id)}
      style={{
        x, y,
        width: size.width,
        height: size.height,
        zIndex,
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      className="glass-heavy rounded-xl window-shadow flex flex-col overflow-hidden"
    >
      {/* Title bar */}
      <div
        onPointerDown={(e) => dragControls.start(e)}
        className="h-11 flex items-center px-3 shrink-0 cursor-grab active:cursor-grabbing select-none border-b border-white/[0.06] relative"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 100%)',
        }}
      >
        {/* Traffic light buttons */}
        <div
          className="flex items-center gap-2 z-10"
          onMouseEnter={() => setIsHoveredButtons(true)}
          onMouseLeave={() => setIsHoveredButtons(false)}
        >
          <button
            onMouseDown={e => e.stopPropagation()}
            onClick={() => onClose(id)}
            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all cursor-default flex items-center justify-center"
          >
            {isHoveredButtons && (
              <svg width="6" height="6" viewBox="0 0 6 6" className="text-[#4a0002]">
                <path d="M0.5 0.5L5.5 5.5M5.5 0.5L0.5 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
          <div className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 transition-all cursor-default flex items-center justify-center">
            {isHoveredButtons && (
              <svg width="6" height="2" viewBox="0 0 6 2" className="text-[#995700]">
                <path d="M0.5 1H5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            )}
          </div>
          <div className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110 transition-all cursor-default flex items-center justify-center">
            {isHoveredButtons && (
              <svg width="6" height="6" viewBox="0 0 6 6" className="text-[#006500]">
                <path d="M0.75 3.75L2.25 5.25L5.25 0.75" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        </div>

        {/* Centered title */}
        <span className="absolute inset-0 flex items-center justify-center text-[11px] text-zinc-400 font-medium pointer-events-none">
          {title}
        </span>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-auto p-4 text-zinc-200">
        {children}
      </div>

      {/* Resize handle */}
      <div
        className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize group"
        onPointerDown={(e) => {
          e.stopPropagation()
          e.preventDefault()

          // Capture pointer for reliable tracking even outside window
          e.target.setPointerCapture(e.pointerId)

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
    </motion.div>
  )
}

export default Window