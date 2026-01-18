import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve('./database.sqlite');
const db = new Database(dbPath);

try {
  db.exec(`
    -- 建新 table
    CREATE TABLE user_favorites_new (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      cafe_id TEXT NOT NULL,
      UNIQUE(user_id, cafe_id)
    );

    -- 搬資料
    INSERT INTO user_favorites_new (user_id, cafe_id)
    SELECT user_id, cafe_id FROM favorites;

    -- 刪舊 table
    DROP TABLE favorites;

    -- 改名
    ALTER TABLE user_favorites_new RENAME TO user_favorites;
  `);

  console.log('user_favorites table migrated successfully.');
} catch (err) {
  console.error('Migration failed:', err);
} finally {
  db.close();
}
