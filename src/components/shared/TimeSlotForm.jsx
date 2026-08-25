import { useState, useEffect } from 'react'
import { DAYS_OF_WEEK } from '../../utils/dayOfWeekUtils'

const emptySlot = {
  dayOfWeek: 'MONDAY',
  startTime: '20:00',
  maxCapacity: 40,
  active: true,
}

function TimeSlotForm({ onSubmit, editingSlot, onCancelEdit }) {
  const [formData, setFormData] = useState(emptySlot)

  useEffect(() => {
    if (editingSlot) {
      setFormData({
        dayOfWeek: editingSlot.dayOfWeek,
        startTime: editingSlot.startTime?.slice(0, 5) || '20:00',
        maxCapacity: editingSlot.maxCapacity,
        active: editingSlot.active,
      })
    } else {
      setFormData(emptySlot)
    }
  }, [editingSlot])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ ...formData, maxCapacity: Number(formData.maxCapacity) })
    setFormData(emptySlot)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 items-end bg-[#1a1a1a] border border-white/5 rounded-xl p-4 w-full">
      <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
        <label className="text-xs text-white/60">Día</label>
        <select
          name="dayOfWeek" value={formData.dayOfWeek} onChange={handleChange}
          className="bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
        >
          {DAYS_OF_WEEK.map((d) => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
        <label className="text-xs text-white/60">Horario</label>
        <input
          type="time" name="startTime" value={formData.startTime} onChange={handleChange}
          className="bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
          required
        />
      </div>

      <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
        <label className="text-xs text-white/60">Capacidad</label>
        <input
          type="number" name="maxCapacity" value={formData.maxCapacity} onChange={handleChange}
          className="bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
          required
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-white/70 mb-2 cursor-pointer">
        <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} className="accent-primary" />
        Activo
      </label>

      <button
        type="submit"
        className="bg-primary hover:opacity-90 transition-opacity text-white text-sm font-medium rounded-lg px-4 py-2"
      >
        {editingSlot ? 'Guardar' : 'Agregar'}
      </button>

      {editingSlot && (
        <button type="button" onClick={onCancelEdit} className="text-sm text-white/60 hover:text-white px-3 py-2">
          Cancelar
        </button>
      )}
    </form>
  )
}

export default TimeSlotForm