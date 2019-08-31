import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Pet } from '.'

const app = () => express(apiRoot, routes)

let pet

beforeEach(async () => {
  pet = await Pet.create({})
})

test('POST /pets 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, name: 'test', age: 'test', bearing: 'test', picture: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.age).toEqual('test')
  expect(body.bearing).toEqual('test')
  expect(body.picture).toEqual('test')
})

test('POST /pets 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /pets 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /pets 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /pets/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${pet.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(pet.id)
})

test('GET /pets/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${pet.id}`)
  expect(status).toBe(401)
})

test('GET /pets/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /pets/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${pet.id}`)
    .send({ access_token: masterKey, name: 'test', age: 'test', bearing: 'test', picture: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(pet.id)
  expect(body.name).toEqual('test')
  expect(body.age).toEqual('test')
  expect(body.bearing).toEqual('test')
  expect(body.picture).toEqual('test')
})

test('PUT /pets/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${pet.id}`)
  expect(status).toBe(401)
})

test('PUT /pets/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, name: 'test', age: 'test', bearing: 'test', picture: 'test' })
  expect(status).toBe(404)
})

test('DELETE /pets/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${pet.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /pets/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${pet.id}`)
  expect(status).toBe(401)
})

test('DELETE /pets/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
