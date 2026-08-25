import api from './api'

export const blockedDateService = {
  getAll: async () => {
    const { data } = await api.get('/admin/blocked-dates')
    return data
  },

  create: async (payload) => {
    const { data } = await api.post('/admin/blocked-dates', payload)
    return data
  },

  delete: async (id) => {
    await api.delete(`/admin/blocked-dates/${id}`)
  },
}