import { reservationService } from './reservationService'
import { menuService } from './menuService'
import { timeSlotService } from './timeSlotService'
import { toIsoDate } from '../utils/dateUtils'

export const dashboardService = {
  getSummary: async () => {
    const [reservations, categories, slots] = await Promise.all([
      reservationService.getAllForAdmin(),
      menuService.getFullMenu(),
      timeSlotService.getAll(),
    ])

    const todayIso = toIsoDate(new Date())

    const todayReservations = reservations.filter(
      (r) => r.reservationDate === todayIso && r.status !== 'CANCELLED'
    )

    const upcomingReservations = reservations
      .filter((r) => r.reservationDate >= todayIso && r.status !== 'CANCELLED' && r.status !== 'COMPLETED')
      .sort((a, b) => (a.reservationDate + a.reservationTime).localeCompare(b.reservationDate + b.reservationTime))
      .slice(0, 5)

    const pendingCount = reservations.filter((r) => r.status === 'PENDING').length

    const totalItems = categories.reduce((acc, cat) => acc + (cat.items?.length || 0), 0)
    const unavailableItems = categories.reduce(
      (acc, cat) => acc + (cat.items?.filter((i) => !i.available).length || 0),
      0
    )

    return {
      todayCount: todayReservations.length,
      pendingCount,
      upcomingReservations,
      totalCategories: categories.length,
      totalItems,
      unavailableItems,
      totalTimeSlots: slots.length,
    }
  },
}