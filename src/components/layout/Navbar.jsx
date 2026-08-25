import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useThemeStore } from '../../store/themeStore'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/menu', label: 'Menú' },
  { to: '/reservas', label: 'Reservas' },
  { to: '/contacto', label: 'Contacto' },
]

function Navbar() {
  const restaurant = useThemeStore((state) => state.restaurant)
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="relative flex items-center justify-between px-6 md:px-8 py-5 border-b border-white/10">
      <Link to="/" className="text-xl font-heading text-accent" onClick={() => setIsOpen(false)}>
        {restaurant?.name || 'Webpage'}
      </Link>

      {/* Desktop */}
      <nav className="hidden md:flex gap-6 text-sm">
        {links.map((link) => (
          <NavLink key={link.to} link={link} isActive={location.pathname === link.to} />
        ))}
      </nav>

      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-white/80 w-8 h-8 flex flex-col items-center justify-center gap-1.5"
        aria-label="Menú"
      >
        <span className={'block w-6 h-[1.5px] bg-white transition-transform ' + (isOpen ? 'rotate-45 translate-y-[7px]' : '')} />
        <span className={'block w-6 h-[1.5px] bg-white transition-opacity ' + (isOpen ? 'opacity-0' : '')} />
        <span className={'block w-6 h-[1.5px] bg-white transition-transform ' + (isOpen ? '-rotate-45 -translate-y-[7px]' : '')} />
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 right-0 bg-secondary border-b border-white/10 flex flex-col md:hidden overflow-hidden z-40"
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={
                  'px-6 py-4 border-t border-white/5 text-sm ' +
                  (location.pathname === link.to ? 'text-accent' : 'text-white/80')
                }
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

function NavLink({ link, isActive }) {
  return (
    <Link
      to={link.to}
      className={
        'transition-colors relative pb-1 ' +
        (isActive ? 'text-accent' : 'hover:text-accent text-white/80')
      }
    >
      {link.label}
      {isActive && <span className="absolute -bottom-[1px] left-0 right-0 h-[1.5px] bg-accent" />}
    </Link>
  )
}

export default Navbar