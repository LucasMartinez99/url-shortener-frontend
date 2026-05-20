import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { shortUrlService }                        from '../../../../infrastructure/di/container'
import type { CreateShortUrlCommand, UpdateShortUrlCommand } from '../../../../domain/port/in/ShortUrlUseCase'
import toast from 'react-hot-toast'

export function useUrls(page: number, size = 10) {
  return useQuery({
    queryKey: ['urls', page, size],
    queryFn:  () => shortUrlService.getUrls(page, size),
  })
}

export function useCreateUrl() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (cmd: CreateShortUrlCommand) => shortUrlService.create(cmd),
    onSuccess:  () => {
      qc.invalidateQueries({ queryKey: ['urls'] })
      toast.success('Short URL created!')
    },
    onError: (err: any) => toast.error(err.message ?? 'Failed to create URL'),
  })
}

export function useUpdateUrl() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, cmd }: { id: string; cmd: UpdateShortUrlCommand }) =>
      shortUrlService.update(id, cmd),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['urls'] })
      toast.success('URL updated!')
    },
    onError: (err: any) => toast.error(err.message ?? 'Failed to update URL'),
  })
}

export function useDeleteUrl() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => shortUrlService.delete(id),
    onSuccess:  () => {
      qc.invalidateQueries({ queryKey: ['urls'] })
      toast.success('URL deleted')
    },
    onError: (err: any) => toast.error(err.message ?? 'Failed to delete URL'),
  })
}
