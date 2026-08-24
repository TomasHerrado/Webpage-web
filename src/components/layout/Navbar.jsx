import { Link } from 'react-router-dom'
import { useThemeStore } from '../../store/themeStore'

function Navbar() {
  const restaurant = useThemeStore((state) => state.restaurant)

  return (
    <header className="flex items-center justify-between px-8 py-5 border-b border-white/10">
      <Link to="/" className="text-xl font-heading text-accent">
        {restaurant?.name || 'Webpage'}
      </Link>

      <nav className="flex gap-6 text-sm">
        <Link to="/" className="hover:text-accent transition-colors">Inicio</Link>
        <Link to="/menu" className="hover:text-accent transition-colors">Menú</Link>
        <Link to="/reservas" className="hover:text-accent transition-colors">Reservas</Link>
        <Link to="/contacto" className="hover:text-accent transition-colors">Contacto</Link>
      </nav>
    </header>
  )
}

export default Navbar