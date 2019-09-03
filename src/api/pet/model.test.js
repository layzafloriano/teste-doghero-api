import { Pet } from '.'

let pet

beforeEach(async () => {
  pet = await Pet.create({ name: 'test', age: 'test', bearing: 'test', picture: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = pet.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(pet.id)
    expect(view.name).toBe(pet.name)
    expect(view.age).toBe(pet.age)
    expect(view.bearing).toBe(pet.bearing)
    expect(view.picture).toBe(pet.picture)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = pet.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(pet.id)
    expect(view.name).toBe(pet.name)
    expect(view.age).toBe(pet.age)
    expect(view.bearing).toBe(pet.bearing)
    expect(view.picture).toBe(pet.picture)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
