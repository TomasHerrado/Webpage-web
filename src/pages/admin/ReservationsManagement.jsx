import { useEffect, useState } from 'react'
import { timeSlotService } from '../../services/timeSlotService'
import { reservationService } from '../../services/reservationService'
import { blockedDateService } from '../../services/blockedDateService'
import TimeSlotForm from '../../components/shared/TimeSlotForm'
import ReservationsList from '../../components/shared/ReservationsList'
import BlockedDateForm from '../../components/shared/BlockedDateForm'
import { dayLabel } from '../../utils/dayOfWeekUtils'
import { useToastStore } from '../../store/toastStore'
import { useConfirmStore } from '../../store/confirmStore'

function ReservationsManagement() {
  const [slots, setSlots] = useState([])
  const [editingSlot, setEditingSlot] = useState(null)
  const [isLoadingSlots, setIsLoadingSlots] = useState(true)

  const [reservations, setReservations] = useState([])
  const [isLoadingReservations, setIsLoadingReservations] = useState(true)

  const [blockedDates, setBlockedDates] = useState([])
  const [isLoadingBlocked, setIsLoadingBlocked] = useState(true)

  const showToast = useToastStore((state) => state.showToast)
  const requestConfirm = useConfirmStore((state) => state.requestConfirm)

  const loadSlots = async () => {
    try {
      const data = await timeSlotService.getAll()
      setSlots(data)
    } catch (err) {
      showToast('No se pudieron cargar los horarios.', 'error')
    } finally {
      setIsLoadingSlots(false)
    }
  }

  const loadReservations = async () => {
    try {
      const data = await reservationService.getAllForAdmin()
      setReservations(data)
    } catch (err) {
      showToast('No se pudieron cargar las reservas.', 'error')
    } finally {
      setIsLoadingReservations(false)
    }
  }

  const loadBlockedDates = async () => {
    try {
      const data = await blockedDateService.getAll()
      setBlockedDates(data)
    } catch (err) {
      showToast('No se pudieron cargar las fechas bloqueadas.', 'error')
    } finally {
      setIsLoadingBlocked(false)
    }
  }

  useEffect(() => {
    loadSlots()
    loadReservations()
    loadBlockedDates()
  }, [])

  const handleSlotSubmit = async (payload) => {
    try {
      if (editingSlot) {
        await timeSlotService.update(editingSlot.id, payload)
        setEditingSlot(null)
        showToast('Horario actualizado.')
      } else {
        await timeSlotService.create(payload)
        showToast('Horario creado.')
      }
      loadSlots()
    } catch (err) {
      showToast(err.response?.data?.error || 'No se pudo guardar el horario.', 'error')
    }
  }

  const handleDeleteSlot = async (id) => {
    const confirmed = await requestConfirm('¿Eliminar este horario?')
    if (!confirmed) return

    try {
      await timeSlotService.delete(id)
      showToast('Horario eliminado.')
      loadSlots()
    } catch (err) {
      showToast('No se pudo eliminar el horario.', 'error')
    }
  }

  const handleUpdateStatus = async (id, status) => {
    try {
      await reservationService.updateStatus(id, status)
      showToast('Estado de la reserva actualizado.')
      loadReservations()
    } catch (err) {
      showToast('No se pudo actualizar el estado.', 'error')
    }
  }

  const handleBlockedDateSubmit = async (payload) => {
    try {
      await blockedDateService.create(payload)
      showToast('Fecha bloqueada correctamente.')
      loadBlockedDates()
    } catch (err) {
      showToast(err.response?.data?.error || 'No se pudo crear el bloqueo.', 'error')
    }
  }

  const handleDeleteBlockedDate = async (id) => {
    const confirmed = await requestConfirm('¿Eliminar este bloqueo?')
    if (!confirmed) return

    try {
      await blockedDateService.delete(id)
      showToast('Bloqueo eliminado.')
      loadBlockedDates()
    } catch (err) {
      showToast('No se pudo eliminar el bloqueo.', 'error')
    }
  }

  return (
    <div className="flex flex-col gap-10 max-w-3xl">
      <div>
        <h1 className="text-2xl font-heading mb-4">Reservas</h1>

        {isLoadingReservations ? (
          <PageLoader />
        ) : (
          <ReservationsList reservations={reservations} onUpdateStatus={handleUpdateStatus} />
        )}
      </div>

      <div>
        <h2 className="text-sm uppercase tracking-wide text-white/50 mb-2">Horarios de reserva</h2>

        <TimeSlotForm
          onSubmit={handleSlotSubmit}
          editingSlot={editingSlot}
          onCancelEdit={() => setEditingSlot(null)}
        />

        {isLoadingSlots ? (
          <div className="mt-4"><PageLoader /></div>
        ) : (
          <div className="flex flex-col gap-2 mt-4">
            {slots.length === 0 && (
              <p className="text-sm text-white/40">Todavía no hay horarios configurados.</p>
            )}

            {slots.map((slot) => (
              <div
                key={slot.id}
                className={
                  'flex items-center justify-between bg-[#1a1a1a] border border-white/5 rounded-lg px-4 py-3 ' +
                  (!slot.active ? 'opacity-40' : '')
                }
              >
                <div className="text-sm">
                  <span className="font-medium">{dayLabel(slot.dayOfWeek)}</span>
                  <span className="text-white/50"> — {slot.startTime?.slice(0, 5)} hs — capacidad {slot.maxCapacity}</span>
                  {!slot.active && <span className="text-white/30"> (inactivo)</span>}
                </div>
                <div className="flex gap-3 text-sm">
                  <button onClick={() => setEditingSlot(slot)} className="text-white/50 hover:text-accent transition-colors">
                    Editar
                  </button>
                  <button onClick={() => handleDeleteSlot(slot.id)} className="text-white/50 hover:text-red-400 transition-colors">
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-sm uppercase tracking-wide text-white/50 mb-2">Fechas bloqueadas</h2>

        <BlockedDateForm onSubmit={handleBlockedDateSubmit} />

        {isLoadingBlocked ? (
          <div className="mt-4"><PageLoader /></div>
        ) : (
          <div className="flex flex-col gap-2 mt-4">
            {blockedDates.length === 0 && (
              <p className="text-sm text-white/40">No hay fechas bloqueadas.</p>
            )}

            {blockedDates.map((block) => (
              <div
                key={block.id}
                className="flex items-center justify-between bg-[#1a1a1a] border border-white/5 rounded-lg px-4 py-3"
              >
                <div className="text-sm">
                  <span className="font-medium">{block.date}</span>
                  <span className="text-white/50"> — {block.reason || 'Sin motivo especificado'}</span>
                  {!block.fullDay && (
                    <span className="text-white/40"> ({block.blockedFrom?.slice(0, 5)} a {block.blockedTo?.slice(0, 5)})</span>
                  )}
                </div>
                <button onClick={() => handleDeleteBlockedDate(block.id)} className="text-white/50 hover:text-red-400 transition-colors text-sm">
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
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

export default ReservationsManagement