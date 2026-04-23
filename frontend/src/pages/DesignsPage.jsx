import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, ChevronLeft, Minus, Plus, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import HeroBackdropElements from '../components/HeroBackdropElements'
import MagneticButton from '../components/MagneticButton'
import SectionReveal from '../components/SectionReveal'
import LazyThreeBackground from '../components/LazyThreeBackground'
import { portfolioDesigns } from '../data/content'

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

export default function DesignsPage() {
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

  const scrollToGallery = () => {
    document.getElementById('designs-gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
  const heroDesigns = portfolioDesigns.slice(0, 3)
  const featuredDesign = heroDesigns[1] || heroDesigns[0]
  const sideDesigns = heroDesigns.filter((design) => design !== featuredDesign).slice(0, 2)

  return (
    <main className="relative overflow-hidden pb-20">
      <header className="relative min-h-[100svh] px-5 pb-10 pt-8 md:px-10 md:pb-12 md:pt-10">
        <LazyThreeBackground variant="portfolio" />
        <div className="absolute inset-0 bg-premium-gradient opacity-85" />
        <HeroBackdropElements variant="portfolio" />

        <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-100"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
            <Link to="/services" className="text-sm text-brand-blue underline-offset-4 hover:underline">
              Need business services?
            </Link>
          </div>

          <div className="mt-3 grid flex-1 items-start gap-5 lg:grid-cols-[0.98fr_1.02fr]">
            <div className="flex flex-col justify-start pt-1 md:pr-4 lg:max-w-[42rem]">
              <p className="mb-2.5 text-xs uppercase tracking-[0.22em] text-brand-blue">Design Mode</p>
              <h1 className="max-w-none font-display text-[clamp(2.8rem,4.4vw,4.1rem)] font-semibold leading-[0.88] text-white lg:max-w-[8.5ch]">
                Designs that stop the scroll and make brands feel impossible to ignore.
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300 md:text-[0.95rem]">
                A focused gallery for posters, ads, and social creatives with a sharper presentation, cleaner browsing flow, and a stronger first impression.
              </p>

              <div className="mt-3 flex flex-wrap gap-3">
                <MagneticButton
                  className="inline-flex items-center gap-2 rounded-full border border-brand-blue/60 bg-brand-blue/20 px-6 py-3 text-sm font-semibold text-white"
                  onClick={scrollToGallery}
                >
                  Explore Designs
                  <ChevronDown className="h-4 w-4" />
                </MagneticButton>
                <MagneticButton
                  className="inline-flex items-center gap-2 rounded-full border border-brand-neon/60 bg-brand-neon/20 px-6 py-3 text-sm font-semibold text-white"
                  onClick={() => window.open(RESUME_URL, '_blank', 'noopener,noreferrer')}
                >
                  View Resume
                  <ArrowUpRight className="h-4 w-4" />
                </MagneticButton>
              </div>

              <div className="mt-3 grid max-w-xl gap-2.5 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.14em] text-brand-blue">Collection</p>
                  <p className="mt-2 text-sm text-slate-100">{portfolioDesigns.length} visuals</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.14em] text-brand-blue">Platform</p>
                  <p className="mt-2 text-sm text-slate-100">Canva creations</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.14em] text-brand-blue">Format</p>
                  <p className="mt-2 text-sm text-slate-100">Full-screen preview</p>
                </div>
              </div>
            </div>

            <div className="mx-auto hidden w-full max-w-[440px] items-start justify-center pt-1 lg:flex xl:max-w-[500px]">
              {heroDesigns.length > 0 ? (
                <div className="relative h-[360px] w-full lg:h-[390px] xl:h-[440px]">
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-[20%] top-[14%] h-32 w-32 rounded-full bg-brand-blue/22 blur-[82px] sm:h-48 sm:w-48" />
                    <div className="absolute right-[15%] top-[15%] h-28 w-28 rounded-full bg-amber-300/18 blur-[72px] sm:h-40 sm:w-40" />
                    <div className="absolute bottom-[12%] left-[32%] h-36 w-36 rounded-full bg-emerald-400/14 blur-[90px] sm:h-52 sm:w-52" />
                    <div className="absolute inset-x-[18%] bottom-[8%] h-24 rounded-full bg-black/30 blur-[36px]" />
                  </div>

                  {featuredDesign ? (
                    <motion.button
                      type="button"
                      className="absolute right-[10%] top-[4%] z-20 h-[180px] w-[42%] overflow-hidden rounded-[1.5rem] border border-white/18 bg-white/[0.05] p-2 lg:h-[190px] xl:h-[230px] xl:rounded-[1.6rem] xl:p-2.5"
                      initial={{ opacity: 0, y: 24, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.65, delay: 0.18 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      onClick={() => openDesignModal(featuredDesign)}
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-[1.15rem] border border-white/10 bg-slate-950/30 xl:rounded-[1.25rem]">
                        <img src={featuredDesign.image} alt={featuredDesign.title} loading="lazy" className="h-full w-full object-cover object-top" />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[44%] bg-gradient-to-t from-[rgba(2,6,23,0.97)] via-[rgba(2,6,23,0.55)] to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-2.5 text-left sm:p-3 xl:p-4">
                          <p className="text-[11px] uppercase tracking-[0.24em] text-brand-blue">{featuredDesign.platform}</p>
                          <h2 className="mt-1.5 font-display text-sm font-semibold text-white sm:text-base xl:mt-2 xl:text-lg">{featuredDesign.title}</h2>
                        </div>
                      </div>
                    </motion.button>
                  ) : null}

                  {sideDesigns[0] ? (
                    <motion.button
                      type="button"
                      className="absolute left-[13%] top-[25%] z-10 h-[180px] w-[42%] overflow-hidden rounded-[1.5rem] border border-white/14 bg-white/[0.04] p-2 lg:h-[190px] xl:h-[230px] xl:rounded-[1.6rem] xl:p-2.5"
                      initial={{ opacity: 0, x: -20, y: 20, rotate: -8 }}
                      animate={{ opacity: 1, x: 0, y: 0, rotate: -7 }}
                      transition={{ duration: 0.6, delay: 0.08 }}
                      whileHover={{ y: -8, rotate: -5, scale: 1.02 }}
                      onClick={() => openDesignModal(sideDesigns[0])}
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-[1.15rem] border border-white/10 bg-slate-950/30 xl:rounded-[1.25rem]">
                        <img src={sideDesigns[0].image} alt={sideDesigns[0].title} loading="lazy" className="h-full w-full object-cover object-top" />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-[rgba(2,6,23,0.95)] via-[rgba(2,6,23,0.42)] to-transparent" />
                      </div>
                    </motion.button>
                  ) : null}

                  {sideDesigns[1] ? (
                    <motion.button
                      type="button"
                      className="absolute bottom-[3%] right-[12%] z-10 h-[180px] w-[42%] overflow-hidden rounded-[1.5rem] border border-white/14 bg-white/[0.04] p-2 lg:h-[190px] xl:h-[230px] xl:rounded-[1.6rem] xl:p-2.5"
                      initial={{ opacity: 0, x: 20, y: 20, rotate: 8 }}
                      animate={{ opacity: 1, x: 0, y: 0, rotate: 7 }}
                      transition={{ duration: 0.6, delay: 0.14 }}
                      whileHover={{ y: -8, rotate: 5, scale: 1.02 }}
                      onClick={() => openDesignModal(sideDesigns[1])}
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-[1.15rem] border border-white/10 bg-slate-950/30 xl:rounded-[1.25rem]">
                        <img src={sideDesigns[1].image} alt={sideDesigns[1].title} loading="lazy" className="h-full w-full object-cover object-top" />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-[rgba(2,6,23,0.95)] via-[rgba(2,6,23,0.42)] to-transparent" />
                      </div>
                    </motion.button>
                  ) : null}
                </div>
              ) : (
                <div className="glass-panel w-full rounded-[2rem] p-8 text-sm text-slate-300">
                  Add your design files into <span className="font-semibold text-white">frontend/src/assets/canva</span> and they will show up here automatically.
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-5 pt-8 md:px-10">
        <div id="designs-gallery">
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
