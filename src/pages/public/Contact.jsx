import { motion } from 'framer-motion'
import { useThemeStore } from '../../store/themeStore'

function Contact() {
  const restaurant = useThemeStore((state) => state.restaurant)

  const whatsappLink = restaurant?.whatsapp
    ? 'https://wa.me/' + restaurant.whatsapp.replace(/[^0-9]/g, '')
    : null

  const mapQuery = encodeURIComponent(restaurant?.address || '')

  const scheduleText =
    restaurant?.openingTime && restaurant?.closingTime
      ? restaurant.openingTime.slice(0, 5) + ' a ' + restaurant.closingTime.slice(0, 5) + ' hs'
      : null

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-heading text-center mb-12"
      >
        Contacto
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-6">
          <InfoRow label="Direccion" value={restaurant?.address} />
          <InfoRow label="Telefono" value={restaurant?.phone} />
          <InfoRow label="Email" value={restaurant?.email} />
          <InfoRow label="Horario" value={scheduleText} />

          <SocialLinks
            whatsappLink={whatsappLink}
            instagramUrl={restaurant?.instagramUrl}
            facebookUrl={restaurant?.facebookUrl}
          />
        </div>

        <div className="rounded-xl overflow-hidden border border-white/10 h-72 md:h-full min-h-[300px]">
          <MapEmbed address={restaurant?.address} mapQuery={mapQuery} />
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  if (!value) {
    return null
  }

  return (
    <div>
      <p className="text-accent text-xs uppercase tracking-widest mb-1">{label}</p>
      <p className="text-white/80">{value}</p>
    </div>
  )
}

function SocialLinks({ whatsappLink, instagramUrl, facebookUrl }) {
  return (
    <div className="flex gap-4 mt-2">
      {whatsappLink ? (
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-primary hover:opacity-90 transition-opacity text-white text-sm font-medium px-5 py-2.5 rounded-full">
          Escribinos por WhatsApp
        </a>
      ) : null}

      {instagramUrl ? (
        <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="border border-white/20 hover:border-white/50 transition-colors text-sm px-5 py-2.5 rounded-full">
          Instagram
        </a>
      ) : null}

      {facebookUrl ? (
        <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="border border-white/20 hover:border-white/50 transition-colors text-sm px-5 py-2.5 rounded-full">
          Facebook
        </a>
      ) : null}
    </div>
  )
}

function MapEmbed({ address, mapQuery }) {
  if (!address) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white/40 text-sm bg-[#1a1a1a]">
        Direccion no configurada
      </div>
    )
  }

  const src = 'https://www.google.com/maps?q=' + mapQuery + '&output=embed'

  return (
    <iframe
      title="Ubicacion"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      loading="lazy"
      src={src}
    />
  )
}

export default Contact