import { useEffect, useState } from 'react'
import { timeSlotService } from '../../services/timeSlotService'
import TimeSlotForm from '../../components/shared/TimeSlotForm'
import { dayLabel } from '../../utils/dayOfWeekUtils'

function ReservationsManagement() {
  const [slots, setSlots] = useState([])
  const [editingSlot, setEditingSlot] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadSlots = async () => {
    try {
      const data = await timeSlotService.getAll()
      setSlots(data)
    } catch (err) {
      setError('No se pudieron cargar los horarios.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadSlots()
  }, [])

  const handleSubmit = async (payload) => {
    if (editingSlot) {
      await timeSlotService.update(editingSlot.id, payload)
      setEditingSlot(null)
    } else {
      await timeSlotService.create(payload)
    }
    loadSlots()
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este horario?')) return
    await timeSlotService.delete(id)
    loadSlots()
  }

  if (isLoading) return <p className="text-white/60">Cargando...</p>
  if (error) return <p className="text-red-400">{error}</p>

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-heading mb-4">Horarios de reserva</h1>

        <TimeSlotForm
          onSubmit={handleSubmit}
          editingSlot={editingSlot}
          onCancelEdit={() => setEditingSlot(null)}
        />

        <div className="flex flex-col gap-2 mt-4">
          {slots.length === 0 && (
            <p className="text-sm text-white/40">Todavía no hay horarios configurados.</p>
          )}

          {slots.map((slot) => (
            <div
              key={slot.id}
              className={`flex items-center justify-between bg-[#1a1a1a] border border-white/5 rounded-lg px-4 py-3 ${
                !slot.active ? 'opacity-40' : ''
              }`}
            >
              <div className="text-sm">
                <span className="font-medium">{dayLabel(slot.dayOfWeek)}</span>
                <span className="text-white/50"> — {slot.startTime?.slice(0, 5)} hs — capacidad {slot.maxCapacity}</span>
                {!slot.active && <span className="text-white/30"> (inactivo)</span>}
              </div>
              <div className="flex gap-3 text-sm">
                <button onClick={() => setEditingSlot(slot)} className="text-white/50 hover:text-accent">
                  Editar
                </button>
                <button onClick={() => handleDelete(slot.id)} className="text-white/50 hover:text-red-400">
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReservationsManagement