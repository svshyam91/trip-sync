import { Pool } from 'pg';

import { env } from './env.js';

const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: env.nodeEnv === 'production' ? { rejectUnauthorized: false } : false,
});

export default pool;
