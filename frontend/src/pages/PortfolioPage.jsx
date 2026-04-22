import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ChevronDown, ChevronLeft, Minus, Plus, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import HeroBackdropElements from '../components/HeroBackdropElements'
import portfolioHeroImage from '../assets/images/image2.png'
import MagneticButton from '../components/MagneticButton'
import SectionReveal from '../components/SectionReveal'
import LazyThreeBackground from '../components/LazyThreeBackground'
import TiltCard from '../components/TiltCard'
import {
  portfolioCertifications,
  portfolioDesigns,
  portfolioProjects,
  portfolioSkills,
  portfolioTechnologies,
  portfolioTimeline,
} from '../data/content'

const RESUME_URL = 'https://drive.google.com/file/d/17V115FMnDoENaAZnUvMeL7UV1yNm0llA/view?usp=sharing'
const MIN_ZOOM = 1
const MAX_ZOOM = 3.2

const clampZoom = (value) => Math.min(Math.max(value, MIN_ZOOM), MAX_ZOOM)

const getViewerFit = (naturalWidth, naturalHeight) => {
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1280
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900
  const maxWidth = Math.max(280, Math.min(viewportWidth - 48, 980))
  const maxHeight = Math.max(320, viewportHeight - 210)
  const scale = Math.min(maxWidth / naturalWidth, maxHeight / naturalHeight, 1)

  return {
    width: Math.round(naturalWidth * scale),
    height: Math.round(naturalHeight * scale),
  }
}

export default function PortfolioPage() {
  const { scrollYProgress } = useScroll()
  const titleY = useTransform(scrollYProgress, [0, 0.4], [0, -70])
  const subtitleY = useTransform(scrollYProgress, [0, 0.4], [0, -40])
  const [selectedDesign, setSelectedDesign] = useState(null)
  const [designZoom, setDesignZoom] = useState(MIN_ZOOM)
  const [designFit, setDesignFit] = useState(null)
  const [isDraggingDesign, setIsDraggingDesign] = useState(false)
  const designViewportRef = useRef(null)
  const designDragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  })

  useEffect(() => {
    if (!selectedDesign) {
      return undefined
    }

    const originalBodyOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    window.dispatchEvent(new Event('lenis-stop'))

    let isActive = true
    let naturalSize = null

    const syncDesignFit = () => {
      if (!isActive || !naturalSize) {
        return
      }

      setDesignFit(getViewerFit(naturalSize.width, naturalSize.height))
    }

    const image = new window.Image()
    image.onload = () => {
      if (!isActive) {
        return
      }

      naturalSize = {
        width: image.naturalWidth,
        height: image.naturalHeight,
      }

      syncDesignFit()
    }
    image.src = selectedDesign.image

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedDesign(null)
        return
      }

      if (event.key === '+' || event.key === '=') {
        setDesignZoom((currentZoom) => clampZoom(currentZoom + 0.2))
      }

      if (event.key === '-') {
        setDesignZoom((currentZoom) => clampZoom(currentZoom - 0.2))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', syncDesignFit)

    return () => {
      isActive = false
      document.body.style.overflow = originalBodyOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
      window.dispatchEvent(new Event('lenis-start'))
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', syncDesignFit)
    }
  }, [selectedDesign])

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!designDragRef.current.active || !designViewportRef.current) {
        return
      }

      const deltaX = event.clientX - designDragRef.current.startX
      const deltaY = event.clientY - designDragRef.current.startY

      designViewportRef.current.scrollLeft = designDragRef.current.scrollLeft - deltaX
      designViewportRef.current.scrollTop = designDragRef.current.scrollTop - deltaY
    }

    const handlePointerUp = () => {
      designDragRef.current.active = false
      setIsDraggingDesign(false)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [])

  const scrollToSection = (id) => {
    const section = document.getElementById(id)

    if (!section) {
      return
    }

    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const openDesignModal = (design) => {
    setSelectedDesign(design)
    setDesignZoom(MIN_ZOOM)
    setDesignFit(null)
  }

  const closeDesignModal = () => {
    setSelectedDesign(null)
    setDesignZoom(MIN_ZOOM)
    setDesignFit(null)
    setIsDraggingDesign(false)
  }

  const updateDesignZoom = (step) => {
    setDesignZoom((currentZoom) => clampZoom(currentZoom + step))
  }

  const handleDesignZoomWheel = (event) => {
    event.preventDefault()
    event.stopPropagation()
    updateDesignZoom(event.deltaY < 0 ? 0.15 : -0.15)
  }

  const handleDesignDragStart = (event) => {
    if (designZoom <= MIN_ZOOM || !designViewportRef.current) {
      return
    }

    event.preventDefault()
    designDragRef.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      scrollLeft: designViewportRef.current.scrollLeft,
      scrollTop: designViewportRef.current.scrollTop,
    }
    setIsDraggingDesign(true)
  }

  const viewerImageWidth = designFit ? Math.round(designFit.width * designZoom) : undefined
  const viewerImageHeight = designFit ? Math.round(designFit.height * designZoom) : undefined

  return (
    <main className="relative overflow-hidden pb-20">
      <header className="relative min-h-[100svh] px-5 pb-16 pt-16 md:px-10 md:pt-20">
        <LazyThreeBackground variant="portfolio" />
        <div className="absolute inset-0 bg-premium-gradient opacity-85" />
        <HeroBackdropElements variant="portfolio" />

        <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-100"
            >
              <ChevronLeft className="h-4 w-4" />
              Switch Experience
            </Link>
            <Link to="/services" className="text-sm text-brand-blue underline-offset-4 hover:underline">
              Need business services?
            </Link>
          </div>

          <div className="mt-8 grid flex-1 items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col justify-center">
              <motion.p style={{ y: subtitleY }} className="mb-4 text-xs uppercase tracking-[0.26em] text-brand-blue">
                Developer Mode
              </motion.p>
              <motion.h1 style={{ y: titleY }} className="max-w-4xl font-display text-3xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Turning ideas into high-performance digital products.
              </motion.h1>
              <motion.p style={{ y: subtitleY }} className="mt-4 max-w-2xl text-sm text-slate-300 md:text-base">
                MERN engineering, advanced UI motion, and clean delivery focused on business results.
              </motion.p>

              <div className="mt-6 flex flex-wrap gap-3">
                <MagneticButton
                  className="rounded-full border border-brand-blue/60 bg-brand-blue/20 px-5 py-2.5 text-sm font-semibold text-white"
                  onClick={() => scrollToSection('contact-section')}
                >
                  Let&apos;s Connect
                </MagneticButton>
                <MagneticButton
                  className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white"
                  onClick={() => scrollToSection('projects-section')}
                >
                  View My Work
                </MagneticButton>
                <MagneticButton
                  className="rounded-full border border-brand-neon/60 bg-brand-neon/20 px-5 py-2.5 text-sm font-semibold text-white"
                  onClick={() => window.open(RESUME_URL, '_blank', 'noopener,noreferrer')}
                >
                  View Resume
                </MagneticButton>
              </div>

              <motion.div
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs tracking-[0.12em] text-slate-200"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ChevronDown className="h-4 w-4 text-brand-blue" />
                Curious what I can create for you? Scroll down to explore more.
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mx-auto w-full max-w-[360px] lg:max-w-none"
            >
              <div className="relative mx-auto w-full max-w-[420px]">
                <div className="pointer-events-none absolute inset-0 -z-10">
                  <motion.div
                    className="absolute left-1/2 top-[52%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple/30 blur-[76px]"
                    animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.72, 0.4] }}
                    transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute left-1/2 top-[55%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/30 blur-[62px]"
                    animate={{ scale: [1.1, 1, 1.1], opacity: [0.62, 0.28, 0.62] }}
                    transition={{ duration: 3.1, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>

                <motion.img
                  src={portfolioHeroImage}
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
          </div>
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-5 pt-8 md:px-10">
        <SectionReveal className="glass-panel rounded-3xl p-6 sm:p-10">
          <p className="section-kicker">About Me</p>
          <h2 className="section-title">Building polished experiences from frontend motion to backend reliability</h2>
          <p className="section-copy">
            I specialize in complete web solutions, from concept to launch, with a strong focus on performance, storytelling, and
            business outcomes. My workflow blends strategy, design sensitivity, and robust engineering for products that users remember.
          </p>
        </SectionReveal>

        <SectionReveal>
          <p className="section-kicker">Skills</p>
          <h2 className="section-title">MERN Stack, Frontend, and Backend Expertise</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {portfolioSkills.map((skill, index) => (
              <TiltCard key={skill.title} className="group rounded-3xl" glowClass="bg-gradient-to-br from-brand-purple/20 via-brand-blue/20 to-transparent">
                <motion.article
                  className="glass-panel rounded-3xl p-6"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h3 className="font-display text-xl font-semibold text-white">{skill.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-slate-300">
                    {skill.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-brand-neon" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </TiltCard>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal>
          <p className="section-kicker">Technologies</p>
          <h2 className="section-title">Technologies I Use</h2>
          <p className="section-copy">Core technologies that makes my development process seamless, plus modern tools I use in production workflows.</p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {portfolioTechnologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="flex items-center justify-center py-3"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                whileHover={{ scale: 1.08 }}
              >
                <img src={tech.logo} alt={`${tech.name} logo`} loading="lazy" className="h-12 w-12 object-contain" />
              </motion.div>
            ))}
          </div>
        </SectionReveal>

        <div id="projects-section">
          <SectionReveal>
            <p className="section-kicker">Projects</p>
            <h2 className="section-title">Recent digital products and premium website builds</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {portfolioProjects.map((project, index) => (
                <motion.article
                  key={project.title}
                  className="glass-panel group flex h-full flex-col rounded-3xl p-6"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="mb-5 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 p-3">
                    <div className="flex aspect-[16/9] items-center justify-center rounded-xl bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_52%),linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.88))] p-2">
                      <img
                        src={project.image}
                        alt={`${project.title} preview`}
                        loading="lazy"
                        className="h-full w-full rounded-lg object-contain object-center shadow-[0_18px_45px_rgba(15,23,42,0.35)]"
                      />
                    </div>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm text-slate-300">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-wrap gap-3 pt-6">
                    <a
                      href={project.previewUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-brand-blue/40 bg-brand-blue/10 px-4 py-2 text-sm font-medium text-brand-blue transition hover:border-brand-blue hover:bg-brand-blue/20 hover:text-white"
                    >
                      Vercel
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
                    >
                      <img src="/contact-logos/github.svg" alt="GitHub logo" className="h-4 w-4 object-contain" />
                      GitHub
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </SectionReveal>
        </div>

        <SectionReveal>
          <p className="section-kicker">Designs</p>
          <h2 className="section-title">My Creative Designs</h2>
          <p className="section-copy">A curated collection of visual ideas shaped into bold, scroll-stopping design stories.</p>

          {portfolioDesigns.length > 0 ? (
            <div className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
              {portfolioDesigns.map((design, index) => (
                <motion.button
                  key={`${design.title}-${index}`}
                  type="button"
                  className="group flex h-full flex-col text-left"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  onClick={() => openDesignModal(design)}
                >
                  <div className="flex min-h-[220px] items-start justify-center sm:min-h-[260px]">
                    <img
                      src={design.image}
                      alt={design.title}
                      loading="lazy"
                      className="h-auto max-h-[240px] w-auto max-w-full object-contain object-top drop-shadow-[0_24px_50px_rgba(3,7,18,0.42)] transition duration-300 group-hover:scale-[1.02] sm:max-h-[280px]"
                    />
                  </div>
                  <div className="mt-4 px-1">
                    <h3 className="font-display text-lg font-semibold text-white">{design.title}</h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-brand-blue">{design.platform}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="glass-panel mt-8 rounded-3xl p-6 text-sm text-slate-300">
              Add your design images to <span className="font-semibold text-white">frontend/src/assets/canva</span> and they will appear here automatically.
            </div>
          )}
        </SectionReveal>

        <SectionReveal>
          <p className="section-kicker">Certifications</p>
          <h2 className="section-title">Top Recognitions</h2>
          <p className="section-copy">Certified by globally recognized organizations like Microsoft and IBM, with expertise in cloud infrastructure, security, data, and AI solutions.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {portfolioCertifications.map((certificate, index) => (
              <motion.article
                key={certificate.title}
                className="glass-panel group relative overflow-hidden rounded-3xl p-5"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.24),transparent_46%),radial-gradient(circle_at_82%_78%,rgba(34,197,94,0.22),transparent_42%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="aspect-[16/10] overflow-hidden rounded-xl bg-white p-1">
                  {certificate.image ? (
                    <img src={certificate.image} alt={`${certificate.title} certificate`} loading="lazy" className="h-full w-full object-contain" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center px-4 text-center text-xs uppercase tracking-[0.12em] text-slate-300">
                      Upload certificate image in `src/assets/images`
                    </div>
                  )}
                </div>

                <p className="mt-4 text-xs uppercase tracking-[0.14em] text-brand-blue">{certificate.organization}</p>
                <h3 className="mt-2 font-display text-lg font-semibold text-white">{certificate.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{certificate.description}</p>
              </motion.article>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal>
          <p className="section-kicker">Experience</p>
          <h2 className="section-title">Professional Timeline</h2>
          <div className="relative mt-8 space-y-8 pl-6 before:absolute before:bottom-0 before:left-1 before:top-0 before:w-px before:bg-gradient-to-b before:from-brand-purple before:to-brand-blue">
            {portfolioTimeline.map((item, index) => (
              <motion.article
                key={item.title}
                className="glass-panel rounded-2xl p-5"
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.55, delay: index * 0.12 }}
              >
                <span className="absolute -left-[0.4rem] mt-2 inline-flex h-3 w-3 rounded-full bg-brand-neon shadow-[0_0_16px_rgba(34,197,94,0.8)]" />
                <p className="text-xs uppercase tracking-[0.14em] text-brand-blue">{item.period}</p>
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src={item.logo}
                    alt={`${item.company} logo`}
                    loading="lazy"
                    className="h-14 w-14 rounded-lg border border-white/20 bg-white/10 p-1 object-contain"
                  />
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-300">{item.company}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-300">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </SectionReveal>

        <div id="contact-section">
          <SectionReveal className="glass-panel rounded-3xl p-6 sm:p-10">
            <p className="section-kicker">Contact</p>
            <h2 className="section-title">Let&apos;s talk about your next product</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              <a className="contact-pill" href="mailto:jaydeep@example.com">
                <img src="/contact-logos/gmail.svg" alt="Gmail logo" className="h-4 w-4 object-contain" />
                Email
              </a>
              <a className="contact-pill" href="https://wa.me/7987576476" target="_blank" rel="noreferrer">
                <img src="/contact-logos/whatsapp.svg" alt="WhatsApp logo" className="h-4 w-4 object-contain" />
                WhatsApp
              </a>
              <a className="contact-pill" href="https://github.com" target="_blank" rel="noreferrer">
                <img src="/contact-logos/github.svg" alt="GitHub logo" className="h-4 w-4 object-contain" />
                GitHub
              </a>
              <a className="contact-pill" href="https://linkedin.com" target="_blank" rel="noreferrer">
                <img src="/contact-logos/linkedin.svg" alt="LinkedIn logo" className="h-4 w-4 object-contain" />
                LinkedIn
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>

      <AnimatePresence>
        {selectedDesign ? (
          <motion.div
            className="fixed inset-0 z-[140] bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.22),transparent_35%),rgba(2,6,23,0.94)] p-3 backdrop-blur-xl sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDesignModal}
            onWheelCapture={handleDesignZoomWheel}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedDesign.title} design preview`}
              className="relative mx-auto flex h-full w-full max-w-7xl flex-col"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-3 flex flex-col gap-3 rounded-[1.75rem] border border-white/12 bg-slate-950/55 px-4 py-4 shadow-[0_25px_70px_rgba(2,6,23,0.45)] backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-brand-blue">{selectedDesign.platform}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">{selectedDesign.title}</h3>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition hover:border-white/30 hover:bg-white/14"
                    onClick={() => updateDesignZoom(-0.2)}
                    aria-label="Zoom out"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-white/30 hover:bg-white/14"
                    onClick={() => setDesignZoom(MIN_ZOOM)}
                  >
                    {Math.round(designZoom * 100)}%
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition hover:border-white/30 hover:bg-white/14"
                    onClick={() => updateDesignZoom(0.2)}
                    aria-label="Zoom in"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition hover:border-white/30 hover:bg-white/14"
                    onClick={closeDesignModal}
                    aria-label="Close image viewer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="relative flex-1 overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.9),rgba(2,6,23,0.98))] shadow-[0_35px_90px_rgba(2,6,23,0.58)]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.1),transparent_30%)]" />
                <div
                  ref={designViewportRef}
                  data-lenis-prevent
                  className={`relative h-full overflow-auto overscroll-contain px-4 py-5 sm:px-8 sm:py-7 ${designZoom > MIN_ZOOM ? (isDraggingDesign ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'}`}
                  onMouseDown={handleDesignDragStart}
                >
                  <div className="flex min-h-full min-w-full items-center justify-center">
                    {designFit ? (
                      <img
                        src={selectedDesign.image}
                        alt={selectedDesign.title}
                        draggable="false"
                        className="block h-auto max-w-none select-none object-contain shadow-[0_30px_80px_rgba(2,6,23,0.55)]"
                        style={{
                          width: `${viewerImageWidth}px`,
                          height: `${viewerImageHeight}px`,
                        }}
                      />
                    ) : (
                      <div className="h-[320px] w-[220px] animate-pulse rounded-[1.5rem] bg-white/10" />
                    )}
                  </div>
                </div>
              </div>

              <p className="mt-3 px-1 text-xs text-slate-400">
                Scroll to zoom, drag to move when zoomed in, and press Esc to close.
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  )
}
