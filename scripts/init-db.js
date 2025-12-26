const sqlite3 = require('sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '../database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error(err.message);
  console.log('Connected to SQLite database.');
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS cafes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        address TEXT,
        wifi REAL,
        seat INTEGER,
        tags TEXT
    )
    `);

  db.run(`
    INSERT INTO cafes (name, address, wifi, seat, tags)
    VALUES ('Coffee Shop A', '123 Street', 4.5, 20, 'wifi,quiet')
    `);

  db.close();
});
