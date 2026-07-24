import mysql from 'mysql2/promise';
import { env } from '../config/env.js';

let pool: mysql.Pool | null = null;

export function getDbPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: env.DB_HOST,
      port: env.DB_PORT,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const db = getDbPool();
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    return Array.isArray(rows) && rows.length > 0;
  } catch (error) {
    console.warn(`⚠️ MySQL no disponible temporalmente en ${env.DB_HOST}:${env.DB_PORT}. Usando fallback resiliente.`);
    return false;
  }
}
