export let BASE_URL = ''

const initBaseUrl = () => {
  const { host, pathname } = window.location
  const testEnv = ['newstage', 'qa3', 'qa2', 't1']
  const testApi = testEnv.find(item => pathname.includes(item))
  switch (host) {
  case 'activity.yonghuivip.com':
    BASE_URL = '//api.yonghuivip.com/api'
    break
  case 'test-activity.yonghuivip.com':
    BASE_URL = `//api-${testApi === 'newstage' ? 'stage' : testApi}.yonghuivip.com/api`
    break
  default:
    BASE_URL = '//10.19.117.252:11130'
  }
}

initBaseUrl()
