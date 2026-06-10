import { IconExternal } from './Icons'

interface SourceLink {
  name: string
  url: string
}

export function SourceFooter({ sources }: { sources: SourceLink[] }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Source</p>
      <div className="space-y-1.5">
        {sources.map((s) => (
          <a
            key={s.url}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            {s.name}
            <IconExternal className="w-3 h-3" />
          </a>
        ))}
      </div>
    </div>
  )
}
