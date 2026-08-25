import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuthStore } from '../../store/authStore'

const links = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/menu', label: 'Menú' },
  { to: '/admin/reservas', label: 'Reservas' },
  { to: '/admin/configuracion', label: 'Configuración' },
]

function AdminSidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { username, logout } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const handleNavigate = () => setIsOpen(false)

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between bg-[#1a1a1a] border-b border-white/10 px-5 py-4 fixed top-0 left-0 right-0 z-40">
        <span className="font-heading text-accent">Panel Admin</span>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white/80 w-8 h-8 flex flex-col items-center justify-center gap-1.5">
          <span className={'block w-6 h-[1.5px] bg-white transition-transform ' + (isOpen ? 'rotate-45 translate-y-[7px]' : '')} />
          <span className={'block w-6 h-[1.5px] bg-white transition-opacity ' + (isOpen ? 'opacity-0' : '')} />
          <span className={'block w-6 h-[1.5px] bg-white transition-transform ' + (isOpen ? '-rotate-45 -translate-y-[7px]' : '')} />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed top-[65px] left-0 right-0 bg-[#1a1a1a] border-b border-white/10 flex flex-col overflow-hidden z-40"
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={handleNavigate}
                className={
                  'px-6 py-4 border-t border-white/5 text-sm ' +
                  (location.pathname === link.to ? 'text-accent' : 'text-white/80')
                }
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => { handleLogout(); handleNavigate() }}
              className="px-6 py-4 border-t border-white/5 text-sm text-left text-red-400"
            >
              Cerrar sesión
            </button>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 bg-[#1a1a1a] border-r border-white/10 p-6 flex-col justify-between flex-shrink-0">
        <div>
          <h2 className="text-lg font-heading text-accent mb-1">Panel Admin</h2>
          {username && <p className="text-xs text-white/40 mb-8">{username}</p>}
          <nav className="flex flex-col gap-1 text-sm">
            {links.map((link) => {
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={
                    'transition-colors px-3 py-2 rounded-lg ' +
                    (isActive ? 'bg-white/5 text-accent' : 'hover:text-accent text-white/70')
                  }
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-white/60 hover:text-red-400 transition-colors text-left"
        >
          Cerrar sesión
        </button>
      </aside>
    </>
  )
}

export default AdminSidebar