import { create } from 'zustand'

export const useConfirmStore = create((set) => ({
  isOpen: false,
  message: '',
  resolveFn: null,

  requestConfirm: (message) => {
    return new Promise((resolve) => {
      set({ isOpen: true, message, resolveFn: resolve })
    })
  },

  handleConfirm: () => {
    set((state) => {
      state.resolveFn?.(true)
      return { isOpen: false, resolveFn: null }
    })
  },

  handleCancel: () => {
    set((state) => {
      state.resolveFn?.(false)
      return { isOpen: false, resolveFn: null }
    })
  },
}))