import express from 'express';
import db from '../db/sqlite.js';

const router = express.Router();

// 取得所有城市及該城市咖啡廳數量
router.get('/city', (req, res) => {
  console.log('city');
  try {
    const rows = db
      .prepare(
        `
      SELECT city, COUNT(*) as count
      FROM cafes
      GROUP BY city
      ORDER BY city
    `
      )
      .all();

    // 將結果轉成前端想要的格式
    const result = rows.map((r) => ({
      id: r.city,
      name: r.city,
      count: r.count,
    }));

    res.json({
      data: {
        cities: result,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ data: { cities: [], message: '取得城市列表失敗' } });
  }
});

export default router;
