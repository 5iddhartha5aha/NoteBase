import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

import dotenv from 'dotenv';

dotenv.config();

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(), // Use environment variables for configuration
  limiter: Ratelimit.slidingWindow(10, '20 s'), // Allow 10 requests per 20 seconds     
});

export default ratelimit;