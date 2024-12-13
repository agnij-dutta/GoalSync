import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { Users, Target, TrendingUp, Shield, Github, Linkedin, Mail, Moon, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../ThemeProvider'

// Define types for props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
}

// Button component
const Button: React.FC<ButtonProps> = ({ children, variant = 'default', size = 'default', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90'
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  }
  const sizes = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 rounded-md',
    lg: 'h-11 px-8 rounded-md',
    icon: 'h-10 w-10',
  }
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// FeatureCard component
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-6 rounded-xl bg-white dark:bg-gray-700 shadow-lg border border-gray-100 dark:border-gray-600 transition-colors duration-300"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  )
}

// TestimonialCard component
const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-6 rounded-xl bg-white dark:bg-gray-700 shadow-lg transition-colors duration-300"
    >
      <p className="text-gray-600 dark:text-gray-300 mb-4">"{quote}"</p>
      <p className="font-semibold text-gray-900 dark:text-white">{author}</p>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{role}</p>
    </motion.div>
  )
}

// Header component
const Header: React.FC = () => {
  const { theme, setTheme } = useTheme()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-2xl font-bold text-blue-600 dark:text-blue-400 mr-8 hover:text-blue-700 dark:hover:text-blue-300"
        >
          GoalSync
        </button>
        <nav className="flex-grow">
          <ul className="flex space-x-6">
            <li>
              <Link 
                to="#features" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('features');
                }}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Features
              </Link>
            </li>
            <li>
              <Link 
                to="#testimonials"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('testimonials');
                }}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Testimonials
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Link to="/login">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link to="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

// HeroSection component
const HeroSection: React.FC = () => {
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

      if (!isDragging && torusRef.current) {
        torusRef.current.rotation.x += 0.01
        torusRef.current.rotation.y += 0.005
      }

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      if (canvasRef.current) {
        camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight)
      }
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
          <Link to="/register">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Achieving Together
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

// Main LandingPage component
const LandingPage: React.FC = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Header />

      <main className="pt-16">
        <HeroSection />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 py-20"
          id="features"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />}
                title="Accountability Pods"
                description="Join small groups of 3-5 people with similar goals for maximum support and motivation."
              />
              <FeatureCard
                icon={<Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />}
                title="Smart Goal Setting"
                description="Use our SMART framework to set achievable and measurable goals."
              />
              <FeatureCard
                icon={<TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />}
                title="Progress Tracking"
                description="Visual progress meters and milestone tracking to keep you motivated."
              />
              <FeatureCard
                icon={<Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />}
                title="Commitment System"
                description="Optional financial stakes and verification systems for serious goal-setters."
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-50 dark:bg-gray-900 py-20"
          id="testimonials"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
              Trusted by Goal-Achievers Worldwide
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TestimonialCard
                quote="GoalSync transformed how I approach my fitness goals. The accountability pod system is genius!"
                author="Sarah M."
                role="Fitness Enthusiast"
              />
              <TestimonialCard
                quote="Finally achieved my entrepreneurial goals with the support of my accountability partners."
                author="James K."
                role="Startup Founder"
              />
              <TestimonialCard
                quote="The progress tracking and community support made all the difference in my learning journey."
                author="Lisa R."
                role="Software Developer"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-50 dark:bg-gray-900 py-20"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">How GoalSync Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <ol className="space-y-6">
                  <li className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                    <p className="text-lg">Set your goals using our SMART framework</p>
                  </li>
                  <li className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                    <p className="text-lg">Join an accountability pod or create your own</p>
                  </li>
                  <li className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                    <p className="text-lg">Track your progress and celebrate milestones</p>
                  </li>
                  <li className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                    <p className="text-lg">Achieve your goals with support and motivation</p>
                  </li>
                </ol>
              </div>
              <div>
                <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-8">
                  <h3 className="text-2xl font-bold mb-4 text-center">Start Your Journey Today</h3>
                  <p className="text-lg text-center">
                    Join GoalSync and transform the way you achieve your goals. Our platform is designed to support you every step of the way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Agnij Dutta</h3>
              <div className="flex items-center justify-center md:justify-start space-x-4">
                <a
                  href="mailto:agnijdutta413@gmail.com"
                  className="hover:text-blue-400 transition flex items-center"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  agnijdutta413@gmail.com
                </a>
              </div>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://github.com/agnij-dutta"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition flex items-center"
              >
                <Github className="h-6 w-6 mr-2" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/agnij-dutta-718060309/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition flex items-center"
              >
                <Linkedin className="h-6 w-6 mr-2" />
                LinkedIn
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} GoalSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

