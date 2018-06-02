import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Messages } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, adminSession, messages

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  adminSession = signSync(admin.id)
  messages = await Messages.create({ user })
})

test('POST /messages 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, text: 'test', created: 'test', updated: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.text).toEqual('test')
  expect(body.created).toEqual('test')
  expect(body.updated).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /messages 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /messages 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].user).toEqual('object')
})

test('GET /messages 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /messages/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${messages.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(messages.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /messages/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${messages.id}`)
  expect(status).toBe(401)
})

test('GET /messages/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /messages/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${messages.id}`)
    .send({ access_token: userSession, text: 'test', created: 'test', updated: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(messages.id)
  expect(body.text).toEqual('test')
  expect(body.created).toEqual('test')
  expect(body.updated).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /messages/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${messages.id}`)
    .send({ access_token: anotherSession, text: 'test', created: 'test', updated: 'test' })
  expect(status).toBe(401)
})

test('PUT /messages/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${messages.id}`)
  expect(status).toBe(401)
})

test('PUT /messages/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, text: 'test', created: 'test', updated: 'test' })
  expect(status).toBe(404)
})

test('DELETE /messages/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${messages.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /messages/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${messages.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('DELETE /messages/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${messages.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /messages/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${messages.id}`)
  expect(status).toBe(401)
})

test('DELETE /messages/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
