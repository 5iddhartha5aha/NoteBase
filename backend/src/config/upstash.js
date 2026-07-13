import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

import dotenv from 'dotenv';

dotenv.config();

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

let ratelimit = null;

if (redisUrl && redisToken) {
  try {
    const redis = new Redis({
      url: redisUrl,
      token: redisToken,
    });

    ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '20 s'),
      prefix: 'notes-app',
    });
  } catch (error) {
    console.warn('[rate-limit] Failed to initialize Upstash client:', error.message);
  }
} else {
  console.warn('[rate-limit] Upstash environment variables are not configured; using fallback mode.');
}

const fallbackRateLimit = async () => ({ success: true });

const rateLimiterClient = {
  async limit(key) {
    if (!ratelimit) {
      return fallbackRateLimit(key);
    }

    try {
      return await ratelimit.limit(key);
    } catch (error) {
      console.warn('[rate-limit] Upstash request failed, falling back to allow:', error.message);
      return fallbackRateLimit(key);
    }
  },
};

export default rateLimiterClient;