import { Pool } from 'pg';

// This grabs the connection string from your .env.local file
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = (text, params) => pool.query(text, params);