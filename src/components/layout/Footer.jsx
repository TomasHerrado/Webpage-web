import { useThemeStore } from '../../store/themeStore'

function Footer() {
  const restaurant = useThemeStore((state) => state.restaurant)

  return (
    <footer className="border-t border-white/10 px-8 py-6 text-sm text-white/60 flex flex-col md:flex-row justify-between gap-2">
      <p>© {new Date().getFullYear()} {restaurant?.name}. Todos los derechos reservados.</p>
      <p>{restaurant?.address}</p>
    </footer>
  )
}

export default Footer