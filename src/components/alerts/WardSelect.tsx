'use client'

import { useState, useEffect } from 'react'
import { SOWETO } from '@/data/municipality'
import { IconChevronDown } from '@/components/ui/Icons'

const STORAGE_KEY = 'mzansi-wards'

function loadWards(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveWards(ids: string[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
}

export function useSelectedWards() {
  const [wardIds, setWardIds] = useState<string[]>([])

  useEffect(() => {
    setWardIds(loadWards())
  }, [])

  const selectWard = (id: string) => {
    const next = loadWards()
    if (next.includes(id)) {
      const filtered = next.filter((w) => w !== id)
      saveWards(filtered)
      setWardIds(filtered)
    } else {
      const updated = [...next, id]
      saveWards(updated)
      setWardIds(updated)
    }
  }

  return { wardIds, selectWard, setWardIds }
}

export function WardSelect({
  wardIds,
  onToggle,
}: {
  wardIds: string[]
  onToggle: (id: string) => void
}) {
  const [open, setOpen] = useState(false)
  const selectedCount = wardIds.length

  const selectedNames = selectedCount > 0
    ? SOWETO.sections
        .flatMap((s) => s.wards)
        .filter((w) => wardIds.includes(w.id))
        .slice(0, 2)
        .map((w) => `Ward ${w.number}`)
    : []

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:border-gray-300 transition-colors w-full sm:w-auto"
      >
        <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span className="font-medium">
          {selectedNames.length > 0 ? selectedNames.join(', ') : 'Select your ward'}
        </span>
        {selectedCount > 0 && (
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
            {selectedCount}
          </span>
        )}
        <IconChevronDown className="w-4 h-4 text-gray-400 ml-1" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 right-0 z-50 mt-1 max-h-80 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
            {SOWETO.sections.map((section) => (
              <div key={section.id} className="border-b border-gray-100 last:border-0">
                <h4 className="px-3 pt-2.5 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {section.name}
                </h4>
                <div className="flex flex-wrap gap-1 px-3 pb-2.5">
                  {section.wards.map((ward) => {
                    const selected = wardIds.includes(ward.id)
                    return (
                      <button
                        key={ward.id}
                        onClick={() => onToggle(ward.id)}
                        className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                          selected
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Ward {ward.number}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
