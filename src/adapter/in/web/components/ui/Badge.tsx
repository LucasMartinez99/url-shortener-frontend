type Variant = 'active' | 'inactive' | 'expired'

interface Props { variant: Variant }

const styles: Record<Variant, string> = {
  active:   'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  inactive: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
  expired:  'bg-red-50 text-red-600 ring-1 ring-red-200',
}

const labels: Record<Variant, string> = {
  active:   'Active',
  inactive: 'Inactive',
  expired:  'Expired',
}

export function Badge({ variant }: Props) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${styles[variant]}`}>
      <span className={`mr-1 h-1.5 w-1.5 rounded-full ${variant === 'active' ? 'bg-emerald-500' : variant === 'expired' ? 'bg-red-500' : 'bg-slate-400'}`} />
      {labels[variant]}
    </span>
  )
}
