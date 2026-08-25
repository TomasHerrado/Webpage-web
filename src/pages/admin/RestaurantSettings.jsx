import { useState, useEffect } from 'react'
import { restaurantService } from '../../services/restaurantService'
import { useThemeStore } from '../../store/themeStore'
import { useToastStore } from '../../store/toastStore'

function RestaurantSettings() {
  const { restaurant, loadRestaurantConfig } = useThemeStore()
  const showToast = useToastStore((state) => state.showToast)

  const [formData, setFormData] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (restaurant) {
      setFormData({
        name: restaurant.name || '',
        tagline: restaurant.tagline || '',
        description: restaurant.description || '',
        logoUrl: restaurant.logoUrl || '',
        heroImageUrl: restaurant.heroImageUrl || '',
        primaryColor: restaurant.primaryColor || '#8B1E3F',
        secondaryColor: restaurant.secondaryColor || '#1A1A1A',
        accentColor: restaurant.accentColor || '#D4AF37',
        headingFont: restaurant.headingFont || 'Playfair Display',
        bodyFont: restaurant.bodyFont || 'Inter',
        phone: restaurant.phone || '',
        whatsapp: restaurant.whatsapp || '',
        email: restaurant.email || '',
        address: restaurant.address || '',
        instagramUrl: restaurant.instagramUrl || '',
        facebookUrl: restaurant.facebookUrl || '',
        openingTime: restaurant.openingTime?.slice(0, 5) || '12:00',
        closingTime: restaurant.closingTime?.slice(0, 5) || '23:30',
      })
    }
  }, [restaurant])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)

    try {
      await restaurantService.updateConfig(formData)
      await loadRestaurantConfig()
      showToast('Cambios guardados correctamente.')
    } catch (err) {
      const msg = err.response?.data?.error || 'No se pudieron guardar los cambios.'
      setError(msg)
      showToast(msg, 'error')
    } finally {
      setIsSaving(false)
    }
  }

  if (!formData) return <PageLoader />

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-2xl">
      <h1 className="text-2xl font-heading">Configuración del restaurante</h1>

      <Section title="Identidad">
        <Field label="Nombre" name="name" value={formData.name} onChange={handleChange} required />
        <Field label="Tagline" name="tagline" value={formData.tagline} onChange={handleChange} />
        <TextArea label="Descripción" name="description" value={formData.description} onChange={handleChange} />
        <Field label="URL del logo" name="logoUrl" value={formData.logoUrl} onChange={handleChange} />
        <Field label="URL de imagen hero" name="heroImageUrl" value={formData.heroImageUrl} onChange={handleChange} />
      </Section>

      <Section title="Paleta de colores">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ColorField label="Primario" name="primaryColor" value={formData.primaryColor} onChange={handleChange} />
          <ColorField label="Secundario" name="secondaryColor" value={formData.secondaryColor} onChange={handleChange} />
          <ColorField label="Acento" name="accentColor" value={formData.accentColor} onChange={handleChange} />
        </div>
      </Section>

      <Section title="Tipografías">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Fuente títulos" name="headingFont" value={formData.headingFont} onChange={handleChange} />
          <Field label="Fuente texto" name="bodyFont" value={formData.bodyFont} onChange={handleChange} />
        </div>
      </Section>

      <Section title="Contacto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Teléfono" name="phone" value={formData.phone} onChange={handleChange} />
          <Field label="WhatsApp" name="whatsapp" value={formData.whatsapp} onChange={handleChange} />
          <Field label="Email" name="email" value={formData.email} onChange={handleChange} />
          <Field label="Dirección" name="address" value={formData.address} onChange={handleChange} />
          <Field label="Instagram (URL)" name="instagramUrl" value={formData.instagramUrl} onChange={handleChange} />
          <Field label="Facebook (URL)" name="facebookUrl" value={formData.facebookUrl} onChange={handleChange} />
        </div>
      </Section>

      <Section title="Horarios generales">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field type="time" label="Apertura" name="openingTime" value={formData.openingTime} onChange={handleChange} />
          <Field type="time" label="Cierre" name="closingTime" value={formData.closingTime} onChange={handleChange} />
        </div>
      </Section>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isSaving}
        className="bg-primary hover:opacity-90 transition-opacity text-white font-medium rounded-lg py-3 disabled:opacity-50"
      >
        {isSaving ? 'Guardando...' : 'Guardar cambios'}
      </button>
    </form>
  )
}

function Section({ title, children }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-sm uppercase tracking-wide text-white/50">{title}</h2>
      {children}
    </div>
  )
}

function Field({ label, type = 'text', name, value, onChange, required }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-white/70">{label}</label>
      <input
        type={type} name={name} value={value} onChange={onChange} required={required}
        className="bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-accent"
      />
    </div>
  )
}

function TextArea({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-white/70">{label}</label>
      <textarea
        name={name} value={value} onChange={onChange} rows={3}
        className="bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-accent resize-none"
      />
    </div>
  )
}

function ColorField({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-white/70">{label}</label>
      <div className="flex items-center gap-2 bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2">
        <input
          type="color" name={name} value={value} onChange={onChange}
          className="w-8 h-8 rounded cursor-pointer bg-transparent"
        />
        <input
          type="text" name={name} value={value} onChange={onChange}
          className="bg-transparent outline-none flex-1 text-sm"
        />
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

export default RestaurantSettings