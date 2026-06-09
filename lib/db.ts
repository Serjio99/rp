import mysql, { type Pool, type ResultSetHeader, type RowDataPacket } from "mysql2/promise";

declare global {
  // eslint-disable-next-line no-var
  var rpMysqlPool: Pool | undefined;
  // eslint-disable-next-line no-var
  var rpMysqlSchemaReady: Promise<void> | undefined;
}

export type DbUser = RowDataPacket & {
  id: number;
  email: string | null;
  username: string | null;
  telegram_id: string | null;
  telegram_username: string | null;
  password_hash: string | null;
  display_name: string;
  role: string;
  created_at: Date;
};

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing MySQL env: ${name}`);
  return value;
}

export function getPool() {
  if (!global.rpMysqlPool) {
    global.rpMysqlPool = mysql.createPool({
      host: requiredEnv("MYSQL_HOST"),
      port: Number(process.env.MYSQL_PORT || 3306),
      user: requiredEnv("MYSQL_USER"),
      password: requiredEnv("MYSQL_PASSWORD"),
      database: requiredEnv("MYSQL_DATABASE"),
      waitForConnections: true,
      connectionLimit: 10,
      namedPlaceholders: true,
    });
  }

  return global.rpMysqlPool;
}

export async function ensureSchema() {
  if (!global.rpMysqlSchemaReady) {
    global.rpMysqlSchemaReady = createSchema();
  }

  return global.rpMysqlSchemaReady;
}

async function createSchema() {
  const db = getPool();

  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      email VARCHAR(190) NULL,
      username VARCHAR(80) NULL,
      telegram_id VARCHAR(64) NULL,
      telegram_username VARCHAR(120) NULL,
      password_hash VARCHAR(255) NULL,
      display_name VARCHAR(160) NOT NULL,
      role VARCHAR(32) NOT NULL DEFAULT 'user',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY users_email_unique (email),
      UNIQUE KEY users_username_unique (username),
      UNIQUE KEY users_telegram_unique (telegram_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS sessions (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      user_id BIGINT UNSIGNED NOT NULL,
      token_hash CHAR(64) NOT NULL,
      expires_at DATETIME NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      last_seen_at TIMESTAMP NULL DEFAULT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY sessions_token_unique (token_hash),
      KEY sessions_user_id_index (user_id),
      CONSTRAINT sessions_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      user_id BIGINT UNSIGNED NOT NULL,
      server_type VARCHAR(40) NOT NULL,
      title VARCHAR(190) NOT NULL,
      budget VARCHAR(120) NULL,
      description TEXT NULL,
      status VARCHAR(40) NOT NULL DEFAULT 'ordered',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY orders_user_id_index (user_id),
      CONSTRAINT orders_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS support_tickets (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      user_id BIGINT UNSIGNED NOT NULL,
      order_id BIGINT UNSIGNED NULL,
      subject VARCHAR(190) NOT NULL,
      message TEXT NOT NULL,
      status VARCHAR(40) NOT NULL DEFAULT 'open',
      priority VARCHAR(30) NOT NULL DEFAULT 'normal',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY support_user_id_index (user_id),
      KEY support_order_id_index (order_id),
      CONSTRAINT support_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      CONSTRAINT support_order_fk FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
}

export async function queryRows<T extends RowDataPacket>(sql: string, values?: Record<string, unknown> | unknown[]) {
  await ensureSchema();
  const [rows] = await getPool().query<T[]>(sql, values as unknown as never);
  return rows;
}

export async function execute(sql: string, values?: Record<string, unknown> | unknown[]) {
  await ensureSchema();
  const [result] = await getPool().execute<ResultSetHeader>(sql, values as unknown as never);
  return result;
}
