import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

const tags = [
  { label: 'MERN', className: 'left-2 top-8' },
  { label: 'REACT', className: 'right-4 top-16' },
  { label: 'NODE', className: 'left-10 bottom-14' },
  { label: '3D UX', className: 'right-8 bottom-6' },
]

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export default function TechMascot() {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const shiftX = useMotionValue(0)
  const shiftY = useMotionValue(0)
  const pupilX = useMotionValue(0)
  const pupilY = useMotionValue(0)

  const springRotateX = useSpring(rotateX, { stiffness: 220, damping: 18, mass: 0.45 })
  const springRotateY = useSpring(rotateY, { stiffness: 220, damping: 18, mass: 0.45 })
  const springShiftX = useSpring(shiftX, { stiffness: 220, damping: 18, mass: 0.45 })
  const springShiftY = useSpring(shiftY, { stiffness: 220, damping: 18, mass: 0.45 })
  const springPupilX = useSpring(pupilX, { stiffness: 280, damping: 18, mass: 0.35 })
  const springPupilY = useSpring(pupilY, { stiffness: 280, damping: 18, mass: 0.35 })

  useEffect(() => {
    const move = (event) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2

      const ratioX = (event.clientX - centerX) / centerX
      const ratioY = (event.clientY - centerY) / centerY

      rotateY.set(clamp(ratioX * 15, -15, 15))
      rotateX.set(clamp(-ratioY * 12, -12, 12))
      shiftX.set(clamp(ratioX * 12, -12, 12))
      shiftY.set(clamp(ratioY * 9, -9, 9))
      pupilX.set(clamp(ratioX * 4.5, -4.5, 4.5))
      pupilY.set(clamp(ratioY * 3.5, -3.5, 3.5))
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [pupilX, pupilY, rotateX, rotateY, shiftX, shiftY])

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[340px]"
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
      style={{ perspective: 1000 }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple/30 blur-[70px]"
          animate={{ scale: [1, 1.12, 1], opacity: [0.42, 0.72, 0.42] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/25 blur-[55px]"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.62, 0.3, 0.62] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="relative rounded-[2rem] border border-white/20 bg-white/10 p-6 backdrop-blur-xl"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: springRotateX,
          rotateY: springRotateY,
          x: springShiftX,
          y: springShiftY,
        }}
      >
        <svg viewBox="0 0 220 250" className="mx-auto h-[280px] w-full">
          <defs>
            <linearGradient id="faceGrad" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#c4b5fd" />
              <stop offset="100%" stopColor="#67e8f9" />
            </linearGradient>
            <linearGradient id="bodyGrad" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>

          <motion.g animate={{ y: [0, -5, 0] }} transition={{ duration: 2.2, repeat: Infinity }}>
            <ellipse cx="110" cy="222" rx="55" ry="12" fill="rgba(34,197,94,0.25)" />
            <rect x="72" y="110" width="76" height="98" rx="36" fill="url(#bodyGrad)" opacity="0.95" />
            <rect x="80" y="126" width="60" height="45" rx="18" fill="rgba(255,255,255,0.18)" />

            <circle cx="110" cy="74" r="40" fill="url(#faceGrad)" />
            <path d="M73 70 C80 32, 140 32, 147 69" fill="#0B0F1A" opacity="0.9" />
            <circle cx="96" cy="77" r="4" fill="white" opacity="0.95" />
            <circle cx="124" cy="77" r="4" fill="white" opacity="0.95" />
            <motion.g style={{ x: springPupilX, y: springPupilY }}>
              <circle cx="96" cy="77" r="2.1" fill="#0B0F1A" />
              <circle cx="124" cy="77" r="2.1" fill="#0B0F1A" />
            </motion.g>
            <path d="M97 94 C105 102, 117 102, 125 94" stroke="#0B0F1A" strokeWidth="3" fill="none" strokeLinecap="round" />

            <motion.g
              animate={{ rotate: [0, -12, 0], x: [0, -4, 0], y: [0, 2, 0] }}
              transform="translate(59 146)"
              transition={{ duration: 2.8, repeat: Infinity }}
            >
              <rect x="0" y="0" width="18" height="58" rx="9" fill="#7C3AED" />
            </motion.g>

            <motion.g
              animate={{ rotate: [0, 18, 0], x: [0, 5, 0], y: [0, -3, 0] }}
              transform="translate(143 146)"
              transition={{ duration: 2.8, repeat: Infinity }}
            >
              <rect x="0" y="0" width="18" height="58" rx="9" fill="#06B6D4" />
            </motion.g>
          </motion.g>
        </svg>

        {tags.map((tag, index) => (
          <motion.span
            key={tag.label}
            className={`absolute rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-slate-100 ${tag.className}`}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.4 + index * 0.4, repeat: Infinity }}
          >
            {tag.label}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}
