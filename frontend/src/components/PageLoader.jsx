import { motion } from 'framer-motion'

export default function PageLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-[#060914]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.65, ease: 'easeInOut' } }}
    >
      <div className="relative flex flex-col items-center gap-5">
        <div className="absolute h-40 w-40 rounded-full bg-brand-purple/40 blur-3xl" />
        <motion.div
          className="h-16 w-16 rounded-full border-2 border-brand-blue/30 border-t-brand-blue"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.p
          className="font-display text-xl font-semibold tracking-[0.24em] text-white"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          JAYDEEP
        </motion.p>
      </div>
    </motion.div>
  )
}

