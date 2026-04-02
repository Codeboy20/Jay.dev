import { motion, useScroll } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed left-0 top-0 z-[105] h-[3px] w-full origin-left bg-gradient-to-r from-brand-purple via-brand-blue to-brand-neon"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

