import { AnimatePresence, motion } from 'framer-motion'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import PageLoader from './components/PageLoader'
import ScrollProgress from './components/ScrollProgress'
import { useLenis } from './hooks/useLenis'

const LandingChoice = lazy(() => import('./pages/LandingChoice'))
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))

const BOOT_LOADER_MS = 1700
const ROUTE_LOADER_MS = 900
const ROUTE_QUOTES = {
  '/': 'Choosing the cleanest render path.',
  '/portfolio': 'Shipping pixels with purpose.',
  '/services': 'Building systems that convert.',
}

function getLoaderQuote(pathname) {
  return ROUTE_QUOTES[pathname] || 'Compiling the next interface.'
}

function AnimatedRoutes({ location }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={location.pathname}
        className="min-h-screen"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <Suspense fallback={<PageLoader mode="route" quote={getLoaderQuote(location.pathname)} />}>
          <Routes location={location}>
            <Route path="/" element={<LandingChoice />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="*" element={<LandingChoice />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [routeLoading, setRouteLoading] = useState(false)
  const routeTimerRef = useRef(null)
  const lastPathRef = useRef(location.pathname)

  useLenis()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), BOOT_LOADER_MS)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (loading) {
      lastPathRef.current = location.pathname
      return undefined
    }

    if (lastPathRef.current === location.pathname) {
      return undefined
    }

    lastPathRef.current = location.pathname
    const frameId = window.requestAnimationFrame(() => {
      setRouteLoading(true)
    })

    if (routeTimerRef.current) {
      clearTimeout(routeTimerRef.current)
    }

    routeTimerRef.current = setTimeout(() => {
      setRouteLoading(false)
      routeTimerRef.current = null
    }, ROUTE_LOADER_MS)

    return () => {
      window.cancelAnimationFrame(frameId)
      if (routeTimerRef.current) {
        clearTimeout(routeTimerRef.current)
      }
    }
  }, [loading, location.pathname])

  useEffect(() => {
    return () => {
      if (routeTimerRef.current) {
        clearTimeout(routeTimerRef.current)
      }
    }
  }, [])

  return (
    <>
      <ScrollProgress />

      <AnimatePresence mode="wait">
        {loading ? <PageLoader key="boot-loader" mode="boot" quote={getLoaderQuote(location.pathname)} /> : null}
      </AnimatePresence>
      {!loading ? <AnimatedRoutes location={location} /> : null}
      <AnimatePresence>
        {!loading && routeLoading ? (
          <PageLoader key={`route-loader-${location.pathname}`} mode="route" quote={getLoaderQuote(location.pathname)} />
        ) : null}
      </AnimatePresence>
    </>
  )
}

