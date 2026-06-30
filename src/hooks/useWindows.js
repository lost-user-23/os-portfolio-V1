import { useState, useCallback } from 'react'
import { WINDOWS_CONFIG } from '../data/windowsConfig'

const DEFAULT_POSITION = { x: 160, y: 80 }
const DEFAULT_SIZE     = { width: 600, height: 420 }

export function useWindows() {
  const [windows, setWindows] = useState([])
  const [, setTopZ] = useState(10)

  const openWindow = useCallback((id) => {
    setTopZ(prevZ => {
      const newZ = prevZ + 1
      setWindows(prev => {
        const existing = prev.find(w => w.id === id)

        // already open → just bring to front
        if (existing) {
          return prev.map(w =>
            w.id === id ? { ...w, zIndex: newZ } : w
          )
        }

        // find config for title
        const config = WINDOWS_CONFIG.find(w => w.id === id)

        // slight offset so new windows don't perfectly stack
        const offset = prev.length * 24
        return [
          ...prev,
          {
            id,
            title: config?.title ?? id,
            position: {
              x: DEFAULT_POSITION.x + offset,
              y: DEFAULT_POSITION.y + offset,
            },
            size: { ...DEFAULT_SIZE },
            zIndex: newZ,
          },
        ]
      })
      return newZ
    })
  }, [])

  const closeWindow = useCallback((id) => {
    setWindows(prev => prev.filter(w => w.id !== id))
  }, [])

  const focusWindow = useCallback((id) => {
    setTopZ(prev => {
      const newZ = prev + 1
      setWindows(wins =>
        wins.map(w => w.id === id ? { ...w, zIndex: newZ } : w)
      )
      return newZ
    })
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
    updatePosition,
    updateSize,
  }
}