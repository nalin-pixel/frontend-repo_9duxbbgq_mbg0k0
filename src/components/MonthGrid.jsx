import React, { useMemo } from 'react'
import { Heart } from 'lucide-react'

function isSameDate(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function getMonthMatrix(year, month) {
  const firstDay = new Date(year, month, 1)
  const startDay = new Date(firstDay)
  startDay.setDate(firstDay.getDate() - ((firstDay.getDay() + 6) % 7)) // start from Monday
  const weeks = []
  let current = new Date(startDay)
  for (let w = 0; w < 6; w++) {
    const week = []
    for (let d = 0; d < 7; d++) {
      week.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    weeks.push(week)
  }
  return weeks
}

export default function MonthGrid({ year, month, today, onRomanceClick }) {
  const weeks = useMemo(() => getMonthMatrix(year, month), [year, month])
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const romanceDate = new Date(today.getFullYear(), 10, 29) // November 29 of current year

  function randomRomanceText() {
    const texts = [
      'In a sky full of stars, your smile is my favorite constellation.',
      'Every moment with you turns the ordinary into poetry.',
      'If kisses were snowflakes, I’d send you a blizzard.',
      'You are my today and all of my tomorrows.',
      'I fell in love with you the way the sun kisses the morning—quietly and then all at once.',
      'Your laugh is the melody my heart wants to play on repeat.',
      'With you, even time blushes and ticks a little softer.',
      'I’d choose you in every lifetime and every universe.',
      'You are the reason my heart writes love letters to my ribcage.',
      'Forever is shorter when I’m with you.'
    ]
    const idx = Math.floor(Math.random() * texts.length)
    return texts[idx]
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-slate-500 mb-2">
        {weekDays.map((d) => (
          <div key={d} className="uppercase tracking-wide">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {weeks.flat().map((date, idx) => {
          const inCurrentMonth = date.getMonth() === month
          const isToday = isSameDate(date, today)
          const isCurrentWeekday = date.getDay() === today.getDay()
          const isRomance = date.getMonth() === 10 && date.getDate() === 29 // Nov 29 any year

          const base = 'relative aspect-square rounded-xl p-2 flex flex-col items-center justify-center select-none'
          const muted = 'text-slate-400'
          const current = 'bg-white shadow-sm border border-slate-200'
          const todayCls = 'ring-2 ring-blue-500'
          const weekdayHighlight = 'bg-emerald-50'

          return (
            <button
              key={idx}
              onClick={() => {
                if (isRomance) {
                  onRomanceClick({
                    message: randomRomanceText(),
                    dateLabel: date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
                  })
                }
              }}
              className={[
                base,
                inCurrentMonth ? current : muted,
                isToday ? todayCls : '',
                isCurrentWeekday ? weekdayHighlight : ''
              ].join(' ')}
            >
              <div className={`text-sm ${inCurrentMonth ? 'text-slate-800' : 'text-slate-400'}`}>{date.getDate()}</div>

              {isToday && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
              )}

              {isRomance && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                    <span className="absolute inset-0 rounded-full animate-ping bg-rose-400/30" />
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
