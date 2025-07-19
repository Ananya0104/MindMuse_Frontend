"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useState } from "react"

interface WireframeSphereProps {
  isRotating: boolean
  rotationSpeed: number
  glowIntensity: number
}

function WireframeSphere({ isRotating, rotationSpeed, glowIntensity }: WireframeSphereProps) {
  const meshRef = useRef<THREE.Group>(null)
  const innerSphereRef = useRef<THREE.Mesh>(null)

  // Simplified geometry - less complex shapes
  const { sphereGeometry, icosahedronGeometry, torusGeometry } = useMemo(() => {
    const sphere = new THREE.SphereGeometry(2, 24, 12) // Reduced segments
    const icosahedron = new THREE.IcosahedronGeometry(1.8, 1) // Reduced detail
    const torus = new THREE.TorusGeometry(1.5, 0.02, 6, 24) // Reduced segments

    return {
      sphereGeometry: sphere,
      icosahedronGeometry: icosahedron,
      torusGeometry: torus,
    }
  }, [])

  // Only 2 colors matching the amber theme
  const colors = useMemo(
    () => ({
      primary: new THREE.Color(0.9, 0.5, 0.1), // Amber
      secondary: new THREE.Color(0.6, 0.3, 0.1), // Deep Orange/Brown
    }),
    [],
  )

  // Simplified materials - no complex color cycling
  const { material1, material2, glowMaterial } = useMemo(() => {
    const mat1 = new THREE.MeshStandardMaterial({
      color: colors.primary,
      metalness: 0.3,
      roughness: 0.4,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    })

    const mat2 = new THREE.MeshStandardMaterial({
      color: colors.secondary,
      metalness: 0.3,
      roughness: 0.4,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    })

    const glow = new THREE.MeshBasicMaterial({
      color: colors.primary,
      transparent: true,
      opacity: glowIntensity / 500,
      side: THREE.BackSide,
    })

    return { material1: mat1, material2: mat2, glowMaterial: glow }
  }, [colors, glowIntensity])

  useFrame((state) => {
    if (meshRef.current && isRotating) {
      meshRef.current.rotation.x += 0.005 * rotationSpeed
      meshRef.current.rotation.y += 0.01 * rotationSpeed
      meshRef.current.rotation.z += 0.003 * rotationSpeed
    }

    // Simple pulsing effect - less computation
    if (innerSphereRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02
      innerSphereRef.current.scale.setScalar(scale)
    }

    // Simple color breathing - no complex transitions
    const breathe = Math.sin(state.clock.elapsedTime) * 0.1 + 0.9
    if (material1 && material2) {
      material1.opacity = 0.8 * breathe
      material2.opacity = 0.8 * breathe
    }
  })

  return (
    <group ref={meshRef}>
      {/* Glow sphere */}
      <mesh geometry={sphereGeometry} material={glowMaterial} scale={1.05} />

      {/* Main wireframe sphere */}
      <mesh geometry={sphereGeometry} material={material1} />

      {/* Inner icosahedron */}
      <mesh ref={innerSphereRef} geometry={icosahedronGeometry} material={material2} />

      {/* Simplified torus rings - only 2 instead of multiple */}
      <mesh geometry={torusGeometry} material={material1} rotation={[Math.PI / 4, 0, 0]} />
      <mesh geometry={torusGeometry} material={material2} rotation={[0, Math.PI / 4, Math.PI / 3]} />

      {/* Central octahedron */}
      <mesh geometry={new THREE.OctahedronGeometry(0.4)} material={material2} />
    </group>
  )
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)

  // Reduced particle count for better performance
  const { positions, colors } = useMemo(() => {
    const count = 80 // Reduced from 150
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // Random positions in a sphere
      const radius = 8 + Math.random() * 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      // Simple amber colors - no complex cycling
      const isAmber = i % 2 === 0
      colors[i * 3] = isAmber ? 0.9 : 0.6 // R
      colors[i * 3 + 1] = isAmber ? 0.5 : 0.3 // G
      colors[i * 3 + 2] = 0.1 // B
    }

    return { positions, colors }
  }, [])

  // useFrame((state) => {
  //   if (particlesRef.current) {
  //     particlesRef.current.rotation.y += 0.001
  //     particlesRef.current.rotation.x += 0.0005
  //   }
  // })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} transparent opacity={0.4} vertexColors sizeAttenuation />
    </points>
  )
}

const AIMindSphere = () => {
  return (
    <div className="flex flex-col items-center w-full">
      {/* AI Mind Label */}
      <div className="mb-2 sm:mb-4 text-center px-4">
        <h3 className="text-base sm:text-lg font-semibold text-amber-900 mb-1">Vaira&apos;s AI Core</h3>
        <p className="text-xs sm:text-sm text-amber-700 opacity-80">Interactive neural network visualization</p>
      </div>

      {/* 3D Wireframe Sphere Container - Now fully responsive */}
      <div className="relative w-full max-w-2xl aspect-[4/3] sm:aspect-[3/2]">
        <Canvas className="w-full h-full">
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />

          {/* Simplified lighting */}
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ffffff" />

          {/* Environment for reflections */}
          <Environment preset="sunset" />

          {/* Main wireframe sphere */}
          <WireframeSphere isRotating={true} rotationSpeed={1} glowIntensity={40} />

          {/* Particle field */}
          <ParticleField />

          {/* Camera controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={4}
            maxDistance={15}
            autoRotate={false}
          />
        </Canvas>
      </div>

      {/* Interaction hint */}
      <div className="mt-2 sm:mt-4 text-center px-4">
        <p className="text-xs text-amber-600 opacity-70">Drag to interact</p>
      </div>
    </div>
  )
}

export default function Component() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen relative overflow-hidden font-sans">
      {/* Flowing Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/placeholder.svg?height=1080&width=1920')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 to-amber-50/80" />

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation - Now responsive */}
        <nav className="flex items-center justify-between px-4 sm:px-6 py-4 bg-white/90 backdrop-blur-sm border-b border-orange-100">
          <div className="flex items-center">
            <Image src="/godai-logo.png" alt="godai" width={59} height={40} className="h-8 sm:h-10 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a
              href="#"
              className="text-amber-800 hover:text-amber-900 transition-colors font-medium text-sm lg:text-base"
            >
              Home
            </a>
            <a
              href="#"
              className="text-amber-800 hover:text-amber-900 transition-colors font-medium text-sm lg:text-base"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("help")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              How it helps
            </a>
            <a
              href="#"
              className="text-amber-800 hover:text-amber-900 transition-colors font-medium text-sm lg:text-base"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("newsletter")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Join Waitlist
            </a>
            <a
              href="#"
              className="text-amber-800 hover:text-amber-900 transition-colors font-medium text-sm lg:text-base"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("about-us")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              About Us
            </a>
            <Button
              className="bg-amber-800 hover:bg-amber-900 text-white px-3 lg:px-4 py-2 rounded-full font-medium text-sm lg:text-base"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("vaira")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Talk to Vaira
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-amber-800" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm border-b border-orange-100 px-4 py-4">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-amber-800 hover:text-amber-900 transition-colors font-medium">
                Home
              </a>
              <a
                href="#"
                className="text-amber-800 hover:text-amber-900 transition-colors font-medium"
                onClick={(e) => {
                  e.preventDefault()
                  setIsMobileMenuOpen(false)
                  document.getElementById("help")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                How it helps
              </a>
              <a
                href="#"
                className="text-amber-800 hover:text-amber-900 transition-colors font-medium"
                onClick={(e) => {
                  e.preventDefault()
                  setIsMobileMenuOpen(false)
                  document.getElementById("newsletter")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Join Waitlist
              </a>
              <a
                href="#"
                className="text-amber-800 hover:text-amber-900 transition-colors font-medium"
                onClick={(e) => {
                  e.preventDefault()
                  setIsMobileMenuOpen(false)
                  document.getElementById("about-us")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                About Us
              </a>
              <Button
                className="bg-amber-800 hover:bg-amber-900 text-white px-4 py-2 rounded-full font-medium w-fit"
                onClick={(e) => {
                  e.preventDefault()
                  setIsMobileMenuOpen(false)
                  document.getElementById("vaira")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Talk to Vaira
              </Button>
            </div>
          </div>
        )}

        {/* Hero Section - Now fully responsive */}
        <div id="herosection" className="container mx-auto px-4 sm:px-6 py-6 sm:py-12">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center mb-8 sm:mb-16">
            {/* Left side - AI Mind Sphere */}
            <div className="order-2 lg:order-1 flex justify-center">
              <AIMindSphere />
            </div>

            {/* Right side - Future of AI Content */}
            <div className="order-1 lg:order-2 text-left max-w-2xl">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-8">
                <span className="text-amber-900">Where</span>
                <br />
                <span className="text-amber-500 opacity-70">
                  <i>Feelings Meet Tech</i>
                </span>
                <br />
                <span className="text-amber-900">Gently</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-amber-800 mb-6 sm:mb-12 leading-relaxed">
                Our AI is here to offer thoughtful, personal support - just like a trusted friend would.
              </p>
              <Button className="bg-amber-900 hover:bg-amber-800 text-white rounded-full px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-medium">
                Talk to Vaira
                <span className="ml-2">→</span>
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center mb-8 sm:mb-16">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-['DM_Sans_Display'] text-amber-900 mb-4 sm:mb-6 max-w-3xl mx-auto px-4">
              Not ready for therapy? Start with us.
            </h1>
            <p className="text-base sm:text-lg text-amber-800 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed font-normal px-4">
              A gentle AI therapy buddy that listens, supports, and helps you breathe better - anytime, anywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <Button className="bg-amber-900 hover:bg-amber-800 text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-medium w-full sm:w-auto">
                Talk to vaira →
              </Button>
              <Button
                variant="outline"
                className="border-amber-700 text-amber-700 hover:bg-amber-50 bg-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-medium w-full sm:w-auto"
              >
                Join waitlist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
