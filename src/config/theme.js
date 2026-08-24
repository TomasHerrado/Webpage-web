export function applyTheme(restaurant) {
  if (!restaurant) return

  const root = document.documentElement

  root.style.setProperty('--color-primary', restaurant.primaryColor || '#8B1E3F')
  root.style.setProperty('--color-secondary', restaurant.secondaryColor || '#1A1A1A')
  root.style.setProperty('--color-accent', restaurant.accentColor || '#D4AF37')
  root.style.setProperty('--font-heading', restaurant.headingFont || 'Playfair Display')
  root.style.setProperty('--font-body', restaurant.bodyFont || 'Inter')

  document.title = restaurant.name || 'Webpage'

  if (restaurant.logoUrl) {
    let favicon = document.querySelector("link[rel~='icon']")
    if (!favicon) {
      favicon = document.createElement('link')
      favicon.rel = 'icon'
      document.head.appendChild(favicon)
    }
    favicon.href = restaurant.logoUrl
  }
}