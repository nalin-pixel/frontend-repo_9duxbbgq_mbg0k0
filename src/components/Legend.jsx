import React from 'react'

export default function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></span>
        <span>Today</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-rose-500"></span>
        <span>Romantic day</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
        <span>Current weekday</span>
      </div>
    </div>
  )
}
