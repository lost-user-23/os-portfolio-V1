import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function ContextMenu({ x, y, onClose, onOpenWindow }) {
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose()
      }
    }
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('mousedown', handleClick)
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('mousedown', handleClick)
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  // Keep menu within viewport bounds
  const adjustedX = Math.min(x, window.innerWidth - 220)
  const adjustedY = Math.min(y, window.innerHeight - 260)

  const items = [
    { label: 'About This Desktop', icon: 'ℹ️', action: () => { onOpenWindow('about'); onClose() } },
    { label: 'Open Terminal', icon: '💻', action: () => { onOpenWindow('terminal'); onClose() } },
    { divider: true },
    { label: 'View Projects', icon: '🗂️', action: () => { onOpenWindow('projects'); onClose() } },
    { label: 'Contact Me', icon: '📬', action: () => { onOpenWindow('contact'); onClose() } },
    { divider: true },
    { label: 'Refresh Desktop', icon: '🔄', action: () => { onClose(); window.location.reload() } },
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.12, ease: 'easeOut' }}
      className="context-menu glass-heavy rounded-xl py-1.5 w-52 fixed z-[9999] overflow-hidden"
      style={{ left: adjustedX, top: adjustedY }}
    >
      {items.map((item, i) =>
        item.divider ? (
          <div key={`d-${i}`} className="h-px bg-white/[0.06] my-1 mx-2" />
        ) : (
          <button
            key={item.label}
            onClick={item.action}
            className="w-full flex items-center gap-3 px-3 py-2 text-xs text-zinc-300 hover:bg-white/[0.08] hover:text-white transition-colors text-left cursor-default"
          >
            <span className="text-sm w-5 text-center">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        )
      )}
    </motion.div>
  )
}

export default ContextMenu
