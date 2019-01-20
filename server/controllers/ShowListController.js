import ShowListModel from 'models/ShowListModel'

export const find = (req, res, next) => {
  return ShowListModel.find()
    .then(data => res.send(data))
    .catch(next)
}
