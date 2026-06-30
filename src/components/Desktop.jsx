import { AnimatePresence } from 'framer-motion'
import DesktopIcon from './DesktopIcon'
import Taskbar from './Taskbar'
import Window from './Window'
import VideoBackground from './VideoBackground'
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
  onFocusWindow, onUpdatePosition, onUpdateSize,
  wallpaper, onWallpaperChange,
}) {

  const handleOpenWindow = onOpenWindow

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <VideoBackground wallpaper={wallpaper} />

      <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
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
    </div>
  )
}

export default Desktop