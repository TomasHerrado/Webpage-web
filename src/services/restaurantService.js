import api from './api'

export const restaurantService = {
  getConfig: async () => {
    const { data } = await api.get('/restaurant')
    return data
  },

  updateConfig: async (payload) => {
    const { data } = await api.put('/admin/restaurant', payload)
    return data
  },
}