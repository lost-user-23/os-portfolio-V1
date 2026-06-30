import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import BootScreen from './components/BootScreen'
import Desktop from './components/Desktop'
import { useWindows } from './hooks/useWindows'
import { WALLPAPERS } from './data/wallpapers'

function App() {
  const [isBooted, setIsBooted] = useState(false)
  const [wallpaper, setWallpaper] = useState(WALLPAPERS[0])
  const { windows, openWindow, closeWindow, focusWindow, updatePosition, updateSize } = useWindows()

  const handleBootComplete = () => {
    const el = document.documentElement
    if (el.requestFullscreen) el.requestFullscreen().catch(() => {})
    setIsBooted(true)
  }

  return (
    <AnimatePresence mode="wait">
      {!isBooted ? (
        <BootScreen key="boot" onComplete={handleBootComplete} />
      ) : (
        <Desktop
          key="desktop"
          windows={windows}
          onOpenWindow={openWindow}
          onCloseWindow={closeWindow}
          onFocusWindow={focusWindow}
          onUpdatePosition={updatePosition}
          onUpdateSize={updateSize}
          wallpaper={wallpaper}
          onWallpaperChange={setWallpaper}
        />
      )}
    </AnimatePresence>
  )
}

export default App