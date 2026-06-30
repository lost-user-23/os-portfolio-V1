import { motion } from 'framer-motion'

function BootScreen({ onComplete }) {
  return (
    <motion.div
      className="h-screen w-screen bg-zinc-950 flex flex-col items-center justify-center gap-8"
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Logo monogram */}
      <motion.div
        className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="text-3xl font-bold bg-gradient-to-br from-emerald-400 to-teal-300 bg-clip-text text-transparent font-sans">
          SM
        </span>
      </motion.div>

      {/* Name */}
      <motion.h1
        className="text-4xl sm:text-5xl font-bold text-white tracking-tight font-sans"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
      >
        Shourya Mathur
      </motion.h1>

      {/* Progress bar */}
      <motion.div
        className="w-52 h-1 bg-zinc-800/80 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
          style={{ boxShadow: '0 0 12px rgba(52, 211, 153, 0.5)' }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ delay: 1.1, duration: 2, ease: 'easeInOut' }}
          onAnimationComplete={onComplete}
        />
      </motion.div>

      {/* Loading text */}
      <motion.p
        className="text-zinc-600 text-xs font-mono tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.3 }}
      >
        loading desktop environment...
      </motion.p>
    </motion.div>
  )
}

export default BootScreen