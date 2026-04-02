import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, BriefcaseBusiness, CodeXml, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeroBackdropElements from '../components/HeroBackdropElements'
import MagneticButton from '../components/MagneticButton'
import LazyThreeBackground from '../components/LazyThreeBackground'
import heroImage from '../assets/images/image.png'
import TiltCard from '../components/TiltCard'

const options = [
  {
    id: 'portfolio',
    heading: 'Hire a Developer Who Delivers',
    subtitle: 'Modern, scalable solutions built with performance and user experience in mind.',
    button: 'View Portfolio',
    path: '/portfolio',
    icon: CodeXml,
    glow: 'from-brand-purple/25 via-brand-blue/20 to-transparent',
  },
  {
    id: 'services',
    heading: 'Build Your Business Online',
    subtitle: 'Professional websites crafted for performance, growth, and brand impact.',
    button: 'See My Services',
    path: '/services',
    icon: BriefcaseBusiness,
    glow: 'from-brand-blue/25 via-brand-neon/20 to-transparent',
  },
]

const HERO_LINE_ONE = "Hi, I'm Jaydeep."
const HERO_LINE_TWO = 'Build Smarter. Launch Faster.'
let hasPlayedHeroTyping = false

export default function LandingChoice() {
  const navigate = useNavigate()
  const [activePath, setActivePath] = useState(null)
  const [typedLineOne, setTypedLineOne] = useState(() => (hasPlayedHeroTyping ? HERO_LINE_ONE : ''))
  const [typedLineTwo, setTypedLineTwo] = useState(() => (hasPlayedHeroTyping ? HERO_LINE_TWO : ''))
  const [isTypingDone, setIsTypingDone] = useState(hasPlayedHeroTyping)
  const isTypingLineOne = !isTypingDone && typedLineOne.length < HERO_LINE_ONE.length
  const isTypingLineTwo = !isTypingDone && typedLineOne.length === HERO_LINE_ONE.length

  useEffect(() => {
    if (hasPlayedHeroTyping) {
      return
    }

    let lineOneIndex = 0
    let lineTwoIndex = 0

    const typeNextCharacter = () => {
      if (lineOneIndex < HERO_LINE_ONE.length) {
        lineOneIndex += 1
        setTypedLineOne(HERO_LINE_ONE.slice(0, lineOneIndex))
        return
      }

      if (lineTwoIndex < HERO_LINE_TWO.length) {
        lineTwoIndex += 1
        setTypedLineTwo(HERO_LINE_TWO.slice(0, lineTwoIndex))
        return
      }

      hasPlayedHeroTyping = true
      setIsTypingDone(true)
      window.clearInterval(timerId)
    }

    const timerId = window.setInterval(typeNextCharacter, 45)

    return () => window.clearInterval(timerId)
  }, [])

  const handleNavigate = (path) => {
    if (activePath) {
      return
    }

    setActivePath(path)
    setTimeout(() => navigate(path), 560)
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden px-4 pt-5 sm:px-5 md:px-8 md:pt-6 lg:h-[100svh] lg:overflow-hidden lg:px-10 lg:pt-8">
      <LazyThreeBackground variant="portfolio" />
      <div className="pointer-events-none absolute inset-0 bg-premium-gradient opacity-80" />
      <HeroBackdropElements variant="landing" />

      <AnimatePresence>
        {activePath ? (
          <motion.div
            key="route-overlay"
            className="fixed inset-0 z-[95] bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.42),rgba(11,15,26,0.96))]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        ) : null}
      </AnimatePresence>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 pb-5 md:gap-7 md:pb-8 lg:h-full lg:justify-between lg:pb-6">
        <section className="relative z-10 grid items-start gap-5 md:gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div
            className="lg:scale-[1.06] lg:origin-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-1.5 text-[0.7rem] uppercase tracking-[0.2em] text-brand-blue sm:text-xs">
              <Sparkles className="h-4 w-4" />
              Digital Experiences by Jaydeep
            </p>
            <h1 className="font-display text-[2.3rem] font-semibold leading-tight text-white sm:text-5xl lg:text-[4.2rem]">
              <span className="block">
                {typedLineOne}
                {isTypingLineOne ? (
                  <span
                    aria-hidden="true"
                    className="ml-1 inline-block h-[0.9em] w-px animate-pulse bg-white/80 align-middle"
                  />
                ) : null}
              </span>
              <span className="block whitespace-nowrap text-[clamp(1.5rem,3.5vw,3rem)]">
                {typedLineTwo || '\u00A0'}
                {isTypingLineTwo ? (
                  <span
                    aria-hidden="true"
                    className="ml-1 inline-block h-[0.9em] w-px animate-pulse bg-white/80 align-middle"
                  />
                ) : null}
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
              <span className="block">Whether you&apos;re hiring a developer or building your business website,</span>
              <span className="mt-1 block">I create fast, modern, and conversion-focused digital experiences.</span>
            </p>

            <div className="mt-6 grid max-w-xl grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {['\u26A1 MERN Stack Specialist', '\uD83C\uDFA8 Premium UI/UX Design', '\uD83D\uDE80 Fast & Reliable Delivery'].map((item) => (
                <div key={item} className="rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-center text-xs text-slate-200 whitespace-normal">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="mx-auto w-full max-w-[230px] sm:max-w-[290px] md:max-w-[330px] lg:max-w-[360px] lg:translate-y-12"
          >
            <div className="relative mx-auto w-full">
              <div className="pointer-events-none absolute inset-0 -z-10">
                <motion.div
                  className="absolute left-1/2 top-[52%] h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple/30 blur-[72px]"
                  animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.72, 0.4] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute left-1/2 top-[55%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/30 blur-[58px]"
                  animate={{ scale: [1.1, 1, 1.1], opacity: [0.62, 0.28, 0.62] }}
                  transition={{ duration: 3.1, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>

              <motion.img
                src={heroImage}
                alt="Jaydeep portrait"
                className="relative z-10 mx-auto h-[260px] w-auto object-contain drop-shadow-[0_26px_45px_rgba(9,20,45,0.62)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_62%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_0%,black_62%,transparent_100%)] sm:h-[340px] md:h-[390px] lg:h-[440px]"
                animate={{
                  y: [0, -3, 0, 2, 0],
                  x: [0, 2, 0, -2, 0],
                  rotate: [0, 0.45, 0, -0.45, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
              />


            </div>
          </motion.div>
        </section>

        <section className="relative z-30 grid gap-4 pb-2 md:grid-cols-2 md:pb-3 lg:pb-4">
          {options.map((item, index) => {
            const Icon = item.icon
            const selected = activePath === item.path
            const isServicesCard = item.id === 'services'

            return (
              <TiltCard key={item.id} className="group rounded-3xl" glowClass={`bg-gradient-to-br ${item.glow}`}>
                <motion.article
                  className={`relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-5 shadow-glass backdrop-blur-2xl sm:p-6 ${
                    selected ? 'ring-2 ring-brand-blue/60' : ''
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: index * 0.12 }}
                >
                  {isServicesCard ? (
                    <div className="pointer-events-none absolute left-1/2 top-0 hidden h-20 w-56 -translate-x-1/2 -translate-y-[70%] rounded-full bg-gradient-to-b from-brand-blue/35 via-brand-blue/10 to-transparent blur-2xl lg:block" />
                  ) : null}
                  <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-brand-purple/25 blur-3xl" />
                  <div className="absolute -bottom-16 -right-8 h-36 w-36 rounded-full bg-brand-blue/20 blur-3xl" />

                  <div className="relative flex h-full flex-col gap-4">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-brand-blue">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="pb-0.5">
                      <h2 className="font-display text-xl font-semibold leading-[1.22] text-white md:text-2xl">{item.heading}</h2>
                      <p className="mt-1 text-sm text-slate-300">{item.subtitle}</p>
                    </div>

                    <MagneticButton
                      className="mt-auto inline-flex items-center gap-2 rounded-2xl border border-brand-blue/50 bg-brand-blue/20 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue/30"
                      onClick={() => handleNavigate(item.path)}
                    >
                      {item.button}
                      <ArrowRight className="h-4 w-4" />
                    </MagneticButton>
                  </div>
                </motion.article>
              </TiltCard>
            )
          })}
        </section>
      </div>
    </main>
  )
}



