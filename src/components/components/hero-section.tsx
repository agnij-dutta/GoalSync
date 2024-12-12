import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { Button } from './ui/button'
import Link from 'next/link'

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const torusRef = useRef<THREE.Mesh | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
    const material = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true })
    const torus = new THREE.Mesh(geometry, material)
    torusRef.current = torus

    scene.add(torus)

    camera.position.z = 30

    const animate = () => {
      requestAnimationFrame(animate)

      if (!isDragging) {
        torus.rotation.x += 0.01
        torus.rotation.y += 0.005
      }

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isDragging])

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true)
    setPreviousMousePosition({
      x: event.clientX,
      y: event.clientY,
    })
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !torusRef.current) return

    const deltaMove = {
      x: event.clientX - previousMousePosition.x,
      y: event.clientY - previousMousePosition.y,
    }

    torusRef.current.rotation.y += deltaMove.x * 0.01
    torusRef.current.rotation.x += deltaMove.y * 0.01

    setPreviousMousePosition({
      x: event.clientX,
      y: event.clientY,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div className="relative h-screen">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 to-white/80 dark:from-gray-900/80 dark:to-gray-800/80" />
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Transform Your Goals into Reality
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl"
        >
          Join GoalSync and turn your dreams into achievements with our powerful goal-setting and tracking platform.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/register" passHref legacyBehavior>
            <Button size="lg" className="text-lg px-8 py-6" as="a">
              Start Achieving Together
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

