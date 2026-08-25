import { useState } from 'react'

const emptyBlock = {
  date: '',
  reason: '',
  fullDay: true,
  blockedFrom: '',
  blockedTo: '',
}

function BlockedDateForm({ onSubmit }) {
  const [formData, setFormData] = useState(emptyBlock)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      blockedFrom: formData.fullDay ? null : formData.blockedFrom,
      blockedTo: formData.fullDay ? null : formData.blockedTo,
    })
    setFormData(emptyBlock)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 items-end bg-[#1a1a1a] border border-white/5 rounded-xl p-4">
      <div className="flex flex-col gap-1 flex-1 min-w-[140px]">
        <label className="text-xs text-white/60">Fecha</label>
        <input
          type="date" name="date" value={formData.date} onChange={handleChange}
          className="bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
          required
        />
      </div>

      <div className="flex flex-col gap-1 flex-1 min-w-[150px]">
        <label className="text-xs text-white/60">Motivo</label>
        <input
          type="text" name="reason" value={formData.reason} onChange={handleChange}
          placeholder="Feriado, cierre por reforma..."
          className="bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-white/70 mb-2 cursor-pointer">
        <input type="checkbox" name="fullDay" checked={formData.fullDay} onChange={handleChange} className="accent-primary" />
        Día completo
      </label>

      {!formData.fullDay && (
        <>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-white/60">Desde</label>
            <input
              type="time" name="blockedFrom" value={formData.blockedFrom} onChange={handleChange}
              className="bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-white/60">Hasta</label>
            <input
              type="time" name="blockedTo" value={formData.blockedTo} onChange={handleChange}
              className="bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
              required
            />
          </div>
        </>
      )}

      <button
        type="submit"
        className="bg-primary hover:opacity-90 transition-opacity text-white text-sm font-medium rounded-lg px-4 py-2"
      >
        Bloquear
      </button>
    </form>
  )
}

export default BlockedDateForm