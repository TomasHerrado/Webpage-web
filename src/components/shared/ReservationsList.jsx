import { STATUS_LABELS, STATUS_COLORS } from '../../utils/statusUtils'

function ReservationsList({ reservations, onUpdateStatus }) {
  if (reservations.length === 0) {
    return <p className="text-sm text-white/40">No hay reservas todavía.</p>
  }

  return (
    <div className="flex flex-col gap-2">
      {reservations.map((res) => (
        <div
            key={res.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#1a1a1a] border border-white/5 rounded-lg px-4 py-3 gap-3"
            >
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-medium">{res.customerName}</p>
              <span className={`text-[11px] uppercase tracking-wide border rounded-full px-2 py-0.5 ${STATUS_COLORS[res.status]}`}>
                {STATUS_LABELS[res.status]}
              </span>
            </div>
            <p className="text-sm text-white/50">
              {res.reservationDate} — {res.reservationTime?.slice(0, 5)} hs — {res.numberOfGuests} personas
            </p>
            <p className="text-xs text-white/40">
              {res.customerPhone} {res.customerEmail && `— ${res.customerEmail}`}
            </p>
            {res.specialRequests && (
              <p className="text-xs text-white/40 mt-1 italic">"{res.specialRequests}"</p>
            )}
            <p className="text-[11px] text-white/30 mt-1 font-mono">{res.confirmationCode}</p>
          </div>

          {res.status !== 'CANCELLED' && res.status !== 'COMPLETED' && (
            <div className="flex flex-row sm:flex-col gap-3 sm:gap-1 text-sm flex-shrink-0">
              {res.status === 'PENDING' && (
                <button
                  onClick={() => onUpdateStatus(res.id, 'CONFIRMED')}
                  className="text-green-400 hover:opacity-80"
                >
                  Confirmar
                </button>
              )}
              <button
                onClick={() => onUpdateStatus(res.id, 'COMPLETED')}
                className="text-blue-400 hover:opacity-80"
              >
                Completada
              </button>
              <button
                onClick={() => onUpdateStatus(res.id, 'CANCELLED')}
                className="text-red-400 hover:opacity-80"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ReservationsList