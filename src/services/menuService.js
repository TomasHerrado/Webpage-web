import api from './api'

export const menuService = {
  getFullMenu: async () => {
    const { data } = await api.get('/menu')
    return data
  },

  // --- Admin ---
  createCategory: async (payload) => {
    const { data } = await api.post('/admin/menu-categories', payload)
    return data
  },

  updateCategory: async (id, payload) => {
    const { data } = await api.put(`/admin/menu-categories/${id}`, payload)
    return data
  },

  deleteCategory: async (id) => {
    await api.delete(`/admin/menu-categories/${id}`)
  },

  createItem: async (payload) => {
    const { data } = await api.post('/admin/menu-items', payload)
    return data
  },

  updateItem: async (id, payload) => {
    const { data } = await api.put(`/admin/menu-items/${id}`, payload)
    return data
  },

  deleteItem: async (id) => {
    await api.delete(`/admin/menu-items/${id}`)
  },

  toggleItemAvailability: async (id) => {
    const { data } = await api.patch(`/admin/menu-items/${id}/toggle-availability`)
    return data
  },
}