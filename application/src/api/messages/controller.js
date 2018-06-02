import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Messages } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Messages.create({ ...body, user })
    .then((messages) => messages.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Messages.count(query)
    .then(count => Messages.find(query, select, cursor)
      .populate('user')
      .then((messages) => ({
        count,
        rows: messages.map((messages) => messages.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Messages.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((messages) => messages ? messages.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Messages.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((messages) => messages ? Object.assign(messages, body).save() : null)
    .then((messages) => messages ? messages.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Messages.findById(params.id)
    .then(notFound(res))
    .then((messages) => messages ? messages.remove() : null)
    .then(success(res, 204))
    .catch(next)
