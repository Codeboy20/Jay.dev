import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useMemo } from 'react'

export default function TiltCard({ children, className = '', glowClass = '' }) {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const springX = useSpring(rotateX, { stiffness: 220, damping: 18, mass: 0.6 })
  const springY = useSpring(rotateY, { stiffness: 220, damping: 18, mass: 0.6 })

  const transform = useMemo(
    () =>
      ({
        transformStyle: 'preserve-3d',
        rotateX: springX,
        rotateY: springY,
      }),
    [springX, springY],
  )

  const onMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const percentX = (event.clientX - rect.left) / rect.width - 0.5
    const percentY = (event.clientY - rect.top) / rect.height - 0.5

    rotateX.set(-percentY * 10)
    rotateY.set(percentX * 12)
  }

  const onLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      className={`relative ${className}`}
      style={transform}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className={`absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${glowClass}`} />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

