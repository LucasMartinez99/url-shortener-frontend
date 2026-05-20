import { Copy, Check, Pencil, Trash2, ExternalLink } from 'lucide-react'
import { Badge }          from '../ui/Badge'
import type { ShortUrl }  from '../../../../../domain/model/ShortUrl'

interface ClipboardHelper {
  copy:     (text: string, id: string) => void
  copiedId: string | null
}

interface Props {
  url:       ShortUrl
  clipboard: ClipboardHelper
  onEdit:    () => void
  onDelete:  () => void
}

function getBadgeVariant(url: ShortUrl): 'active' | 'inactive' | 'expired' {
  if (url.expiresAt && new Date(url.expiresAt) < new Date()) return 'expired'
  return url.active ? 'active' : 'inactive'
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

function truncate(str: string, max: number) {
  return str.length > max ? str.slice(0, max) + '…' : str
}

export function UrlRow({ url, clipboard, onEdit, onDelete }: Props) {
  const copied = clipboard.copiedId === url.id

  return (
    <li className="grid md:grid-cols-[2fr_3fr_90px_90px_100px_80px] gap-4 items-center px-5 py-4 hover:bg-slate-50 transition-colors">

      {/* Short link */}
      <div className="flex items-center gap-2 min-w-0">
        <a
          href={url.shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-brand-600 hover:text-brand-700 truncate flex items-center gap-1"
        >
          {url.customAlias ?? url.shortCode}
          <ExternalLink size={12} className="flex-shrink-0 opacity-60" />
        </a>
      </div>

      {/* Original URL */}
      <div className="min-w-0">
        <p className="text-sm text-slate-600 truncate" title={url.originalUrl}>
          {truncate(url.originalUrl.replace(/^https?:\/\//, ''), 55)}
        </p>
      </div>

      {/* Clicks */}
      <div className="flex items-center gap-1">
        <span className="text-sm font-semibold text-slate-900">{url.clickCount.toLocaleString()}</span>
      </div>

      {/* Created */}
      <div>
        <span className="text-xs text-slate-500">{formatDate(url.createdAt)}</span>
      </div>

      {/* Status */}
      <div>
        <Badge variant={getBadgeVariant(url)} />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 justify-end">
        <button
          onClick={() => clipboard.copy(url.shortUrl, url.id)}
          title="Copy short URL"
          className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition"
        >
          {copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
        </button>
        <button
          onClick={onEdit}
          title="Edit"
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <Pencil size={15} />
        </button>
        <button
          onClick={onDelete}
          title="Delete"
          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </li>
  )
}
