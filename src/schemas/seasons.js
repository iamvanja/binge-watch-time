import { schema } from 'normalizr'

export const season = new schema.Entity('seasons', {}, {
  processStrategy: (value, parent, key) => ({
    ...value,
    showId: parent.id
  })
})
