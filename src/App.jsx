import { useState } from 'react'
import { AnimatePresence, MotionConfig, useReducedMotion } from 'framer-motion'
import BootScreen from './components/BootScreen'
import Desktop from './components/Desktop'
import MobileFallback from './components/MobileFallback'
import { useWindows } from './hooks/useWindows'
import { useIsMobile } from './hooks/useIsMobile'
import { WALLPAPERS } from './data/wallpapers'

function App() {
  const [isBooted, setIsBooted] = useState(false)
  const [wallpaper, setWallpaper] = useState(WALLPAPERS[0])
  const isMobile = useIsMobile()
  const reduceMotion = useReducedMotion()
  const {
    windows, openWindow, closeWindow, focusWindow,
    minimizeWindow, toggleMaximize, updatePosition, updateSize,
  } = useWindows()

  const handleBootComplete = () => setIsBooted(true)

  if (isMobile) {
    return <MobileFallback />
  }

  return (
    <MotionConfig reducedMotion="user">
    {/* Head start: fetch the wallpaper while the boot animation plays */}
    {!isBooted && wallpaper.type === 'video' && !reduceMotion && (
      <video src={wallpaper.src} preload="auto" muted hidden aria-hidden="true" />
    )}
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
          onMinimizeWindow={minimizeWindow}
          onToggleMaximize={toggleMaximize}
          onUpdatePosition={updatePosition}
          onUpdateSize={updateSize}
          wallpaper={wallpaper}
          onWallpaperChange={setWallpaper}
        />
      )}
    </AnimatePresence>
    </MotionConfig>
  )
}

export default App