import test from 'node:test';
import assert from 'node:assert/strict';

import rateLimiter from '../src/middleware/rateLimiter.js';

test('rate limiter falls back gracefully when Upstash is unavailable', async () => {
  let nextCalledWithError = null;
  const req = {};
  const res = {
    statusCode: 200,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.payload = payload;
      return this;
    },
  };
  const next = (error) => {
    nextCalledWithError = error;
  };

  await rateLimiter(req, res, next);

  assert.equal(nextCalledWithError, undefined);
  assert.equal(res.statusCode, 200);
<<<<<<< HEAD
});
=======
});
>>>>>>> a6095f994e3b3ea4f9fdd0dfe00b8acba063ca02
