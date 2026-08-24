import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

function Login() {
  const navigate = useNavigate()
  const { login, isLoading, error } = useAuthStore()

  const [formData, setFormData] = useState({ username: '', password: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await login(formData)
    if (success) {
      navigate('/admin')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-[#1a1a1a] border border-white/5 rounded-xl p-8 flex flex-col gap-5"
      >
        <h1 className="text-2xl font-heading text-accent text-center mb-2">
          Panel Admin
        </h1>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-white/70">Usuario</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-accent transition-colors"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-white/70">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="bg-[#0f0f0f] border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-accent transition-colors"
            required
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary hover:opacity-90 transition-opacity text-white font-medium rounded-lg py-2 mt-2 disabled:opacity-50"
        >
          {isLoading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  )
}

export default Login