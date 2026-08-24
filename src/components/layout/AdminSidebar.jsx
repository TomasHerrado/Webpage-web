import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

function AdminSidebar() {
  const navigate = useNavigate()
  const { username, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <aside className="w-64 bg-[#1a1a1a] border-r border-white/10 p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-heading text-accent mb-1">Panel Admin</h2>
        {username && <p className="text-xs text-white/40 mb-8">{username}</p>}
        <nav className="flex flex-col gap-3 text-sm">
          <Link to="/admin" className="hover:text-accent transition-colors">Dashboard</Link>
          <Link to="/admin/menu" className="hover:text-accent transition-colors">Menú</Link>
          <Link to="/admin/reservas" className="hover:text-accent transition-colors">Reservas</Link>
          <Link to="/admin/configuracion" className="hover:text-accent transition-colors">Configuración</Link>
        </nav>
      </div>
      <button
        onClick={handleLogout}
        className="text-sm text-white/60 hover:text-red-400 transition-colors text-left"
      >
        Cerrar sesión
      </button>
    </aside>
  )
}

export default AdminSidebar