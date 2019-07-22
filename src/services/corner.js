import { post } from '@/utils/request'

export const getCornerList = async () => {
  return await post({
    url: '/global/corner/list',
  })
}
