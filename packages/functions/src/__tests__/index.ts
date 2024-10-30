import { addNumbers } from '../util'

// This is a dummy test
describe('packages/functions', () => {
  it('add 2 numbers correctly', () => {
    expect(addNumbers(1, 2)).toEqual(3)
    expect(addNumbers(5, 5)).not.toEqual(11)
  })
})
