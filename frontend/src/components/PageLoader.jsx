import { motion } from 'framer-motion'

function LoaderCore({ compact = false, quote = 'Compiling the next interface.' }) {
  const shellSize = compact ? 'h-28 w-28' : 'h-40 w-40'
  const panelSize = compact ? 'h-16 w-16' : 'h-20 w-20'
  const quoteSize = compact ? 'text-sm' : 'text-base sm:text-lg'

  return (
    <div className="relative flex flex-col items-center gap-5 text-center">
      <div className={`relative flex items-center justify-center ${shellSize}`}>
        <motion.div
          className="absolute inset-0 rounded-full border border-white/10"
          animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.85, 0.35] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-3 rounded-full border border-brand-blue/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 8.5, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-6 rounded-full border border-dashed border-brand-neon/45"
          animate={{ rotate: -360 }}
          transition={{ duration: 10.5, repeat: Infinity, ease: 'linear' }}
        />

        <div className="loader-orbit absolute inset-0">
          <span className="loader-orb left-1/2 top-0 h-3 w-3 -translate-x-1/2 bg-brand-blue text-brand-blue" />
          <span className="loader-orb bottom-2 left-3 h-2.5 w-2.5 bg-brand-purple text-brand-purple" />
          <span className="loader-orb bottom-6 right-2 h-2.5 w-2.5 bg-brand-neon text-brand-neon" />
        </div>

        <motion.div
          className={`relative flex items-center justify-center rounded-[1.7rem] border border-white/15 bg-white/10 shadow-[0_0_45px_rgba(6,182,212,0.18)] backdrop-blur-xl ${panelSize}`}
          animate={{ y: [0, -6, 0], rotate: [0, 2, 0, -2, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="font-display text-lg font-semibold uppercase tracking-[0.24em] text-white">SYNC</span>
        </motion.div>
      </div>

      <div className="space-y-2">
        <motion.p
          className={`mx-auto max-w-xs font-display font-semibold leading-snug text-white sm:max-w-sm ${quoteSize}`}
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          {quote}
        </motion.p>
        <p className="max-w-xs text-[11px] uppercase tracking-[0.28em] text-slate-300/85 sm:max-w-sm">
          {compact ? 'Switching routes' : 'Booting the experience'}
        </p>
      </div>

      <div className={`overflow-hidden rounded-full border border-white/10 bg-white/5 p-[2px] ${compact ? 'w-44' : 'w-56'}`}>
        <motion.div
          className="h-1 rounded-full bg-[linear-gradient(90deg,rgba(124,58,237,0),rgba(124,58,237,0.9),rgba(6,182,212,1),rgba(34,197,94,0.95),rgba(34,197,94,0))]"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: compact ? 1.1 : 1.35, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}

export default function PageLoader({ mode = 'boot', quote }) {
  const compact = mode === 'route'

  return (
    <motion.div
      className={`fixed inset-0 z-[120] overflow-hidden ${compact ? 'bg-[#050816]/80 backdrop-blur-xl' : 'bg-[#050816]'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: compact ? 0.3 : 0.6, ease: 'easeInOut' } }}
    >
      <div className="loader-grid absolute inset-0 opacity-45" />

      <motion.div
        className="absolute left-1/2 top-[14%] h-64 w-64 -translate-x-1/2 rounded-full bg-brand-purple/25 blur-3xl"
        animate={{ scale: [1, 1.14, 0.96, 1], x: [0, 28, -18, 0], y: [0, -18, 12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[12%] left-[18%] h-48 w-48 rounded-full bg-brand-blue/20 blur-3xl"
        animate={{ scale: [0.92, 1.08, 0.94], x: [0, -18, 20, 0], y: [0, 10, -14, 0] }}
        transition={{ duration: 8.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[14%] top-[28%] h-44 w-44 rounded-full bg-brand-neon/16 blur-3xl"
        animate={{ scale: [1, 1.12, 0.9, 1], x: [0, 16, -14, 0], y: [0, 18, -10, 0] }}
        transition={{ duration: 7.4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative flex h-full items-center justify-center px-6">
        <LoaderCore compact={compact} quote={quote} />
      </div>
    </motion.div>
  )
}

