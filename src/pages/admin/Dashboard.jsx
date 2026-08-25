import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { dashboardService } from '../../services/dashboardService'
import { useAuthStore } from '../../store/authStore'
import StatCard from '../../components/shared/StatCard'
import { STATUS_LABELS, STATUS_COLORS } from '../../utils/statusUtils'

function Dashboard() {
  const { username } = useAuthStore()
  const [summary, setSummary] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    dashboardService.getSummary()
      .then(setSummary)
      .catch(() => setError('No se pudo cargar el resumen.'))
  }, [])

  if (error) return <p className="text-red-400">{error}</p>
  if (!summary) return <p className="text-white/60">Cargando...</p>

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-heading">Hola, {username} 👋</h1>
        <p className="text-white/50 text-sm mt-1">Este es el resumen de tu restaurante hoy.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Reservas hoy" value={summary.todayCount} accent />
        <StatCard label="Pendientes" value={summary.pendingCount} />
        <StatCard label="Platos en carta" value={summary.totalItems} />
        <StatCard label="Horarios activos" value={summary.totalTimeSlots} />
      </div>

      {summary.unavailableItems > 0 && (
        <div className="bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-sm rounded-lg px-4 py-3">
          Tenés {summary.unavailableItems} plato(s) marcados como no disponibles.{' '}
          <Link to="/admin/menu" className="underline">Revisar carta</Link>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm uppercase tracking-wide text-white/50">Próximas reservas</h2>
          <Link to="/admin/reservas" className="text-sm text-accent hover:opacity-80">Ver todas</Link>
        </div>

        {summary.upcomingReservations.length === 0 ? (
          <p className="text-sm text-white/40">No hay reservas próximas.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {summary.upcomingReservations.map((res) => (
              <div
                key={res.id}
                className="flex items-center justify-between bg-[#1a1a1a] border border-white/5 rounded-lg px-4 py-3"
              >
                <div>
                  <p className="font-medium">{res.customerName}</p>
                  <p className="text-sm text-white/50">
                    {res.reservationDate} — {res.reservationTime?.slice(0, 5)} hs — {res.numberOfGuests} personas
                  </p>
                </div>
                <span className={`text-[11px] uppercase tracking-wide border rounded-full px-2 py-0.5 ${STATUS_COLORS[res.status]}`}>
                  {STATUS_LABELS[res.status]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard