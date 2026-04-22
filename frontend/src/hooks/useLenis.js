import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.1,
    })

    lenisRef.current = lenis

    let frame = null
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }

    frame = requestAnimationFrame(raf)

    const stopLenis = () => lenis.stop()
    const startLenis = () => lenis.start()

    window.addEventListener('lenis-stop', stopLenis)
    window.addEventListener('lenis-start', startLenis)

    return () => {
      if (frame) {
        cancelAnimationFrame(frame)
      }
      window.removeEventListener('lenis-stop', stopLenis)
      window.removeEventListener('lenis-start', startLenis)
      lenis.destroy()
    }
  }, [])

  return lenisRef
}

