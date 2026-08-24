import { useState, useEffect } from 'react'

function CategoryForm({ onSubmit, editingCategory, onCancelEdit }) {
  const [name, setName] = useState('')
  const [displayOrder, setDisplayOrder] = useState(0)

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name)
      setDisplayOrder(editingCategory.displayOrder || 0)
    } else {
      setName('')
      setDisplayOrder(0)
    }
  }, [editingCategory])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ name, displayOrder: Number(displayOrder) })
    setName('')
    setDisplayOrder(0)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-end bg-[#1a1a1a] border border-white/5 rounded-xl p-4">
      <div className="flex flex-col gap-1 flex-1">
        <label className="text-xs text-white/60">Nombre de la categoría</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
          required
        />
      </div>

      <div className="flex flex-col gap-1 w-28">
        <label className="text-xs text-white/60">Orden</label>
        <input
          type="number"
          value={displayOrder}
          onChange={(e) => setDisplayOrder(e.target.value)}
          className="bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
        />
      </div>

      <button
        type="submit"
        className="bg-primary hover:opacity-90 transition-opacity text-white text-sm font-medium rounded-lg px-4 py-2"
      >
        {editingCategory ? 'Guardar' : 'Agregar'}
      </button>

      {editingCategory && (
        <button
          type="button"
          onClick={onCancelEdit}
          className="text-sm text-white/60 hover:text-white px-3 py-2"
        >
          Cancelar
        </button>
      )}
    </form>
  )
}

export default CategoryForm