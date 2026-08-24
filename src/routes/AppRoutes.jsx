import { Routes, Route } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import AdminLayout from '../layouts/AdminLayout'
import ProtectedRoute from './ProtectedRoute'

import Home from '../pages/public/Home'
import Menu from '../pages/public/Menu'
import Reservations from '../pages/public/Reservations'
import Contact from '../pages/public/Contact'

import Login from '../pages/admin/Login'
import Dashboard from '../pages/admin/Dashboard'
import MenuManagement from '../pages/admin/MenuManagement'
import ReservationsManagement from '../pages/admin/ReservationsManagement'
import RestaurantSettings from '../pages/admin/RestaurantSettings'

function AppRoutes() {
  return (
    <Routes>
      {/* Sitio público */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservas" element={<Reservations />} />
        <Route path="/contacto" element={<Contact />} />
      </Route>

      {/* Login admin (sin layout, sin protección) */}
      <Route path="/admin/login" element={<Login />} />

      {/* Panel admin protegido */}
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/menu" element={<MenuManagement />} />
        <Route path="/admin/reservas" element={<ReservationsManagement />} />
        <Route path="/admin/configuracion" element={<RestaurantSettings />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes