import moment from 'moment'

export function timeRange(from, range = 'day') {
  const time = moment(from)
  return {
    start: time.startOf(range).toISOString(),
    end: time
      .endOf(range)
      .add(1, 'M')
      .subtract(1, 'day')
      .toISOString(),
  }
}

export function formatMomentTime(momentTime, format = 'YYYY-MM-DD HH:mm:ss') {
  return momentTime.format(format)
}

export function formatTime(time, format = 'YYYY-MM-DD HH:mm:ss') {
  return formatMomentTime(moment(time), format)
}

export function getTimeValue(time) {
  return moment(time).valueOf()
}
