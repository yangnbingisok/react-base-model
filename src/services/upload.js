import { post } from '@/utils/request'

export const getUploadToken = async () => {
  return await post({ url: '/global/qiniu/token' })
}
