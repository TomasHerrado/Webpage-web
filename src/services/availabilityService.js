import api from './api'

export const availabilityService = {
  getAvailability: async (dateIso) => {
    const { data } = await api.get('/availability', { params: { date: dateIso } })
    return data
  },
}