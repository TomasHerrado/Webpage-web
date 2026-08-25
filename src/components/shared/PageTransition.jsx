import { motion } from 'framer-motion'

function PageTransition({ children, transitionKey }) {
  return (
    <motion.div
      key={transitionKey}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition