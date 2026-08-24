import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/layout/AdminSidebar'

function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-[#0f0f0f] text-white">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout