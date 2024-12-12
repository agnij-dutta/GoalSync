import { motion } from 'framer-motion'

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
}

export function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
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

