import React from 'react'
import { X } from 'lucide-react'

export default function RomanceModal({ open, onClose, message, dateLabel }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-xl overflow-hidden">
        <div className="absolute -inset-x-10 -top-10 h-32 bg-pink-200/40 blur-3xl pointer-events-none" />
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm uppercase tracking-wide text-rose-500 font-semibold">Romantic Moment</div>
              <div className="text-slate-900 text-2xl font-bold mt-1">{dateLabel}</div>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="mt-4 text-slate-700 leading-relaxed">{message}</p>
          <div className="mt-6 flex justify-end">
            <button onClick={onClose} className="px-4 py-2 rounded-md bg-rose-500 text-white font-medium hover:bg-rose-600">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}
