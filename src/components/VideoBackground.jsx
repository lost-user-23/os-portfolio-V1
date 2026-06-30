import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function VideoBackground({ wallpaper }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.play().catch(() => {})
    }
  }, [wallpaper.src])

  if (wallpaper.type === 'css') {
    return (
      <div
        className="absolute inset-0 desktop-wallpaper"
        style={{ zIndex: 0 }}
      />
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.video
        key={wallpaper.id}
        ref={videoRef}
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