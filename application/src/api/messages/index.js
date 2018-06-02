import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token, master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Messages, { schema } from './model'

const router = new Router()
const { text, created, updated } = schema.tree

/**
 * @api {post} /messages Create messages
 * @apiName CreateMessages
 * @apiGroup Messages
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam text Messages's text.
 * @apiParam created Messages's created.
 * @apiParam updated Messages's updated.
 * @apiSuccess {Object} messages Messages's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Messages not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ text, created, updated }),
  create)

/**
 * @api {get} /messages Retrieve messages
 * @apiName RetrieveMessages
 * @apiGroup Messages
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of messages.
 * @apiSuccess {Object[]} rows List of messages.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /messages/:id Retrieve messages
 * @apiName RetrieveMessages
 * @apiGroup Messages
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} messages Messages's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Messages not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /messages/:id Update messages
 * @apiName UpdateMessages
 * @apiGroup Messages
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam text Messages's text.
 * @apiParam created Messages's created.
 * @apiParam updated Messages's updated.
 * @apiSuccess {Object} messages Messages's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Messages not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ text, created, updated }),
  update)

/**
 * @api {delete} /messages/:id Delete messages
 * @apiName DeleteMessages
 * @apiGroup Messages
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Messages not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
