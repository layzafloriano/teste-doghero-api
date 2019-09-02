import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Pet, { schema } from './model'

const router = new Router()
const { name, age, bearing, picture, ownerID } = schema.tree

/**
 * @api {post} /pets Create pet
 * @apiName CreatePet
 * @apiGroup Pet
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Pet's name.
 * @apiParam age Pet's age.
 * @apiParam bearing Pet's bearing.
 * @apiParam picture Pet's picture.
 * @apiSuccess {Object} pet Pet's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Pet not found.
 * @apiError 401 master access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, age, bearing, picture, ownerID }),
  create)

/**
 * @api {get} /pets Retrieve pets
 * @apiName RetrievePets
 * @apiGroup Pet
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of pets.
 * @apiSuccess {Object[]} rows List of pets.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /pets/:id Retrieve pet
 * @apiName RetrievePet
 * @apiGroup Pet
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} pet Pet's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Pet not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  show)

/**
 * @api {put} /pets/:id Update pet
 * @apiName UpdatePet
 * @apiGroup Pet
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Pet's name.
 * @apiParam age Pet's age.
 * @apiParam bearing Pet's bearing.
 * @apiParam picture Pet's picture.
 * @apiSuccess {Object} pet Pet's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Pet not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, age, bearing, picture, ownerID }),
  update)

/**
 * @api {delete} /pets/:id Delete pet
 * @apiName DeletePet
 * @apiGroup Pet
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Pet not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
