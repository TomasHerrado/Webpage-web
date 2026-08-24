import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { isPastDate, isSameDay, MONTH_NAMES, WEEKDAY_NAMES } from '../../utils/dateUtils'

function Calendar({ selectedDate, onSelectDate }) {
  const [viewDate, setViewDate] = useState(new Date())

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const startOffset = firstDayOfMonth.getDay() // 0 = domingo
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const days = []
  for (let i = 0; i < startOffset; i++) days.push(null)
  for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d))

  const goToPrevMonth = () => setViewDate(new Date(year, month - 1, 1))
  const goToNextMonth = () => setViewDate(new Date(year, month + 1, 1))

  return (
    <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-5 w-full max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <button onClick={goToPrevMonth} className="text-white/50 hover:text-accent px-2 transition-colors">
          ‹
        </button>
        <p className="font-heading text-lg">
          {MONTH_NAMES[month]} {year}
        </p>
        <button onClick={goToNextMonth} className="text-white/50 hover:text-accent px-2 transition-colors">
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAY_NAMES.map((day) => (
          <div key={day} className="text-center text-xs text-white/40">
            {day}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${year}-${month}`}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-7 gap-1"
        >
          {days.map((date, idx) => {
            if (!date) return <div key={idx} />

            const disabled = isPastDate(date)
            const selected = isSameDay(date, selectedDate)

            return (
              <button
                key={idx}
                disabled={disabled}
                onClick={() => onSelectDate(date)}
                className={`aspect-square rounded-lg text-sm transition-colors
                  ${disabled ? 'text-white/20 cursor-not-allowed' : 'hover:bg-white/10 cursor-pointer'}
                  ${selected ? 'bg-primary text-white font-medium' : ''}
                `}
              >
                {date.getDate()}
              </button>
            )
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Calendar