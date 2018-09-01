import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Servers } from '.'

const app = () => express(apiRoot, routes)

let servers

beforeEach(async () => {
  servers = await Servers.create({})
})

test('POST /servers 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ hostname: 'test', url: 'test', key: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.hostname).toEqual('test')
  expect(body.url).toEqual('test')
  expect(body.key).toEqual('test')
  expect(body.status).toEqual('test')
})

test('GET /servers 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /servers/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${servers.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(servers.id)
})

test('GET /servers/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /servers/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${servers.id}`)
    .send({ hostname: 'test', url: 'test', key: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(servers.id)
  expect(body.hostname).toEqual('test')
  expect(body.url).toEqual('test')
  expect(body.key).toEqual('test')
  expect(body.status).toEqual('test')
})

test('PUT /servers/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ hostname: 'test', url: 'test', key: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /servers/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${servers.id}`)
  expect(status).toBe(204)
})

test('DELETE /servers/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
