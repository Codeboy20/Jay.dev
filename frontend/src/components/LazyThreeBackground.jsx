import { lazy, Suspense } from 'react'

const ThreeBackground = lazy(() => import('./ThreeBackground'))

export default function LazyThreeBackground({ variant }) {
  return (
    <Suspense fallback={<div className="pointer-events-none absolute inset-0 -z-10 bg-transparent" />}>
      <ThreeBackground variant={variant} />
    </Suspense>
  )
}
