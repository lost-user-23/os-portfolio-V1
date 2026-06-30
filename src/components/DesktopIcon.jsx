import { motion } from 'framer-motion'

function DesktopIcon({ icon, label, onClick }) {
  return (
    <motion.button
      onDoubleClick={onClick}
      whileTap={{ scale: 0.9 }}
      className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl hover:bg-white/[0.08] active:bg-white/[0.12] transition-colors group w-[76px] cursor-default"
    >
      <span
        className="text-[2.2rem] drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-200 group-hover:scale-110"
        style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))' }}
      >
        {icon}
      </span>
      <span
        className="text-[10px] text-zinc-200 text-center leading-tight font-medium tracking-wide"
        style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.6)' }}
      >
        {label}
      </span>
    </motion.button>
  )
}

export default DesktopIcon