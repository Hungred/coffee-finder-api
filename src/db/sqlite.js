const sqlite3 = require('sqlite3');
const path = require('path');

const dbPath = path.resolve(process.cwd(), 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect DB:', err);
  } else {
    console.log('Connected to SQLite');
  }
});

module.exports = db;
