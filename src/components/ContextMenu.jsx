import { useEffect, useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const EDGE_GAP = 8

function ContextMenu({ x, y, onClose, onOpenWindow }) {
  const ref = useRef(null)

  const open = (id) => () => { onOpenWindow(id); onClose() }

  const items = [
    { label: 'About This Desktop', icon: 'ℹ️', action: open('about') },
    { label: 'Open Terminal', icon: '💻', action: open('terminal') },
    { divider: true },
    { label: 'View Projects', icon: '🗂️', action: open('projects') },
    { label: 'Contact Me', icon: '📬', action: open('contact') },
    { label: 'Change Wallpaper', icon: '🖼️', action: open('wallpapers') },
    { divider: true },
    { label: 'Refresh Desktop', icon: '🔄', action: () => { onClose(); window.location.reload() } },
  ]

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    const handleKey = (e) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
      e.preventDefault()
      const buttons = [...ref.current.querySelectorAll('[role="menuitem"]')]
      const current = buttons.indexOf(document.activeElement)
      const step = e.key === 'ArrowDown' ? 1 : -1
      buttons[(current + step + buttons.length) % buttons.length].focus()
    }
    window.addEventListener('mousedown', handleClick)
    window.addEventListener('keydown', handleKey)
    window.addEventListener('resize', onClose)
    window.addEventListener('blur', onClose)
    // move focus into the menu so it is usable from the keyboard
    ref.current?.querySelector('[role="menuitem"]')?.focus()
    return () => {
      window.removeEventListener('mousedown', handleClick)
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('resize', onClose)
      window.removeEventListener('blur', onClose)
    }
  }, [onClose])

  // Position after measuring the real size, so the menu stays fully inside the
  // viewport on every edge. offsetWidth/Height ignore the open animation's scale.
  useLayoutEffect(() => {
    const el = ref.current
    const left = Math.max(EDGE_GAP, Math.min(x, window.innerWidth - el.offsetWidth - EDGE_GAP))
    const top = Math.max(EDGE_GAP, Math.min(y, window.innerHeight - el.offsetHeight - EDGE_GAP))
    el.style.left = `${left}px`
    el.style.top = `${top}px`
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      role="menu"
      aria-label="Desktop"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.12, ease: 'easeOut' }}
      className="context-menu glass-heavy rounded-xl py-1.5 w-52 fixed z-[9999] overflow-hidden"
    >
      {items.map((item, i) =>
        item.divider ? (
          <div key={`d-${i}`} role="separator" className="h-px bg-white/[0.06] my-1 mx-2" />
        ) : (
          <button
            key={item.label}
            role="menuitem"
            onClick={item.action}
            className="w-full flex items-center gap-3 px-3 py-2 text-xs text-zinc-300 hover:bg-white/[0.08] focus:bg-white/[0.08] hover:text-white focus:text-white transition-colors text-left cursor-default outline-none"
          >
            <span className="text-sm w-5 text-center" aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        )
      )}
    </motion.div>
  )
}

export default ContextMenu
