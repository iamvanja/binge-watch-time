export const padSeasonEpisode = (val = '') => ('' + val).padStart(2, '0')

export const formatSeasonEpisode = (seasonNumber, episodeNumber) =>
  `S${padSeasonEpisode(seasonNumber)}E${padSeasonEpisode(episodeNumber)}`
