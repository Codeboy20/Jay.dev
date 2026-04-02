import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export default function InteractivePortfolioMascot() {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const shiftX = useMotionValue(0)
  const shiftY = useMotionValue(0)
  const pupilX = useMotionValue(0)
  const pupilY = useMotionValue(0)

  const springRotateX = useSpring(rotateX, { stiffness: 250, damping: 18, mass: 0.4 })
  const springRotateY = useSpring(rotateY, { stiffness: 250, damping: 18, mass: 0.4 })
  const springShiftX = useSpring(shiftX, { stiffness: 230, damping: 16, mass: 0.45 })
  const springShiftY = useSpring(shiftY, { stiffness: 230, damping: 16, mass: 0.45 })
  const springPupilX = useSpring(pupilX, { stiffness: 300, damping: 16, mass: 0.3 })
  const springPupilY = useSpring(pupilY, { stiffness: 300, damping: 16, mass: 0.3 })

  const leftArmRotate = useTransform(springRotateY, [-22, 22], [-22, 10])
  const rightArmRotate = useTransform(springRotateY, [-22, 22], [10, -22])

  useEffect(() => {
    const move = (event) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2

      const ratioX = (event.clientX - centerX) / centerX
      const ratioY = (event.clientY - centerY) / centerY

      rotateY.set(clamp(ratioX * 22, -22, 22))
      rotateX.set(clamp(-ratioY * 18, -18, 18))
      shiftX.set(clamp(ratioX * 18, -18, 18))
      shiftY.set(clamp(ratioY * 14, -14, 14))
      pupilX.set(clamp(ratioX * 6, -6, 6))
      pupilY.set(clamp(ratioY * 5, -5, 5))
    }

    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
    }
  }, [pupilX, pupilY, rotateX, rotateY, shiftX, shiftY])

  return (
    <motion.div className="relative mx-auto h-[470px] w-full max-w-[520px]" style={{ perspective: 1200 }}>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple/35 blur-[110px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.45, 0.8, 0.45] }}
          transition={{ duration: 3.4, repeat: Infinity }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/30 blur-[90px]"
          animate={{ scale: [1.06, 1, 1.06], opacity: [0.68, 0.34, 0.68] }}
          transition={{ duration: 2.8, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="pointer-events-none absolute left-[2%] top-[14%] hidden rounded-full border border-brand-blue/35 bg-white/10 px-3 py-1 text-[10px] tracking-[0.12em] text-slate-100 xl:block"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.8, repeat: Infinity }}
      >
        MERN DEV
      </motion.div>
      <motion.div
        className="pointer-events-none absolute left-[7%] top-[46%] hidden h-10 w-10 rounded-full border border-brand-neon/35 xl:block"
        animate={{ y: [0, -7, 0], x: [0, 5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute left-[12%] bottom-[10%] hidden h-10 w-24 rounded-full border border-brand-purple/30 xl:block"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.9, repeat: Infinity }}
      />

      <motion.div
        className="pointer-events-none absolute right-[5%] top-[12%] hidden h-14 w-14 rounded-2xl border border-brand-purple/30 xl:block"
        animate={{ y: [0, 8, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute right-[2%] top-[36%] hidden rounded-full border border-brand-blue/35 bg-white/10 px-3 py-1 text-[10px] tracking-[0.12em] text-slate-100 xl:block"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.7, repeat: Infinity }}
      >
        UI + MOTION
      </motion.div>
      <motion.div
        className="pointer-events-none absolute right-[8%] bottom-[12%] hidden rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] tracking-[0.12em] text-slate-100 xl:block"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.8, repeat: Infinity }}
      >
        CRAFT + CODE
      </motion.div>

      <motion.div
        className="relative mx-auto mt-4 w-[340px] rounded-[2.1rem] border border-white/20 bg-white/10 p-6 shadow-glass backdrop-blur-xl sm:w-[360px]"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: springRotateX,
          rotateY: springRotateY,
          x: springShiftX,
          y: springShiftY,
        }}
      >
        <svg viewBox="0 0 280 320" className="mx-auto h-[320px] w-full">
          <defs>
            <linearGradient id="j-face" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#ddd6fe" />
              <stop offset="100%" stopColor="#67e8f9" />
            </linearGradient>
            <linearGradient id="j-suit" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>

          <ellipse cx="140" cy="286" rx="58" ry="14" fill="rgba(34,197,94,0.22)" />

          <motion.g style={{ rotate: leftArmRotate, originX: 0.33, originY: 0.58 }}>
            <rect x="74" y="165" width="24" height="90" rx="12" fill="#7C3AED" />
          </motion.g>
          <motion.g style={{ rotate: rightArmRotate, originX: 0.68, originY: 0.58 }}>
            <rect x="182" y="165" width="24" height="90" rx="12" fill="#06B6D4" />
          </motion.g>

          <rect x="98" y="132" width="84" height="138" rx="38" fill="url(#j-suit)" />
          <rect x="107" y="153" width="66" height="60" rx="20" fill="rgba(255,255,255,0.18)" />
          <circle cx="140" cy="90" r="47" fill="url(#j-face)" />
          <path d="M95 84 C102 36,178 36,185 84" fill="#0B0F1A" opacity="0.9" />

          <circle cx="123" cy="92" r="7" fill="white" opacity="0.94" />
          <circle cx="157" cy="92" r="7" fill="white" opacity="0.94" />
          <motion.g style={{ x: springPupilX, y: springPupilY }}>
            <circle cx="123" cy="92" r="3.2" fill="#0B0F1A" />
            <circle cx="157" cy="92" r="3.2" fill="#0B0F1A" />
          </motion.g>

          <path d="M124 112 C130 120,150 120,156 112" stroke="#0B0F1A" strokeWidth="4" fill="none" strokeLinecap="round" />
          <rect x="130" y="176" width="20" height="20" rx="6" fill="rgba(34,197,94,0.9)" />
        </svg>

        <motion.span
          className="absolute left-4 top-5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-slate-100"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          FULL STACK
        </motion.span>

        <motion.span
          className="absolute right-4 top-16 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-slate-100"
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 2.6, repeat: Infinity }}
        >
          3D INTERACTIONS
        </motion.span>

        <motion.span
          className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-slate-100"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          JAYDEEP
        </motion.span>
      </motion.div>
    </motion.div>
  )
}
