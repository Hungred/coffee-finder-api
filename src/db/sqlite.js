import Database from 'better-sqlite3';
import path from 'path';

// 將 database 路徑固定到專案根目錄
const dbPath = path.resolve('./database.sqlite');

const db = new Database(dbPath);
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
export default db;
