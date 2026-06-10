import { getLottoResults } from '@/data/store'
import { Card } from '@/components/ui/Card'
import { SourceFooter } from '@/components/ui/SourceFooter'
import { IconLotto } from '@/components/ui/Icons'

export default function LottoPage() {
  const results = getLottoResults()

  const grouped = results.reduce<Record<string, typeof results>>((acc, r) => {
    const key = r.game
    if (!acc[key]) acc[key] = []
    acc[key].push(r)
    return acc
  }, {})

  const orderedGames = ['Lotto', 'PowerBall', 'Daily Lotto', 'Lotto Plus 1', 'Lotto Plus 2', 'PowerBall Plus']

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center">
          <IconLotto className="w-5 h-5 text-yellow-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Lotto Results</h1>
          <p className="text-sm text-gray-500">Latest draw results</p>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-sm">No results available</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orderedGames.map((game) => {
            const draws = grouped[game]
            if (!draws) return null
            return (
              <div key={game}>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">{game}</h2>
                <div className="space-y-3">
                  {draws.map((draw) => (
                    <Card key={draw.id}>
                      <div className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs text-gray-500 mb-3">Draw: {draw.drawDate}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {draw.numbers.map((num, i) => (
                                <span
                                  key={i}
                                  className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-sm font-bold text-yellow-800"
                                >
                                  {num}
                                </span>
                              ))}
                              {draw.bonus && (
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-800">
                                  {draw.bonus}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right shrink-0 ml-4">
                            <p className="text-lg font-bold text-green-700">{draw.jackpot}</p>
                            {draw.winners !== undefined && (
                              <p className="text-xs text-gray-500 mt-1">
                                {draw.winners === 0 ? 'Rollover' : `${draw.winners} winner${draw.winners > 1 ? 's' : ''}`}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
          <SourceFooter sources={[{ name: 'National Lottery / Ithuba', url: 'https://www.nationallottery.co.za' }]} />
        </div>
      )}

      {results.length === 0 && (
        <SourceFooter sources={[{ name: 'National Lottery / Ithuba', url: 'https://www.nationallottery.co.za' }]} />
      )}
    </div>
  )
}
