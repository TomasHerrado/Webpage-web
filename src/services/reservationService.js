import api from './api'

export const reservationService = {
  create: async (payload) => {
    const { data } = await api.post('/reservations', payload)
    return data
  },

  getByCode: async (code) => {
    const { data } = await api.get(`/reservations/${code}`)
    return data
  },

  cancel: async (code) => {
    await api.delete(`/reservations/${code}`)
  },
}