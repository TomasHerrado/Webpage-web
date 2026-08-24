import { motion } from 'framer-motion'

function ReservationConfirmation({ reservation, onNewReservation }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-[#1a1a1a] border border-white/5 rounded-xl p-8 text-center max-w-md mx-auto"
    >
      <p className="text-accent text-sm uppercase tracking-wide mb-2">¡Reserva confirmada!</p>
      <h2 className="text-2xl font-heading mb-4">{reservation.customerName}</h2>

      <div className="flex flex-col gap-1 text-white/80 text-sm mb-6">
        <p>{new Date(reservation.reservationDate + 'T00:00:00').toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        <p>{reservation.reservationTime?.slice(0, 5)} hs — {reservation.numberOfGuests} personas</p>
      </div>

      <div className="bg-[#0f0f0f] border border-white/10 rounded-lg py-3 mb-6">
        <p className="text-xs text-white/50 mb-1">Código de reserva</p>
        <p className="text-xl font-mono tracking-widest text-accent">{reservation.confirmationCode}</p>
      </div>

      <p className="text-xs text-white/40 mb-6">
        Guardá este código, lo vas a necesitar si querés consultar o cancelar tu reserva.
      </p>

      <button
        onClick={onNewReservation}
        className="text-sm text-white/60 hover:text-accent transition-colors"
      >
        Hacer otra reserva
      </button>
    </motion.div>
  )
}

export default ReservationConfirmation