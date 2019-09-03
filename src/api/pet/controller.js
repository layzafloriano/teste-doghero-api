import { success, notFound } from '../../services/response/'
import { Pet } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Pet.create(body)
    .then((pet) => pet.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Pet.count(query)
    .then(count => Pet.find(query, select, cursor)
      .then((pets) => ({
        count,
        rows: pets.map((pet) => pet.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Pet.findById(params.id)
    .then(notFound(res))
    .then((pet) => pet ? pet.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Pet.findById(params.id)
    .then(notFound(res))
    .then((pet) => pet ? Object.assign(pet, body).save() : null)
    .then((pet) => pet ? pet.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Pet.findById(params.id)
    .then(notFound(res))
    .then((pet) => pet ? pet.remove() : null)
    .then(success(res, 204))
    .catch(next)
