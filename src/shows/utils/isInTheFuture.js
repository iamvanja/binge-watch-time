import moment from 'moment'

const isInTheFuture = (dateString = '') =>
  moment(dateString).isAfter(moment())

export default isInTheFuture
