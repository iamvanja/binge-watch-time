import Model from './BaseModel'

class ShowListModel extends Model {
  constructor () {
    super('show_list', ['list_id'])
  }
}

export default new ShowListModel()
