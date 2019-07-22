import { post } from '@/utils/request'

export const getSkuInfo = async skuCode => {
  return await post({
    url: '/sku/info',
    params: {
      skuCode,
    },
  })
}

export const getSkuBatchInfo = async skucodes => {
  return await post({
    url: '/sku/batch/info',
    params: {
      skucodes,
    },
  })
}
