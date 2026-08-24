import { useState } from 'react'

function ReservationForm({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    numberOfGuests: 2,
    specialRequests: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-white/70">Nombre y apellido</label>
        <input
          type="text" name="customerName" value={formData.customerName} onChange={handleChange}
          className="bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-accent"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-white/70">Teléfono</label>
          <input
            type="tel" name="customerPhone" value={formData.customerPhone} onChange={handleChange}
            placeholder="+54 9 351..."
            className="bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-accent"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-white/70">Personas</label>
          <input
            type="number" name="numberOfGuests" min="1" max="20"
            value={formData.numberOfGuests} onChange={handleChange}
            className="bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-accent"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-white/70">Email (opcional)</label>
        <input
          type="email" name="customerEmail" value={formData.customerEmail} onChange={handleChange}
          className="bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-accent"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-white/70">Pedido especial (opcional)</label>
        <textarea
          name="specialRequests" rows={2} value={formData.specialRequests} onChange={handleChange}
          className="bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-accent resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary hover:opacity-90 transition-opacity text-white font-medium rounded-lg py-3 mt-2 disabled:opacity-50"
      >
        {isSubmitting ? 'Confirmando...' : 'Confirmar reserva'}
      </button>
    </form>
  )
}

export default ReservationForm