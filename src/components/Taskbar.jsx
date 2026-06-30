import { useState, useEffect } from 'react'
import { WINDOWS_CONFIG } from '../data/windowsConfig'

function Taskbar({ openWindows, onIconClick }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const timeStr = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  const dateStr = time.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  const openIds = new Set(openWindows.map(w => w.id))

  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[9990]">
      <div className="glass-dock rounded-2xl px-4 py-2 flex gap-2">
        {/* App icons */}
        {WINDOWS_CONFIG.map(win => {
          const isOpen = openIds.has(win.id)
          return (
            <div key={win.id} className="relative group">
              {/* Tooltip */}
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 glass-heavy rounded-lg px-2.5 py-1 text-[10px] text-zinc-200 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap">
                {win.title}
              </div>

              <button
                onClick={() => onIconClick(win.id)}
                className="dock-item w-14 h-14 rounded-xl flex items-center justify-center text-2xl hover:bg-white/[0.08] active:bg-white/[0.12] transition-colors cursor-default"
              >
                {win.icon}
              </button>

              {/* Active indicator dot */}
              {isOpen && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-zinc-300" />
              )}
            </div>
          )
        })}

        {/* Divider */}
        <div className="w-px h-10 bg-white/[0.1] mx-2 self-center" />

        {/* System tray */}
        <div className="flex items-center gap-3 px-2">
          {/* Wi-Fi icon */}
          <svg className="w-5 h-5 text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 18c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-4.24-3.66a5.94 5.94 0 0 1 8.49 0l1.41-1.41a7.93 7.93 0 0 0-11.31 0l1.41 1.41zm-2.83-2.83a9.92 9.92 0 0 1 14.14 0l1.41-1.41C17.45 7.07 14.93 6 12 6s-5.45 1.07-8.49 4.1l1.42 1.41z"/>
          </svg>

          {/* Battery icon */}
          <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <rect x="2" y="7" width="18" height="10" rx="2" />
            <rect x="4" y="9" width="10" height="6" rx="1" fill="currentColor" opacity="0.6" />
            <path d="M22 11v2" strokeLinecap="round" />
          </svg>

          {/* Clock */}
          <div className="text-right ml-1 cursor-default select-none">
            <p className="text-[12px] text-zinc-300 font-medium leading-tight">{timeStr}</p>
            <p className="text-[10px] text-zinc-500 leading-tight">{dateStr}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Taskbar