import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useThemeStore } from '../../store/themeStore'
import { menuService } from '../../services/menuService'

function Home() {
  const restaurant = useThemeStore((state) => state.restaurant)
  const [highlightItems, setHighlightItems] = useState([])

  useEffect(() => {
    menuService.getFullMenu()
      .then((categories) => {
        const items = categories.flatMap((c) => c.items || []).filter((i) => i.available)
        setHighlightItems(items.slice(0, 3))
      })
      .catch(() => {})
  }, [])

  return (
    <div>
      <Hero restaurant={restaurant} />
      <About restaurant={restaurant} />
      {highlightItems.length > 0 && <MenuHighlight items={highlightItems} />}
      <InfoSection restaurant={restaurant} />
      <CtaBanner />
    </div>
  )
}

function Hero({ restaurant }) {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {restaurant?.heroImageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${restaurant.heroImageUrl})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[#0f0f0f]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative text-center px-6"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading text-white mb-4 px-2">
          {restaurant?.name}
        </h1>
        {restaurant?.tagline && (
          <p className="text-base md:text-xl text-white/70 mb-8 px-4">{restaurant.tagline}</p>
        )}
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/reservas"
            className="bg-primary hover:opacity-90 transition-opacity text-white font-medium px-8 py-3 rounded-full"
          >
            Reservar mesa
          </Link>
          <Link
            to="/menu"
            className="border border-white/30 hover:border-white transition-colors text-white font-medium px-8 py-3 rounded-full"
          >
            Ver carta
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-sm"
      >
        ↓ Descubrí más
      </motion.div>
    </section>
  )
}

function About({ restaurant }) {
  if (!restaurant?.description) return null

  return (
    <section className="max-w-3xl mx-auto px-6 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-accent text-sm uppercase tracking-widest mb-4">Nuestra historia</p>
        <p className="text-xl md:text-2xl font-heading leading-relaxed">
          {restaurant.description}
        </p>
      </motion.div>
    </section>
  )
}

function MenuHighlight({ items }) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-heading text-center mb-12"
      >
        Algunos de nuestros platos
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group"
          >
            {item.imageUrl && (
              <div className="overflow-hidden rounded-xl mb-4 aspect-[4/3]">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            )}
            <h3 className="font-heading text-lg">{item.name}</h3>
            <p className="text-sm text-white/50 line-clamp-2">{item.description}</p>
            <p className="text-accent mt-1">${Number(item.price).toLocaleString('es-AR')}</p>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/menu" className="text-accent hover:opacity-80 transition-opacity underline underline-offset-4">
          Ver carta completa
        </Link>
      </div>
    </section>
  )
}

function InfoSection({ restaurant }) {
  return (
    <section className="border-t border-white/10 px-6 py-16">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-accent text-xs uppercase tracking-widest mb-2">Horario</p>
          <p className="text-white/70">
            {restaurant?.openingTime?.slice(0, 5)} — {restaurant?.closingTime?.slice(0, 5)} hs
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-accent text-xs uppercase tracking-widest mb-2">Ubicación</p>
          <p className="text-white/70">{restaurant?.address}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-accent text-xs uppercase tracking-widest mb-2">Contacto</p>
          <p className="text-white/70">{restaurant?.phone}</p>
        </motion.div>
      </div>
    </section>
  )
}

function CtaBanner() {
  return (
    <section className="bg-primary/10 border-t border-white/10 px-6 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-heading mb-6">¿Listo para vivir la experiencia?</h2>
        <Link
          to="/reservas"
          className="inline-block bg-primary hover:opacity-90 transition-opacity text-white font-medium px-10 py-4 rounded-full"
        >
          Reservar ahora
        </Link>
      </motion.div>
    </section>
  )
}

export default Home