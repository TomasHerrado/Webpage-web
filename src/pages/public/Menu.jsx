import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { menuService } from '../../services/menuService'

function Menu() {
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await menuService.getFullMenu()
        setCategories(data)
        if (data.length > 0) setActiveCategory(data[0].id)
      } catch (err) {
        setError('No se pudo cargar la carta en este momento.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMenu()
  }, [])

  if (isLoading) {
    return <p className="text-center py-20 text-white/60">Cargando carta...</p>
  }

  if (error) {
    return <p className="text-center py-20 text-red-400">{error}</p>
  }

  const currentCategory = categories.find((c) => c.id === activeCategory)

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-heading text-center mb-10">
        Nuestra Carta
      </h1>

      {/* Filtro de categorías con scroll horizontal */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm border transition-colors ${
              activeCategory === category.id
                ? 'bg-primary border-primary text-white'
                : 'border-white/15 text-white/70 hover:border-white/40'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Items de la categoría activa */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {currentCategory?.items?.map((item) => (
          <div
            key={item.id}
            className={`flex gap-4 bg-[#1a1a1a] border border-white/5 rounded-xl overflow-hidden ${
              !item.available ? 'opacity-40' : ''
            }`}
          >
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-28 h-28 object-cover flex-shrink-0"
              />
            )}
            <div className="py-3 pr-4 flex-1">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-heading text-lg">{item.name}</h3>
                <span className="text-accent font-medium whitespace-nowrap">
                  ${Number(item.price).toLocaleString('es-AR')}
                </span>
              </div>
              <p className="text-sm text-white/60 mt-1">{item.description}</p>

              <div className="flex gap-2 mt-2 flex-wrap">
                {item.vegetarian && <Tag label="Vegetariano" />}
                {item.vegan && <Tag label="Vegano" />}
                {item.glutenFree && <Tag label="Sin TACC" />}
                {item.spicy && <Tag label="Picante" />}
                {!item.available && <Tag label="No disponible" />}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function Tag({ label }) {
  return (
    <span className="text-[11px] uppercase tracking-wide bg-white/5 border border-white/10 rounded-full px-2 py-0.5 text-white/60">
      {label}
    </span>
  )
}

export default Menu