import { typeCast, prepareInsertValues, sqlWhere } from '../utils'

describe('mysql utils', () => {
  describe('typeCast', () => {
    let field
    let next
    beforeEach(() => {
      field = {
        type: 'TINY',
        length: 1,
        string: () => '1'
      }
      next = () => true
    })

    it('returns true', () => {
      expect(typeCast(field, next)).toBe(true)
    })

    it('returns false', () => {
      field.string = () => '2'
      expect(typeCast(field, next)).toBe(false)
    })
  })

  describe('prepareInsertValues', () => {
    let values
    beforeEach(() => {
      values = {
        first_name: 'John',
        last_name: 'Doe'
      }
    })

    it('returns escaped string', () => {
      delete values['last_name']
      expect(prepareInsertValues(values)).toEqual(
        "`first_name` = 'John'"
      )
    })

    it('returns comma separated escaped string', () => {
      expect(prepareInsertValues(values)).toEqual(
        "`first_name` = 'John',`last_name` = 'Doe'"
      )
    })

    it('handles null correctly', () => {
      delete values['last_name']
      values.foo = null
      expect(prepareInsertValues(values)).toEqual(
        "`first_name` = 'John',`foo` = NULL"
      )
    })

    it('returns empty string', () => {
      expect(prepareInsertValues(undefined)).toEqual('')
      expect(prepareInsertValues(null)).toEqual('')
      expect(prepareInsertValues('aaaaa')).toEqual('')
    })
  })

  describe('sqlWhere', () => {
    let where
    beforeEach(() => {
      where = {
        first_name: 'John',
        last_name: 'Doe'
      }
    })

    it('returns escaped string', () => {
      delete where['last_name']
      expect(sqlWhere(where)).toEqual(
        "WHERE `first_name` = 'John'"
      )
    })

    it('returns AND separated escaped string', () => {
      expect(sqlWhere(where)).toEqual(
        "WHERE `first_name` = 'John' AND `last_name` = 'Doe'"
      )
    })

    it('handles null correctly', () => {
      delete where['last_name']
      where.foo = null
      expect(sqlWhere(where)).toEqual(
        "WHERE `first_name` = 'John' AND `foo` IS NULL"
      )
    })

    it('returns empty string', () => {
      where = undefined
      expect(sqlWhere(where)).toEqual('')
    })

    it('returns string', () => {
      where = '123'
      expect(sqlWhere(where)).toEqual(`WHERE ${where}`)
    })
  })
})
