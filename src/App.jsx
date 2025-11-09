import React, { useMemo, useState } from 'react'
import CalendarHeader from './components/CalendarHeader'
import Legend from './components/Legend'
import MonthGrid from './components/MonthGrid'
import RomanceModal from './components/RomanceModal'

function clamp(value, min, max) { return Math.min(max, Math.max(min, value)) }

export default function App() {
  const today = useMemo(() => new Date(), [])
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  // Allow at least two years before and after today
  const minDate = useMemo(() => new Date(today.getFullYear() - 2, today.getMonth(), 1), [today])
  const maxDate = useMemo(() => new Date(today.getFullYear() + 2, today.getMonth(), 1), [today])

  const canPrev = cursor > minDate
  const canNext = cursor < maxDate

  function addMonths(date, delta) {
    const d = new Date(date)
    d.setMonth(d.getMonth() + delta)
    // clamp within bounds by year+month
    const min = new Date(minDate.getFullYear(), minDate.getMonth(), 1)
    const max = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1)
    if (d < min) return min
    if (d > max) return max
    return d
  }

  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState({ message: '', dateLabel: '' })

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-indigo-50 to-sky-50 py-10">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-6">
          <CalendarHeader
            year={cursor.getFullYear()}
            month={cursor.getMonth()}
            onPrev={() => setCursor(addMonths(cursor, -1))}
            onNext={() => setCursor(addMonths(cursor, 1))}
            canPrev={canPrev}
            canNext={canNext}
            today={today}
          />
          <div className="mt-4"><Legend /></div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/70 shadow-lg p-4">
          <MonthGrid
            year={cursor.getFullYear()}
            month={cursor.getMonth()}
            today={today}
            onRomanceClick={({ message, dateLabel }) => {
              setModalContent({ message, dateLabel })
              setModalOpen(true)
            }}
          />
        </div>
      </div>

      <RomanceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        message={modalContent.message}
        dateLabel={modalContent.dateLabel}
      />
    </div>
  )
}
