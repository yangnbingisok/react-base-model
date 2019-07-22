import { get } from '@/utils/request'

export const getInLinks = async () => {
  return await get({
    url: '/global/inlinks/ref',
  })
}
