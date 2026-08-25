import { AnimatePresence, motion } from 'framer-motion'
import { useConfirmStore } from '../../store/confirmStore'

function ConfirmDialog() {
  const { isOpen, message, handleConfirm, handleCancel } = useConfirmStore()

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
          onClick={handleCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 max-w-sm w-full"
          >
            <p className="text-white mb-6">{message}</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="text-sm text-white/60 hover:text-white px-4 py-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="bg-red-500/90 hover:bg-red-500 transition-colors text-white text-sm font-medium px-4 py-2 rounded-lg"
              >
                Eliminar
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default ConfirmDialog