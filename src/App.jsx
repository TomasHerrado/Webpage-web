import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useThemeStore } from './store/themeStore'
import AppRoutes from './routes/AppRoutes'

function App() {
  const { restaurant, isLoading, error, loadRestaurantConfig } = useThemeStore()

  useEffect(() => {
    loadRestaurantConfig()
  }, [loadRestaurantConfig])

  if (isLoading) return <p className="text-center mt-10 text-white bg-secondary min-h-screen">Cargando...</p>
  if (error) return <p className="text-center mt-10 text-red-500 bg-secondary min-h-screen">{error}</p>

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App