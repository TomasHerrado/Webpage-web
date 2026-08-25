import { useState, useEffect } from 'react'
import Calendar from '../../components/shared/Calendar'
import TimeSlotPicker from '../../components/shared/TimeSlotPicker'
import ReservationForm from '../../components/shared/ReservationForm'
import ReservationConfirmation from '../../components/shared/ReservationConfirmation'
import { availabilityService } from '../../services/availabilityService'
import { reservationService } from '../../services/reservationService'
import { toIsoDate } from '../../utils/dateUtils'

function Reservations() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [slots, setSlots] = useState([])
  const [selectedSlotId, setSelectedSlotId] = useState(null)
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [confirmedReservation, setConfirmedReservation] = useState(null)

  useEffect(() => {
    if (!selectedDate) return

    setSelectedSlotId(null)
    setIsLoadingSlots(true)
    setError(null)

    availabilityService.getAvailability(toIsoDate(selectedDate))
      .then(setSlots)
      .catch(() => setError('No se pudo cargar la disponibilidad para ese día.'))
      .finally(() => setIsLoadingSlots(false))
  }, [selectedDate])

  const handleReservationSubmit = async (formData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const reservation = await reservationService.create({
        ...formData,
        numberOfGuests: Number(formData.numberOfGuests),
        reservationDate: toIsoDate(selectedDate),
        reservationTime: slots.find((s) => s.timeSlotId === selectedSlotId)?.time,
        timeSlotId: selectedSlotId,
      })
      setConfirmedReservation(reservation)
    } catch (err) {
      const message = err.response?.data?.error || 'No se pudo crear la reserva. Intentá nuevamente.'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNewReservation = () => {
    setConfirmedReservation(null)
    setSelectedDate(null)
    setSlots([])
    setSelectedSlotId(null)
  }

  if (confirmedReservation) {
    return (
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <ReservationConfirmation
          reservation={confirmedReservation}
          onNewReservation={handleNewReservation}
        />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-16">
      <h1 className="text-3xl md:text-4xl font-heading text-center mb-10">
        Reservá tu mesa
      </h1>

      <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
        <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />

        <div className="flex-1 w-full max-w-md flex flex-col gap-6">
          {!selectedDate && (
            <p className="text-white/50 text-sm">Elegí una fecha para ver los horarios disponibles.</p>
          )}

          {selectedDate && isLoadingSlots && (
            <p className="text-white/50 text-sm">Cargando horarios...</p>
          )}

          {selectedDate && !isLoadingSlots && (
            <div>
              <p className="text-sm text-white/70 mb-2">Horarios disponibles</p>
              <TimeSlotPicker
                slots={slots}
                selectedSlotId={selectedSlotId}
                onSelectSlot={setSelectedSlotId}
              />
            </div>
          )}

          {selectedSlotId && (
            <ReservationForm onSubmit={handleReservationSubmit} isSubmitting={isSubmitting} />
          )}

          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default Reservations