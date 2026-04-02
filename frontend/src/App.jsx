import { AnimatePresence, motion } from 'framer-motion'
import { lazy, Suspense, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import PageLoader from './components/PageLoader'
import ScrollProgress from './components/ScrollProgress'
import { useLenis } from './hooks/useLenis'

const LandingChoice = lazy(() => import('./pages/LandingChoice'))
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))

function RouteLoader() {
  return (
    <div className="fixed inset-0 z-[98] flex items-center justify-center bg-[#070b14]/80 backdrop-blur-sm">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-blue/30 border-t-brand-blue" />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className="min-h-screen"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <Suspense fallback={<RouteLoader />}>
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
  const [loading, setLoading] = useState(true)

  useLenis()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1700)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <ScrollProgress />

      <AnimatePresence mode="wait">{loading ? <PageLoader key="loader" /> : <AnimatedRoutes key="routes" />}</AnimatePresence>
    </>
  )
}

