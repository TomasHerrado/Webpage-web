import { useState, useEffect } from 'react'

const emptyItem = {
  name: '',
  description: '',
  price: '',
  imageUrl: '',
  available: true,
  vegetarian: false,
  vegan: false,
  glutenFree: false,
  spicy: false,
  displayOrder: 0,
  categoryId: '',
}

function MenuItemForm({ categories, onSubmit, editingItem, onCancelEdit }) {
  const [formData, setFormData] = useState(emptyItem)

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name || '',
        description: editingItem.description || '',
        price: editingItem.price || '',
        imageUrl: editingItem.imageUrl || '',
        available: editingItem.available ?? true,
        vegetarian: editingItem.vegetarian || false,
        vegan: editingItem.vegan || false,
        glutenFree: editingItem.glutenFree || false,
        spicy: editingItem.spicy || false,
        displayOrder: editingItem.displayOrder || 0,
        categoryId: editingItem.categoryId || '',
      })
    } else {
      setFormData(emptyItem)
    }
  }, [editingItem])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      price: Number(formData.price),
      displayOrder: Number(formData.displayOrder),
      categoryId: Number(formData.categoryId),
    })
    setFormData(emptyItem)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#1a1a1a] border border-white/5 rounded-xl p-5 flex flex-col gap-4">
      <h3 className="font-heading text-lg">{editingItem ? 'Editar plato' : 'Nuevo plato'}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-white/60">Nombre</label>
          <input
            type="text" name="name" value={formData.name} onChange={handleChange}
            className="bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-white/60">Categoría</label>
          <select
            name="categoryId" value={formData.categoryId} onChange={handleChange}
            className="bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
            required
          >
            <option value="">Seleccionar...</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-white/60">Precio</label>
          <input
            type="number" step="0.01" name="price" value={formData.price} onChange={handleChange}
            className="bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-white/60">Orden</label>
          <input
            type="number" name="displayOrder" value={formData.displayOrder} onChange={handleChange}
            className="bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>

        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className="text-xs text-white/60">URL de imagen</label>
          <input
            type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange}
            className="bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>

        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className="text-xs text-white/60">Descripción</label>
          <textarea
            name="description" value={formData.description} onChange={handleChange} rows={2}
            className="bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent resize-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <Checkbox label="Disponible" name="available" checked={formData.available} onChange={handleChange} />
        <Checkbox label="Vegetariano" name="vegetarian" checked={formData.vegetarian} onChange={handleChange} />
        <Checkbox label="Vegano" name="vegan" checked={formData.vegan} onChange={handleChange} />
        <Checkbox label="Sin TACC" name="glutenFree" checked={formData.glutenFree} onChange={handleChange} />
        <Checkbox label="Picante" name="spicy" checked={formData.spicy} onChange={handleChange} />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-primary hover:opacity-90 transition-opacity text-white text-sm font-medium rounded-lg px-4 py-2"
        >
          {editingItem ? 'Guardar cambios' : 'Crear plato'}
        </button>

        {editingItem && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-sm text-white/60 hover:text-white px-3 py-2"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

function Checkbox({ label, name, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 text-white/70 cursor-pointer">
      <input type="checkbox" name={name} checked={checked} onChange={onChange} className="accent-primary" />
      {label}
    </label>
  )
}

export default MenuItemForm