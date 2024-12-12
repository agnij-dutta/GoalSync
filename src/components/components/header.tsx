import Link from 'next/link'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'

export function Header() {
  const { theme, setTheme } = useTheme()

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
              <Link href="#features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                Features
              </Link>
            </li>
            <li>
              <Link href="#testimonials" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
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
          <Link href="/login" passHref legacyBehavior>
            <Button variant="outline" as="a">Sign In</Button>
          </Link>
          <Link href="/register" passHref legacyBehavior>
            <Button as="a">Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

