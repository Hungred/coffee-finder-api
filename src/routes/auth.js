import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../db/sqlite.js';
import bcrypt from 'bcrypt';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

router.post('/login', (req, res) => {
  console.log('login api');

  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({ success: false, message: '缺少參數' });
  }

  // 1. 找使用者
  const user = db.prepare(`SELECT * FROM users WHERE email = ?`).get(email);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: '帳號或密碼錯誤',
    });
  }

  // 2. 比對密碼
  const isValid = bcrypt.compareSync(password, user.password_hash);

  if (!isValid) {
    return res.status(401).json({
      success: false,
      message: '帳號或密碼錯誤',
    });
  }

  // 3. 簽發 JWT（一定要有 userId）
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  // 4. 回傳
  res.json({
    success: true,
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
});

router.post('/logout', (req, res) => {
  res.json({ message: '登出成功' });
});
export default router;
