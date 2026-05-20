import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  page:       number
  totalPages: number
  onPage:     (page: number) => void
}

export function Pagination({ page, totalPages, onPage }: Props) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-1 mt-4">
      <button
        onClick={() => onPage(page - 1)}
        disabled={page === 0}
        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <ChevronLeft size={16} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPage(i)}
          className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
            i === page
              ? 'bg-brand-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => onPage(page + 1)}
        disabled={page >= totalPages - 1}
        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
