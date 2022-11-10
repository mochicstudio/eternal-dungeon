import { getRandomNumber } from '../../src/utils/random-number-generator.util';

describe('Random Number Generator Utils Test', () => {
  test('getRandomNumber should return a number between the min and max values', async (min = 1, max = 10) => {
    expect(getRandomNumber(min, max)).toBeGreaterThanOrEqual(min);
    expect(getRandomNumber(min, max)).toBeLessThanOrEqual(max);
  });
});