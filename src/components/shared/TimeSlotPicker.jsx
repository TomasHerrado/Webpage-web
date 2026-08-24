function TimeSlotPicker({ slots, selectedSlotId, onSelectSlot }) {
  if (slots.length === 0) {
    return <p className="text-sm text-white/50">No hay horarios configurados para ese día.</p>
  }

  return (
    <div className="flex flex-wrap gap-2">
      {slots.map((slot) => (
        <button
          key={slot.timeSlotId}
          disabled={!slot.available}
          onClick={() => onSelectSlot(slot.timeSlotId)}
          className={`px-4 py-2 rounded-lg text-sm border transition-colors
            ${!slot.available ? 'border-white/5 text-white/20 cursor-not-allowed' : 'border-white/15 hover:border-accent cursor-pointer'}
            ${selectedSlotId === slot.timeSlotId ? 'bg-primary border-primary text-white' : ''}
          `}
        >
          {slot.time?.slice(0, 5)}
          {slot.available && (
            <span className="block text-[10px] text-white/40">
              {slot.remainingCapacity} lugares
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

export default TimeSlotPicker