import { useState, useEffect } from 'react'
import { Modal }               from '../ui/Modal'
import { Input }               from '../ui/Input'
import { Button }              from '../ui/Button'
import { useUpdateUrl }        from '../../hooks/useUrls'
import type { ShortUrl }       from '../../../../../domain/model/ShortUrl'

interface Props {
  open:    boolean
  onClose: () => void
  url:     ShortUrl | null
}

export function EditUrlModal({ open, onClose, url }: Props) {
  const [originalUrl, setOriginalUrl] = useState('')
  const [customAlias, setCustomAlias] = useState('')
  const [clearAlias,  setClearAlias]  = useState(false)
  const [expiresAt,   setExpiresAt]   = useState('')
  const [clearExpiry, setClearExpiry] = useState(false)
  const [active,      setActive]      = useState(true)
  const { mutateAsync, isPending }    = useUpdateUrl()

  useEffect(() => {
    if (url) {
      setOriginalUrl(url.originalUrl)
      setCustomAlias(url.customAlias ?? '')
      setExpiresAt(url.expiresAt ? url.expiresAt.slice(0, 16) : '')
      setActive(url.active)
      setClearAlias(false)
      setClearExpiry(false)
    }
  }, [url])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!url) return
    await mutateAsync({
      id: url.id,
      cmd: {
        originalUrl: originalUrl !== url.originalUrl ? originalUrl : undefined,
        customAlias: !clearAlias && customAlias !== (url.customAlias ?? '') ? customAlias || undefined : undefined,
        clearAlias,
        expiresAt:   !clearExpiry && expiresAt ? new Date(expiresAt).toISOString() : undefined,
        clearExpiry,
        active,
      },
    })
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Edit Link">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Destination URL"
          type="url"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />

        <div className="flex flex-col gap-1">
          <Input
            label="Custom alias"
            placeholder="my-link"
            value={customAlias}
            onChange={(e) => { setCustomAlias(e.target.value); setClearAlias(false) }}
            disabled={clearAlias}
          />
          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={clearAlias}
              onChange={(e) => { setClearAlias(e.target.checked); if (e.target.checked) setCustomAlias('') }}
              className="rounded"
            />
            Remove custom alias
          </label>
        </div>

        <div className="flex flex-col gap-1">
          <Input
            label="Expiration date"
            type="datetime-local"
            value={expiresAt}
            onChange={(e) => { setExpiresAt(e.target.value); setClearExpiry(false) }}
            disabled={clearExpiry}
          />
          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={clearExpiry}
              onChange={(e) => { setClearExpiry(e.target.checked); if (e.target.checked) setExpiresAt('') }}
              className="rounded"
            />
            Remove expiration
          </label>
        </div>

        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="rounded"
          />
          Link is active
        </label>

        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={isPending}>Save changes</Button>
        </div>
      </form>
    </Modal>
  )
}
