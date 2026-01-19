import express from 'express';
import { authenticateJWT } from '../middleware/authenticateJWT.js';
import db from '../db/sqlite.js';

const router = express.Router();

// 取得個人收藏清單
router.get('/', authenticateJWT, (req, res) => {
  console.log('取得個人收藏清單');
  const userId = req.user.userId;
  const favorites = db
    .prepare('SELECT cafe_id FROM user_favorites WHERE user_id = ?')
    .all(userId)
    .map((row) => row.cafe_id);

  if (favorites.length === 0) {
    return res.json({
      success: true,
      data: {
        cafes: [],
      },
    });
  }

  // 用 IN 查多筆咖啡廳
  const placeholders = favorites.map(() => '?').join(',');
  const cafes = db
    .prepare(`SELECT * FROM cafes WHERE id IN (${placeholders})`)
    .all(...favorites);

  console.log('favorites', favorites, cafes);
  res.json({ success: true, data: { cafes: cafes } });
});

// 切換收藏狀態 (新增或移除)
router.post('/toggle', authenticateJWT, (req, res) => {
  console.log('切換收藏狀態');

  const userId = req.user.userId;
  const { cafeId } = req.body;

  // 檢查是否已收藏
  const existing = db
    .prepare('SELECT id FROM user_favorites WHERE user_id = ? AND cafe_id = ?')
    .get(userId, cafeId);

  if (existing) {
    // 已收藏 → 移除
    db.prepare('DELETE FROM user_favorites WHERE id = ?').run(existing.id);
    return res.json({
      data: {
        success: true,
        action: 'removed',
        message: '已移除收藏',
      },
    });
  } else {
    // 未收藏 → 新增
    db.prepare(
      'INSERT INTO user_favorites (user_id, cafe_id) VALUES (?, ?)'
    ).run(userId, cafeId);
    return res.json({
      data: { success: true, action: 'added', message: '已加入收藏' },
    });
  }
});

export default router;
