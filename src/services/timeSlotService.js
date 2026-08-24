import api from './api'

export const timeSlotService = {
  getAll: async () => {
    const { data } = await api.get('/admin/time-slots')
    return data
  },

  create: async (payload) => {
    const { data } = await api.post('/admin/time-slots', payload)
    return data
  },

  update: async (id, payload) => {
    const { data } = await api.put(`/admin/time-slots/${id}`, payload)
    return data
  },

  delete: async (id) => {
    await api.delete(`/admin/time-slots/${id}`)
  },
}