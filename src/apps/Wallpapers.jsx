import { WALLPAPERS } from "../data/wallpapers";

function Wallpapers({currentWallpaper, onApply}) {
   return (
    <div className="h-full flex flex-col gap-4 text-sm">
      <div>
        <h2 className="text-white font-semibold text-base">Wallpapers</h2>
        <p className="text-zinc-500 text-xs mt-1">
          Double-click to apply · {WALLPAPERS.length} wallpapers available
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 overflow-auto">
        {WALLPAPERS.map(wallpaper => {
          const isActive = currentWallpaper.id === wallpaper.id
          return (
            <div
              key={wallpaper.id}
              onDoubleClick={() => onApply(wallpaper)}
              className={`relative rounded-xl overflow-hidden cursor-pointer group border-2 transition-all ${
                isActive
                  ? 'border-emerald-400 shadow-lg shadow-emerald-500/20'
                  : 'border-transparent hover:border-zinc-500'
              }`}
            >
              {/* Thumbnail */}
              <div
                className="w-full h-28"
                style={{ background: wallpaper.thumbnail }}
              >
                {wallpaper.type === 'video' && (
                  <video
                    src={wallpaper.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Label */}
              <div className="p-2 bg-zinc-900/80">
                <p className="text-xs text-zinc-300 font-medium">{wallpaper.name}</p>
                {isActive && (
                  <p className="text-[10px] text-emerald-400 mt-0.5">✓ Active</p>
                )}
              </div>

              {/* Hover overlay */}
              {!isActive && (
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-xs text-white bg-black/40 px-2 py-1 rounded-lg">
                    Double-click to apply
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Wallpapers