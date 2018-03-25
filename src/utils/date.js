import moment from 'moment'

// For moment formats, see: https://momentjs.com/docs/#/parsing/string-format/

const formatMoment = (value, formats, outputFormat) => {
  value = ('' + value).trim()
  if (!Array.isArray(formats) || !formats.length) {
    return ''
  }
  let formattedValue = ''

  /**
   * Any characters between the token are ignored when creating a new moment
   * instance `moment(value, format)`
   *
   * When in non-strict mode, moment.js is smart enough to parse the value
   * loosely and ignore bad characters etc
   * YYYY-MM-DD and YYYYMMDD is the same when parsing (string to moment)
   * YYYY-MM-DD and YYYYMMDD however is NOT the same when formatting (moment to string) going the other way (moment to string)
   *
   * While moment.js is smart, strict mode is preferred.
   * In non-strict mode, `moment.utc('123', 'YYYY-MM-DD').isValid()` equals to
   * true!
   */
  const strictMode = true

  formats.some(format => {
    const possibleValue = moment.utc(value, format, strictMode)

    if (possibleValue.isValid()) {
      // once we find a valid date, format the date string
      // example: 20170726 => moment date => 2017-07-26
      formattedValue = possibleValue.format(outputFormat)

      // exit the loop
      return true
    }
  })

  return formattedValue
}

export const formatDate = (value, outputFormat) => {
  const formats = [
    'YYYY-MM-DD',
    'YYYYMMDD',
    'YYYY/MM/DD',
    'YYYYDDMM',
    'YYYY-DD-MM',
    'YYYY/DD/MM'
  ]
  return formatMoment(value, formats, outputFormat)
}
