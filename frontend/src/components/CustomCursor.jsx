import { motion, useMotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [touchDevice] = useState(() => {
    if (typeof window === 'undefined') {
      return true
    }
    return window.matchMedia('(pointer: coarse)').matches
  })

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useEffect(() => {
    if (touchDevice) {
      return undefined
    }

    const move = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
      if (!visible) {
        setVisible(true)
      }
    }

    const hide = () => setVisible(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseout', hide)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseout', hide)
    }
  }, [touchDevice, visible, x, y])

  if (touchDevice) {
    return null
  }

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[110]"
      style={{ x, y }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.12 }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <div className="relative h-8 w-8 rounded-full border border-brand-blue/60 bg-white/10 backdrop-blur-sm">
          <motion.span
            className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-neon"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </div>
      </div>
    </motion.div>
  )
}
