const COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  critical: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  warning: { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  info: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
}

const LABELS = {
  critical: 'CRITICAL',
  warning: 'WARNING',
  info: 'INFO',
}

export function SeverityBadge({ severity }: { severity: 'critical' | 'warning' | 'info' }) {
  const c = COLORS[severity]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {LABELS[severity]}
    </span>
  )
}
