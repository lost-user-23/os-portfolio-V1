import { useState, useCallback } from 'react'
import { WINDOWS_CONFIG, DEFAULT_SIZE } from '../data/windowsConfig'

const DEFAULT_POSITION = { x: 160, y: 80 }
const BASE_Z = 10
const CASCADE_STEP = 24
const CASCADE_STEPS = 8
// Space kept free around a newly opened window (dock sits at the bottom).
const EDGE_MARGIN = 20
const DOCK_MARGIN = 110

const clamp = (value, min, max) => Math.max(min, Math.min(value, max))
const topZ = (wins) => wins.reduce((max, w) => Math.max(max, w.zIndex), BASE_Z)

export function useWindows() {
  const [windows, setWindows] = useState([])

  const openWindow = useCallback((id) => {
    setWindows(prev => {
      const newZ = topZ(prev) + 1
      const existing = prev.find(w => w.id === id)

      // already open: just bring to front
      if (existing) {
        return prev.map(w => (w.id === id ? { ...w, zIndex: newZ, minimized: false } : w))
      }

      const config = WINDOWS_CONFIG.find(w => w.id === id)

      // fit the window to small screens
      const size = {
        width: Math.min(DEFAULT_SIZE.width, window.innerWidth - EDGE_MARGIN * 2),
        height: Math.min(DEFAULT_SIZE.height, window.innerHeight - DOCK_MARGIN - EDGE_MARGIN),
      }

      // slight offset so new windows don't perfectly stack, kept inside the viewport
      const offset = (prev.length % CASCADE_STEPS) * CASCADE_STEP
      const position = {
        x: clamp(DEFAULT_POSITION.x + offset, 0, window.innerWidth - size.width - EDGE_MARGIN),
        y: clamp(DEFAULT_POSITION.y + offset, 0, window.innerHeight - size.height - DOCK_MARGIN),
      }

      return [...prev, {
        id,
        title: config?.title ?? id,
        position,
        size,
        zIndex: newZ,
        minimized: false,
        maximized: false,
      }]
    })
  }, [])

  const closeWindow = useCallback((id) => {
    setWindows(prev => prev.filter(w => w.id !== id))
  }, [])

  const focusWindow = useCallback((id) => {
    setWindows(prev => {
      const target = prev.find(w => w.id === id)
      // already on top (or gone): return the same array so React skips the render
      if (!target || target.zIndex === topZ(prev)) return prev
      const newZ = topZ(prev) + 1
      return prev.map(w => (w.id === id ? { ...w, zIndex: newZ } : w))
    })
  }, [])

  // Minimized windows stay mounted (terminal history survives) but are hidden.
  const minimizeWindow = useCallback((id) => {
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, minimized: true } : w)))
  }, [])

  // Position and size are left untouched, so un-maximizing restores them exactly.
  const toggleMaximize = useCallback((id) => {
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, maximized: !w.maximized } : w)))
  }, [])

  const updatePosition = useCallback((id, position) => {
    setWindows(prev =>
      prev.map(w => w.id === id ? { ...w, position } : w)
    )
  }, [])

  const updateSize = useCallback((id, size) => {
    setWindows(prev =>
      prev.map(w => w.id === id ? { ...w, size } : w)
    )
  }, [])

  return {
    windows,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    toggleMaximize,
    updatePosition,
    updateSize,
  }
}
