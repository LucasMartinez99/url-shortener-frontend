import { useState }            from 'react'
import { Plus }                from 'lucide-react'
import { useUrls }             from '../../hooks/useUrls'
import { useClipboard }        from '../../hooks/useClipboard'
import { Button }              from '../ui/Button'
import { Spinner }             from '../ui/Spinner'
import { Pagination }          from '../ui/Pagination'
import { UrlRow }              from './UrlRow'
import { CreateUrlModal }      from './CreateUrlModal'
import { EditUrlModal }        from './EditUrlModal'
import { DeleteConfirmModal }  from './DeleteConfirmModal'
import type { ShortUrl }       from '../../../../../domain/model/ShortUrl'

export function UrlTable() {
  const [page, setPage]           = useState(0)
  const [createOpen, setCreate]   = useState(false)
  const [editUrl, setEditUrl]     = useState<ShortUrl | null>(null)
  const [deleteUrl, setDeleteUrl] = useState<ShortUrl | null>(null)
  const { data, isLoading, isError } = useUrls(page)
  const clipboard = useClipboard()

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">My Links</h1>
          {data && (
            <p className="text-sm text-slate-500 mt-0.5">
              {data.totalElements} {data.totalElements === 1 ? 'link' : 'links'} total
            </p>
          )}
        </div>
        <Button onClick={() => setCreate(true)} className="self-start sm:self-auto">
          <Plus size={16} />
          New link
        </Button>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <Spinner className="w-6 h-6" />
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center h-48 text-sm text-red-500">
            Failed to load links. Please try again.
          </div>
        ) : !data?.content.length ? (
          <div className="flex flex-col items-center justify-center h-48 gap-2 text-center px-4">
            <p className="text-slate-400 text-sm">No links yet.</p>
            <Button size="sm" variant="secondary" onClick={() => setCreate(true)}>
              Create your first link
            </Button>
          </div>
        ) : (
          <>
            {/* Table header */}
            <div className="hidden md:grid grid-cols-[2fr_3fr_90px_90px_100px_80px] gap-4 px-5 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              <span>Short link</span>
              <span>Destination</span>
              <span>Clicks</span>
              <span>Created</span>
              <span>Status</span>
              <span />
            </div>

            <ul className="divide-y divide-slate-100">
              {data.content.map((url) => (
                <UrlRow
                  key={url.id}
                  url={url}
                  clipboard={clipboard}
                  onEdit={() => setEditUrl(url)}
                  onDelete={() => setDeleteUrl(url)}
                />
              ))}
            </ul>

            <div className="px-5 py-4 border-t border-slate-100">
              <Pagination page={page} totalPages={data.totalPages} onPage={setPage} />
            </div>
          </>
        )}
      </div>

      <CreateUrlModal     open={createOpen}     onClose={() => setCreate(false)} />
      <EditUrlModal       open={!!editUrl}       onClose={() => setEditUrl(null)}   url={editUrl} />
      <DeleteConfirmModal open={!!deleteUrl}     onClose={() => setDeleteUrl(null)} url={deleteUrl} />
    </>
  )
}
