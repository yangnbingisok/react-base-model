import { get, post } from '@/utils/request'

export const getActivityPageConfig = async activityid => {
  return await get({
    url: '/visual/activity/page',
    params: {
      activityid,
    },
  })
}

export const savePageInfo = async pageInfo => {
  return await post({
    url: '/visual/activity/save',
    data: pageInfo,
  })
}

export const saveSnapshot = async data => {
  return await post({
    url: '/visual/activity/snapshot/save',
    data,
  })
}

export const getSnapshot = async parentid => {
  return await get({
    url: '/visual/activity/snapshot/get',
    params: {
      parentid,
    },
  })
}
