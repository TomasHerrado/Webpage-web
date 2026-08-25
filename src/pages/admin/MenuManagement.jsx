import { useEffect, useState } from 'react'
import { menuService } from '../../services/menuService'
import CategoryForm from '../../components/shared/CategoryForm'
import MenuItemForm from '../../components/shared/MenuItemForm'
import { useToastStore } from '../../store/toastStore'
import { useConfirmStore } from '../../store/confirmStore'

function MenuManagement() {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [editingCategory, setEditingCategory] = useState(null)
  const [editingItem, setEditingItem] = useState(null)

  const showToast = useToastStore((state) => state.showToast)
  const requestConfirm = useConfirmStore((state) => state.requestConfirm)

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

  const handleCategorySubmit = async (payload) => {
    try {
      if (editingCategory) {
        await menuService.updateCategory(editingCategory.id, payload)
        setEditingCategory(null)
        showToast('Categoría actualizada.')
      } else {
        await menuService.createCategory(payload)
        showToast('Categoría creada.')
      }
      loadMenu()
    } catch (err) {
      showToast(err.response?.data?.error || 'No se pudo guardar la categoría.', 'error')
    }
  }

  const handleDeleteCategory = async (id) => {
    const confirmed = await requestConfirm('¿Eliminar esta categoría y todos sus platos?')
    if (!confirmed) return

    try {
      await menuService.deleteCategory(id)
      showToast('Categoría eliminada.')
      loadMenu()
    } catch (err) {
      showToast('No se pudo eliminar la categoría.', 'error')
    }
  }

  const handleItemSubmit = async (payload) => {
    try {
      if (editingItem) {
        await menuService.updateItem(editingItem.id, payload)
        setEditingItem(null)
        showToast('Plato actualizado.')
      } else {
        await menuService.createItem(payload)
        showToast('Plato creado.')
      }
      loadMenu()
    } catch (err) {
      showToast(err.response?.data?.error || 'No se pudo guardar el plato.', 'error')
    }
  }

  const handleDeleteItem = async (id) => {
    const confirmed = await requestConfirm('¿Eliminar este plato?')
    if (!confirmed) return

    try {
      await menuService.deleteItem(id)
      showToast('Plato eliminado.')
      loadMenu()
    } catch (err) {
      showToast('No se pudo eliminar el plato.', 'error')
    }
  }

  const handleToggleAvailability = async (id) => {
    try {
      await menuService.toggleItemAvailability(id)
      loadMenu()
    } catch (err) {
      showToast('No se pudo actualizar la disponibilidad.', 'error')
    }
  }

  const startEditItem = (item, categoryId) => {
    setEditingItem({ ...item, categoryId })
  }

  if (isLoading) return <PageLoader />
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
              <button onClick={() => setEditingCategory(cat)} className="text-white/50 hover:text-accent transition-colors">✎</button>
              <button onClick={() => handleDeleteCategory(cat.id)} className="text-white/50 hover:text-red-400 transition-colors">✕</button>
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
                    <button onClick={() => handleToggleAvailability(item.id)} className="text-white/50 hover:text-accent transition-colors">
                      {item.available ? 'Desactivar' : 'Activar'}
                    </button>
                    <button onClick={() => startEditItem(item, cat.id)} className="text-white/50 hover:text-accent transition-colors">
                      Editar
                    </button>
                    <button onClick={() => handleDeleteItem(item.id)} className="text-white/50 hover:text-red-400 transition-colors">
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

function PageLoader() {
  return (
    <div className="flex items-center gap-2 text-white/50 text-sm">
      <span className="w-4 h-4 border-2 border-white/20 border-t-accent rounded-full animate-spin" />
      Cargando...
    </div>
  )
}

export default MenuManagement