import Database from 'better-sqlite3';
import path from 'path';
import { randomUUID } from 'crypto';

// 將 database 路徑固定到專案根目錄
const dbPath = path.resolve('./database.sqlite');

const db = new Database(dbPath);

db.pragma('foreign_keys = ON');

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS cafes (
    id TEXT PRIMARY KEY,
    name TEXT,
    city TEXT,
    wifi INTEGER,
    seat INTEGER,
    quiet INTEGER,
    tasty INTEGER,
    cheap INTEGER,
    music INTEGER,
    url TEXT,
    address TEXT,
    latitude TEXT,
    longitude TEXT,
    limited_time TEXT,
    socket TEXT,
    standing_desk TEXT,
    mrt TEXT,
    open_time TEXT
    )
    `
).run();

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`
).run();

db.prepare(
  `
  INSERT OR IGNORE INTO users (id, email, password_hash, name)
  VALUES (?, ?, ?, ?)
`
).run(randomUUID(), 'test@test.com', '1234', '測試使用者');

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS user_favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    cafe_id TEXT NOT NULL,
    UNIQUE(user_id, cafe_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (cafe_id) REFERENCES cafes(id) ON DELETE CASCADE
  )
`
).run();

export default db;
