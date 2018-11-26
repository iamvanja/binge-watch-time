import { schema } from 'normalizr'

export const episodeSchema = new schema.Entity('episodes', {}, {
  processStrategy: (value, parent, key) => {
    const extra = {}
    if (parent.showId) {
      extra.showId = parent.showId
    }

    return {
      ...value,
      ...extra
    }
  }
})

export const seasonSchema = new schema.Entity(
  'seasons',
  {
    episodes: [episodeSchema]
  },
  {
    processStrategy: (value, parent, key) => {
      const extra = {}
      // console.log('parent', parent)
      if (parent.showId) {
        extra.showId = parent.showId
      }
      if (parent.id !== value.id) {
        extra.showId = parent.id
      }
      extra.episodes = value.episodes || []

      return {
        ...value,
        ...extra
      }
    }
  }
)

export const showSchema = new schema.Entity(
  'shows',
  {
    seasons: [seasonSchema]
  },
  {
    processStrategy: (value, parent, key) => ({
      ...value,
      seasons: value.seasons || []
    })
  }
)

export const showsSchema = [showSchema]
