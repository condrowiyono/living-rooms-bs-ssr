import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('check', (value) => {
  if (!value) {
    return '-'
  }

  return value
})

Vue.filter('shortDate', (value) => {
  return dayjs(value).format('YYYY-MM-DD')
})

Vue.filter('yearOfDate', (value) => {
  return dayjs(value).format('YYYY')
})

Vue.filter('inHour', (value) => {
  const hour = Math.floor(value / 60)
  value = value % 60
  return `${hour} j ${value} m`
})
