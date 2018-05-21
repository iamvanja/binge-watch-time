import { schema } from 'normalizr'
import { season } from './seasons'

export const showSchema = new schema.Entity(
  'shows',
  {
    seasons: [season]
  },
  {
    processStrategy: (value, parent, key) => ({
      ...value,
      seasons: value.seasons || []
    })
  }
)

export const showsSchema = [showSchema]
