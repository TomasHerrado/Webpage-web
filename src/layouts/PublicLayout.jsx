import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import PageTransition from '../components/shared/PageTransition'

function PublicLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-secondary text-white">
      <Navbar />
      <main className="flex-1">
        <PageTransition transitionKey={location.pathname}>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout