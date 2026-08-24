import { useEffect, useState } from 'react'
import { menuService } from '../../services/menuService'
import CategoryForm from '../../components/shared/CategoryForm'
import MenuItemForm from '../../components/shared/MenuItemForm'

function MenuManagement() {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [editingCategory, setEditingCategory] = useState(null)
  const [editingItem, setEditingItem] = useState(null)

  const loadMenu = async () => {
    try {
      const data = await menuService.getFullMenu()
      setCategories(data)
    } catch (err) {
      setError('No se pudo cargar la carta.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadMenu()
  }, [])

  // --- Categorías ---
  const handleCategorySubmit = async (payload) => {
    if (editingCategory) {
      await menuService.updateCategory(editingCategory.id, payload)
      setEditingCategory(null)
    } else {
      await menuService.createCategory(payload)
    }
    loadMenu()
  }

  const handleDeleteCategory = async (id) => {
    if (!confirm('¿Eliminar esta categoría y todos sus platos?')) return
    await menuService.deleteCategory(id)
    loadMenu()
  }

  // --- Platos ---
  const handleItemSubmit = async (payload) => {
    if (editingItem) {
      await menuService.updateItem(editingItem.id, payload)
      setEditingItem(null)
    } else {
      await menuService.createItem(payload)
    }
    loadMenu()
  }

  const handleDeleteItem = async (id) => {
    if (!confirm('¿Eliminar este plato?')) return
    await menuService.deleteItem(id)
    loadMenu()
  }

  const handleToggleAvailability = async (id) => {
    await menuService.toggleItemAvailability(id)
    loadMenu()
  }

  const startEditItem = (item, categoryId) => {
    setEditingItem({ ...item, categoryId })
  }

  if (isLoading) return <p className="text-white/60">Cargando...</p>
  if (error) return <p className="text-red-400">{error}</p>

  return (
    <div className="flex flex-col gap-10 max-w-4xl">
      <div>
        <h1 className="text-2xl font-heading mb-4">Gestión de Carta</h1>

        <h2 className="text-sm uppercase tracking-wide text-white/50 mb-2">Categorías</h2>
        <CategoryForm
          onSubmit={handleCategorySubmit}
          editingCategory={editingCategory}
          onCancelEdit={() => setEditingCategory(null)}
        />

        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center gap-2 bg-[#1a1a1a] border border-white/10 rounded-full px-4 py-1.5 text-sm"
            >
              <span>{cat.name}</span>
              <button onClick={() => setEditingCategory(cat)} className="text-white/50 hover:text-accent">✎</button>
              <button onClick={() => handleDeleteCategory(cat.id)} className="text-white/50 hover:text-red-400">✕</button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-sm uppercase tracking-wide text-white/50 mb-2">
          {editingItem ? 'Editar plato' : 'Agregar plato'}
        </h2>
        <MenuItemForm
          categories={categories}
          onSubmit={handleItemSubmit}
          editingItem={editingItem}
          onCancelEdit={() => setEditingItem(null)}
        />
      </div>

      <div className="flex flex-col gap-6">
        {categories.map((cat) => (
          <div key={cat.id}>
            <h3 className="font-heading text-lg mb-2">{cat.name}</h3>
            <div className="flex flex-col gap-2">
              {cat.items?.length === 0 && (
                <p className="text-sm text-white/40">Sin platos cargados todavía.</p>
              )}
              {cat.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-[#1a1a1a] border border-white/5 rounded-lg px-4 py-3"
                >
                  <div>
                    <p className={item.available ? '' : 'opacity-40 line-through'}>
                      {item.name} — ${Number(item.price).toLocaleString('es-AR')}
                    </p>
                    <p className="text-xs text-white/40">{item.description}</p>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <button onClick={() => handleToggleAvailability(item.id)} className="text-white/50 hover:text-accent">
                      {item.available ? 'Desactivar' : 'Activar'}
                    </button>
                    <button onClick={() => startEditItem(item, cat.id)} className="text-white/50 hover:text-accent">
                      Editar
                    </button>
                    <button onClick={() => handleDeleteItem(item.id)} className="text-white/50 hover:text-red-400">
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MenuManagement