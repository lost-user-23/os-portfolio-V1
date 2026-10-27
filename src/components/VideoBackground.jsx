import { useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

function VideoBackground({ wallpaper }) {
  const videoRef = useRef(null)
  const reduceMotion = useReducedMotion()

  // Don't decode video frames nobody can see
  useEffect(() => {
    const onVisibility = () => {
      const video = videoRef.current
      if (!video) return
      if (document.hidden) video.pause()
      else video.play().catch(() => {})
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  if (wallpaper.type === 'css') {
    return (
      <div
        className="absolute inset-0 desktop-wallpaper"
        style={{ zIndex: 0 }}
      />
    )
  }

  // Reduced motion: show the still frame instead of playing video
  if (reduceMotion && wallpaper.poster) {
    return (
      <img
        src={wallpaper.poster}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.video
        key={wallpaper.id}
        ref={videoRef}
        poster={wallpaper.poster}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src={wallpaper.src} type="video/mp4" />
      </motion.video>
    </AnimatePresence>
  )
}

export default VideoBackground