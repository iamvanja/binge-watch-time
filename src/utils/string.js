export const padSeasonEpisode = (val = '') => ('' + val).padStart(2, '0')

export const formatSeasonEpisode = (seasonNumber, episodeNumber) =>
  `S${padSeasonEpisode(seasonNumber)}E${padSeasonEpisode(episodeNumber)}`

export const getYearFromDateString = (dateString) => {
  var date = new Date(dateString)

  return !isNaN(date)
    ? '' + date.getFullYear()
    : ''
}
