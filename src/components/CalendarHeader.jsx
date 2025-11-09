import React from 'react'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'

function monthName(monthIndex) {
  return new Date(2000, monthIndex, 1).toLocaleString(undefined, { month: 'long' })
}

export default function CalendarHeader({ year, month, onPrev, onNext, canPrev, canNext, today }) {
  const todayLabel = today.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-white/70 shadow-sm">
          <CalendarIcon className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <div className="text-2xl font-semibold text-slate-800">
            {monthName(month)} {year}
          </div>
          <div className="text-sm text-slate-500">Today: {todayLabel}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={!canPrev}
          className={`inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed`}
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNext}
          disabled={!canNext}
          className={`inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed`}
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
