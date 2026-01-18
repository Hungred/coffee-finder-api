import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import db from '../src/db/sqlite.js';

const email = 'test@test.com';
const password = '1234';
const name = '測試使用者';

// 1. 檢查是否已存在
const exists = db.prepare('SELECT id FROM users WHERE email = ?').get(email);

if (exists) {
  console.log('⚠️ 使用者已存在');
  process.exit(0);
}

// 2. 加密密碼
const hash = bcrypt.hashSync(password, 10);

// 3. 寫入資料庫
db.prepare(
  `
  INSERT INTO users (id, email, password_hash, name)
  VALUES (?, ?, ?, ?)
`
).run(randomUUID(), email, hash, name);

console.log('✅ 使用者建立成功');
console.log('帳號:', email);
console.log('密碼:', password);
