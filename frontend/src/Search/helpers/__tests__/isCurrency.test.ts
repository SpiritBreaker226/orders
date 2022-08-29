import { isCurrency } from '../isCurrency'

describe('isCurrency', () => {
  it('should be true on numbers', () => {
    expect(isCurrency('12')).toBeTruthy()
  })

  it('should be true on format currency', () => {
    expect(isCurrency('12.99')).toBeTruthy()
  })

  it('should be true on partial currency (i.e. 2.)', () => {
    expect(isCurrency('2.')).toBeTruthy()
  })

  it('should be false when there is letters', () => {
    expect(isCurrency('sd')).toBeFalsy()
  })

  it('should be false using special characters', () => {
    expect(isCurrency('$')).toBeFalsy()
  })

  describe('after the decimal point', () => {
    it('should be false when there is letters', () => {
      expect(isCurrency('6.111sd')).toBeFalsy()
    })

    it('should be false when there is more numbers', () => {
      expect(isCurrency('2.992233222')).toBeFalsy()
    })
  })
})
