import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import DesktopIcon from './DesktopIcon'
import Taskbar from './Taskbar'
import Window from './Window'
import VideoBackground from './VideoBackground'
import ContextMenu from './ContextMenu'
import About from '../apps/About'
import Projects from '../apps/Projects'
import Skills from '../apps/Skills'
import Contact from '../apps/Contact'
import Terminal from '../apps/Terminal'
import Wallpapers from '../apps/Wallpapers'
import { WINDOWS_CONFIG } from '../data/windowsConfig'
import Resume from "../apps/Resume"

function Desktop({
  windows, onOpenWindow, onCloseWindow,
  onFocusWindow, onMinimizeWindow, onToggleMaximize,
  onUpdatePosition, onUpdateSize,
  wallpaper, onWallpaperChange,
}) {

  const handleOpenWindow = onOpenWindow
  const [menu, setMenu] = useState(null)
  const closeMenu = useCallback(() => setMenu(null), [])

  // Custom menu on the desktop only. Inside windows (terminal input, links)
  // the browser's native menu stays available.
  const handleContextMenu = (e) => {
    if (e.target.closest('[data-window]')) return
    e.preventDefault()
    setMenu({ x: e.clientX, y: e.clientY })
  }

  return (
    <main className="h-screen w-screen relative overflow-hidden" onContextMenu={handleContextMenu}>
      <VideoBackground wallpaper={wallpaper} />

      <div className="absolute top-6 left-6 bottom-6 flex flex-col flex-wrap content-start gap-2 z-10">
        {WINDOWS_CONFIG.map(win => (
          <DesktopIcon
            key={win.id}
            icon={win.icon}
            label={win.title}
            onClick={() => handleOpenWindow(win.id)}
          />
        ))}
      </div>

      <AnimatePresence>
        {windows.map(win => (
          <Window
            key={win.id}
            {...win}
            onClose={onCloseWindow}
            onFocus={onFocusWindow}
            onMinimize={onMinimizeWindow}
            onToggleMaximize={onToggleMaximize}
            onUpdatePosition={onUpdatePosition}
            onUpdateSize={onUpdateSize}
          >
            {win.id === 'about' && <About />}
            {win.id === 'projects' && <Projects />}
            {win.id === 'skills' && <Skills />}
            {win.id === 'contact' && <Contact />}
            {win.id === 'terminal' && <Terminal />}
            {win.id === 'wallpapers' && (
              <Wallpapers
                currentWallpaper={wallpaper}
                onApply={onWallpaperChange}
              />
            )}
            {win.id === 'resume' && <Resume/>}
          </Window>
        ))}
      </AnimatePresence>

      <Taskbar openWindows={windows} onIconClick={onOpenWindow} />

      <AnimatePresence>
        {menu && (
          <ContextMenu
            x={menu.x}
            y={menu.y}
            onClose={closeMenu}
            onOpenWindow={onOpenWindow}
          />
        )}
      </AnimatePresence>
    </main>
  )
}

export default Desktop