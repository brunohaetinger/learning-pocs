// test/math.test.js
import { test, describe } from 'node:test';
import assert from 'node:assert';
import { add, multiply } from '../math.js';

describe('Math functions', () => {
  test('adds numbers correctly', () => {
    assert.strictEqual(add(2, 3), 5);
  });

  test('handles async operations', async () => {
    const result = await multiply(2, 3);
    assert.strictEqual(result, 6);
  });

  test('throws on invalid input', () => {
    assert.throws(() => add('a', 'b'), /Invalid input/);
  });
});
