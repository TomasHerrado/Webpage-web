import { Outlet, useLocation } from 'react-router-dom'
import AdminSidebar from '../components/layout/AdminSidebar'
import PageTransition from '../components/shared/PageTransition'

function AdminLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex bg-[#0f0f0f] text-white">
      <AdminSidebar />
      <main className="flex-1 p-5 pt-24 md:p-8 md:pt-8 overflow-x-hidden">
        <PageTransition transitionKey={location.pathname}>
          <Outlet />
        </PageTransition>
      </main>
    </div>
  )
}

export default AdminLayout