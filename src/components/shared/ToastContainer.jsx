import { AnimatePresence, motion } from 'framer-motion'
import { useToastStore } from '../../store/toastStore'

function ToastContainer() {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={() => removeToast(toast.id)}
            className={
              'cursor-pointer rounded-lg px-4 py-3 text-sm shadow-lg border backdrop-blur-sm max-w-xs ' +
              (toast.type === 'error'
                ? 'bg-red-500/10 border-red-500/30 text-red-400'
                : 'bg-[#1a1a1a] border-white/10 text-white')
            }
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default ToastContainer