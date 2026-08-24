import { create } from 'zustand'
import { authService } from '../services/authService'

export const useAuthStore = create((set) => ({
  username: localStorage.getItem('admin_username') || null,
  role: localStorage.getItem('admin_role') || null,
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null })
    try {
      const data = await authService.login(credentials)

      localStorage.setItem('admin_token', data.token)
      localStorage.setItem('admin_username', data.username)
      localStorage.setItem('admin_role', data.role)

      set({ username: data.username, role: data.role, isLoading: false })
      return true
    } catch (err) {
      const message = err.response?.data?.error || 'Usuario o contraseña incorrectos'
      set({ error: message, isLoading: false })
      return false
    }
  },

  logout: () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_username')
    localStorage.removeItem('admin_role')
    set({ username: null, role: null })
  },
}))