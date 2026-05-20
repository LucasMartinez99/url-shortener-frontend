import { useState } from 'react'
import toast from 'react-hot-toast'

export function useClipboard() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  function copy(text: string, id: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id)
      toast.success('Copied to clipboard!')
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  return { copy, copiedId }
}
