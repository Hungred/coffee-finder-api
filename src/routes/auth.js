import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

router.post('/login', (req, res) => {
  console.log('login', req.body);
  const { username, password } = req.body;

  // 測試帳號密碼
  if (username === '1234' && password === '1234') {
    // 簽發 Token
    const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.json({
      success: true,
      token,
      user: { username, name: '管理者' },
    });
  }

  res.status(401).json({ success: false, message: '帳號或密碼錯誤' });
});

router.post('/logout', (req, res) => {
  res.json({ message: '登出成功' });
});
export default router;
