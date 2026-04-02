import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'

function FloatingMesh({ position, color, shape, speed = 0.35, scale = 1 }) {
  const meshRef = useRef(null)

  useFrame((state, delta) => {
    if (!meshRef.current) {
      return
    }

    meshRef.current.rotation.x += delta * speed
    meshRef.current.rotation.y += delta * speed * 0.9
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 1.4) * 0.35
  })

  const geometry = useMemo(() => {
    if (shape === 'octa') {
      return <octahedronGeometry args={[1, 0]} />
    }
    if (shape === 'torus') {
      return <torusGeometry args={[0.75, 0.22, 16, 64]} />
    }
    return <icosahedronGeometry args={[1, 0]} />
  }, [shape])

  return (
    <Float speed={1.4} rotationIntensity={0.65} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometry}
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.2}
          wireframe
          emissive={color}
          emissiveIntensity={0.4}
          transparent
          opacity={0.75}
        />
      </mesh>
    </Float>
  )
}

export default function ThreeBackground({ variant = 'portfolio' }) {
  const palette =
    variant === 'services'
      ? ['#06B6D4', '#22C55E', '#7C3AED']
      : ['#7C3AED', '#06B6D4', '#22C55E']

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-85">
      <Canvas camera={{ position: [0, 0, 7], fov: 52 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.35} />
        <pointLight position={[6, 4, 4]} intensity={1.3} color={palette[0]} />
        <pointLight position={[-5, -4, 3]} intensity={1.1} color={palette[1]} />
        <FloatingMesh position={[-2.4, 1.1, -1.2]} color={palette[0]} shape="octa" scale={0.9} />
        <FloatingMesh position={[2.6, -0.8, -1]} color={palette[1]} shape="torus" scale={1} speed={0.42} />
        <FloatingMesh position={[0.2, 2.1, -1.5]} color={palette[2]} shape="ico" scale={0.65} speed={0.5} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

