import axios from 'axios'
import qs from 'query-string'
import { BASE_URL } from '@/configs/settings'

export const fakeGet = (data, time = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data, time)
    })
  })
}

export const get = ({ url, params = {} }) => {
  return new Promise((resolve, reject) => {
    const queryParams = qs.stringify(params) || ''
    const requstUrl = `${BASE_URL}${url}${queryParams ? `?${queryParams}` : ''}`
    return axios
      .get(requstUrl)
      .then(rs => {
        const res = rs.data
        if (res.code !== 0) {
          reject(res.message)
        } else {
          resolve(res.data)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const post = ({ url, data = {}, params = {}, headers = {} }) => {
  return new Promise((resolve, reject) => {
    const queryParams = qs.stringify(params) || ''
    const requstUrl = `${BASE_URL}${url}${queryParams ? `?${queryParams}` : ''}`
    return axios({
      url: requstUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...headers,
      },
      data: JSON.stringify(data),
    })
      .then(rs => {
        const res = rs.data
        if (res.code !== 0) {
          reject(res.message)
        } else {
          resolve(res.data)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}
