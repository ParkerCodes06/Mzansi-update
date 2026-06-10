import { getJobs } from '@/data/store'
import { Card } from '@/components/ui/Card'
import { SourceFooter } from '@/components/ui/SourceFooter'
import { IconJobs, IconExternal, IconMapPin } from '@/components/ui/Icons'

export default function JobsPage() {
  const jobs = getJobs()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
          <IconJobs className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Jobs in Soweto</h1>
          <p className="text-sm text-gray-500">Latest listings</p>
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-sm">No jobs listed right now</p>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <Card key={job.id}>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-600 mt-0.5">{job.company}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <IconMapPin className="w-3.5 h-3.5" /> {job.location}
                      </span>
                      <span>{job.postedAt}</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-2">{job.description}</p>
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      Apply <IconExternal className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <SourceFooter sources={[{ name: 'FirstJobly', url: 'https://firstjobly.co.za' }]} />
    </div>
  )
}
