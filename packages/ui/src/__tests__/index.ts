import { multiple } from '../main'

describe('packages/ui', () => {
  it('should multiple correcly', () => {
    expect(multiple(2, 2)).toEqual(4)
  })
})
