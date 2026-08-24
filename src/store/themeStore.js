import { create } from 'zustand'
import { restaurantService } from '../services/restaurantService'
import { applyTheme } from '../config/theme'

export const useThemeStore = create((set) => ({
  restaurant: null,
  isLoading: true,
  error: null,

  loadRestaurantConfig: async () => {
    set({ isLoading: true, error: null })
    try {
      const data = await restaurantService.getConfig()
      applyTheme(data)
      set({ restaurant: data, isLoading: false })
    } catch (err) {
      set({ error: 'No se pudo cargar la configuración del restaurante', isLoading: false })
    }
  },
}))