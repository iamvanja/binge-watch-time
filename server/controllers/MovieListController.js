import MovieListModel from 'models/MovieListModel'

export const find = (req, res, next) => {
  return MovieListModel.find()
    .then(data => res.send(data))
    .catch(next)
}
