import { motion } from 'framer-motion'

const variants = {
  landing: {
    ring: 'border-brand-blue/25',
    glowA: 'bg-brand-purple/25',
    glowB: 'bg-brand-blue/25',
    shapes: [
      'hidden xl:block left-[-1%] top-[12%] h-12 w-12 rounded-full',
      'hidden xl:block left-[0.5%] top-[38%] h-14 w-14 rounded-2xl',
      'hidden xl:block right-[-1%] top-[14%] h-20 w-20 rounded-2xl',
      'hidden xl:block right-[0%] top-[56%] h-16 w-16 rounded-full',
      'hidden xl:block right-[2%] bottom-[6%] h-10 w-24 rounded-full',
      'hidden xl:block left-[3%] bottom-[10%] h-9 w-20 rounded-full',
    ],
    chips: [
      { text: 'FAST MERN', className: 'hidden xl:block right-[2%] top-[30%]' },
      { text: 'PREMIUM INTERACTIONS', className: 'hidden xl:block right-[4%] top-[42%]' },
    ],
  },
  portfolio: {
    ring: 'border-brand-purple/25',
    glowA: 'bg-brand-purple/25',
    glowB: 'bg-brand-neon/20',
    shapes: [
      'hidden xl:block right-[-1%] top-[12%] h-20 w-20 rounded-2xl',
      'hidden xl:block right-[2%] top-[40%] h-14 w-14 rounded-full',
      'hidden xl:block right-[1%] bottom-[18%] h-16 w-16 rounded-[30%]',
      'hidden xl:block right-[6%] bottom-[6%] h-10 w-24 rounded-full',
      'hidden xl:block left-[1.5%] top-[52%] h-12 w-12 rounded-full',
      'hidden xl:block left-[2%] bottom-[14%] h-12 w-12 rounded-full',
      'hidden xl:block left-[9%] bottom-[6%] h-10 w-24 rounded-full',
    ],
    chips: [
      { text: 'PRECISION', className: 'hidden xl:block right-[2%] top-[24%]' },
      { text: 'EXCELLENCE', className: 'hidden xl:block right-[3%] top-[54%]' },
      { text: 'PERFORMANCE', className: 'hidden xl:block right-[4%] bottom-[14%]' },
    ],
  },
  services: {
    ring: 'border-brand-neon/25',
    glowA: 'bg-brand-blue/25',
    glowB: 'bg-brand-neon/20',
    shapes: [
      'right-[4%] top-[16%] h-20 w-20 rounded-2xl',
      'right-[8%] top-[44%] h-14 w-14 rounded-full',
      'right-[2%] bottom-[18%] h-16 w-16 rounded-[30%]',
      'right-[8%] bottom-[8%] h-10 w-24 rounded-full',
    ],
    chips: [
      { text: 'BUSINESS GROWTH', className: 'right-[14%] top-[34%]' },
      { text: 'CONVERSION FOCUS', className: 'right-[10%] bottom-[28%]' },
    ],
  },
}

const shapeAnimations = [
  { y: [0, -10, 0], rotate: [0, 8, 0] },
  { y: [0, 10, 0], x: [0, 5, 0] },
  { y: [0, -8, 0], rotate: [0, -8, 0] },
  { y: [0, 7, 0] },
  { y: [0, -6, 0], x: [0, 3, 0] },
  { y: [0, 6, 0] },
]

export default function HeroBackdropElements({ variant = 'portfolio' }) {
  const style = variants[variant] || variants.portfolio

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className={`absolute -right-24 top-[6%] h-56 w-56 rounded-full blur-[100px] ${style.glowA}`}
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.72, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className={`absolute right-[2%] bottom-[4%] h-48 w-48 rounded-full blur-[90px] ${style.glowB}`}
        animate={{ scale: [1.06, 1, 1.06], opacity: [0.7, 0.35, 0.7] }}
        transition={{ duration: 3.2, repeat: Infinity }}
      />

      {style.shapes.map((shapeClass, index) => (
        <motion.div
          key={`${variant}-shape-${index}`}
          className={`absolute border ${style.ring} ${shapeClass}`}
          animate={shapeAnimations[index % shapeAnimations.length]}
          transition={{ duration: 2.9 + (index % 3) * 0.3, repeat: Infinity }}
        />
      ))}

      {style.chips.map((chip, index) => (
        <motion.span
          key={`${variant}-chip-${chip.text}`}
          className={`absolute rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] tracking-[0.14em] text-slate-100 ${chip.className}`}
          animate={{ y: index % 2 === 0 ? [0, -7, 0] : [0, 7, 0] }}
          transition={{ duration: 2.7 + index * 0.2, repeat: Infinity }}
        >
          {chip.text}
        </motion.span>
      ))}
    </div>
  )
}



