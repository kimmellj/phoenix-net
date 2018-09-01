import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Servers, { schema } from './model'

const router = new Router()
const { hostname, url, key, status } = schema.tree

/**
 * @api {post} /servers Create servers
 * @apiName CreateServers
 * @apiGroup Servers
 * @apiParam hostname Servers's hostname.
 * @apiParam url Servers's url.
 * @apiParam key Servers's key.
 * @apiParam status Servers's status.
 * @apiSuccess {Object} servers Servers's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Servers not found.
 */
router.post('/',
  body({ hostname, url, key, status }),
  create)

/**
 * @api {get} /servers Retrieve servers
 * @apiName RetrieveServers
 * @apiGroup Servers
 * @apiUse listParams
 * @apiSuccess {Object[]} servers List of servers.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /servers/:id Retrieve servers
 * @apiName RetrieveServers
 * @apiGroup Servers
 * @apiSuccess {Object} servers Servers's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Servers not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /servers/:id Update servers
 * @apiName UpdateServers
 * @apiGroup Servers
 * @apiParam hostname Servers's hostname.
 * @apiParam url Servers's url.
 * @apiParam key Servers's key.
 * @apiParam status Servers's status.
 * @apiSuccess {Object} servers Servers's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Servers not found.
 */
router.put('/:id',
  body({ hostname, url, key, status }),
  update)

/**
 * @api {delete} /servers/:id Delete servers
 * @apiName DeleteServers
 * @apiGroup Servers
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Servers not found.
 */
router.delete('/:id',
  destroy)

export default router
