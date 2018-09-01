import { success, notFound } from '../../services/response/'
import { Servers } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Servers.create(body)
    .then((servers) => servers.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Servers.find(query, select, cursor)
    .then((servers) => servers.map((servers) => servers.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Servers.findById(params.id)
    .then(notFound(res))
    .then((servers) => servers ? servers.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Servers.findById(params.id)
    .then(notFound(res))
    .then((servers) => servers ? Object.assign(servers, body).save() : null)
    .then((servers) => servers ? servers.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Servers.findById(params.id)
    .then(notFound(res))
    .then((servers) => servers ? servers.remove() : null)
    .then(success(res, 204))
    .catch(next)
