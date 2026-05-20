import { Modal }        from '../ui/Modal'
import { Button }       from '../ui/Button'
import { useDeleteUrl } from '../../hooks/useUrls'
import type { ShortUrl } from '../../../../../domain/model/ShortUrl'
import { Trash2 }       from 'lucide-react'

interface Props {
  open:    boolean
  onClose: () => void
  url:     ShortUrl | null
}

export function DeleteConfirmModal({ open, onClose, url }: Props) {
  const { mutateAsync, isPending } = useDeleteUrl()

  async function handleDelete() {
    if (!url) return
    await mutateAsync(url.id)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Delete Link" maxWidth="max-w-sm">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50">
          <Trash2 size={22} className="text-red-500" />
        </div>
        <div>
          <p className="text-sm text-slate-700 font-medium">
            Are you sure you want to delete this link?
          </p>
          <p className="text-xs text-slate-500 mt-1 break-all">
            {url?.shortUrl}
          </p>
          <p className="text-xs text-slate-400 mt-1">This action cannot be undone.</p>
        </div>
        <div className="flex gap-2 w-full">
          <Button variant="secondary" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button variant="danger" className="flex-1" loading={isPending} onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  )
}
