import { useState }       from 'react'
import { Modal }          from '../ui/Modal'
import { Input }          from '../ui/Input'
import { Button }         from '../ui/Button'
import { useCreateUrl }   from '../../hooks/useUrls'

interface Props { open: boolean; onClose: () => void }

export function CreateUrlModal({ open, onClose }: Props) {
  const [originalUrl,  setOriginalUrl]  = useState('')
  const [customAlias,  setCustomAlias]  = useState('')
  const [expiresAt,    setExpiresAt]    = useState('')
  const { mutateAsync, isPending }      = useCreateUrl()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await mutateAsync({
      originalUrl,
      customAlias: customAlias || undefined,
      expiresAt:   expiresAt   || undefined,
    })
    setOriginalUrl('')
    setCustomAlias('')
    setExpiresAt('')
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Create Short URL">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Destination URL *"
          type="url"
          placeholder="https://example.com/very/long/path"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />
        <Input
          label="Custom alias"
          placeholder="my-link  (optional)"
          value={customAlias}
          onChange={(e) => setCustomAlias(e.target.value)}
          hint="Letters, numbers, hyphens and underscores. 3–30 chars."
        />
        <Input
          label="Expiration date"
          type="datetime-local"
          value={expiresAt}
          onChange={(e) => setExpiresAt(e.target.value)}
          hint="Leave empty for no expiration."
        />
        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={isPending}>Create link</Button>
        </div>
      </form>
    </Modal>
  )
}
