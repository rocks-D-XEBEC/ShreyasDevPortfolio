"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function LogoAnimation() {
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    // Hide logo animation after it completes
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isAnimating) return null

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-20 bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: isAnimating ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => {
        if (!isAnimating) {
          document.body.style.overflow = "auto"
        }
      }}
    >
      <div className="relative w-32 h-32 md:w-48 md:h-48">
        {/* Gloomy logo animation */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/80 to-purple-700/80 blur-lg"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: [0, 0.8, 0.6],
          }}
          transition={{
            duration: 2,
            times: [0, 0.7, 1],
          }}
        />

        {/* Logo letters */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-4xl md:text-6xl font-bold text-background"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <span>SL</span>
        </motion.div>

        {/* Orbiting particle - using fixed values to avoid hydration errors */}
        <motion.div
          className="absolute w-3 h-3 rounded-full bg-primary"
          initial={{ opacity: 0, x: 0, y: 40 }}
          animate={{
            opacity: [0, 1, 0],
            x: [0, 40, 0, -40, 0],
            y: [40, 0, -40, 0, 40],
          }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        />
      </div>
    </motion.div>
  )
}

