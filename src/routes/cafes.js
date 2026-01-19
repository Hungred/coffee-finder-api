import express from 'express';
import db from '../db/sqlite.js'; // 使用 SQLite 快取資料

const router = express.Router();

// 列表 API：支援 searchQuery、city、tags 篩選
router.get('/', (req, res) => {
  try {
    const { searchQuery, city, tags } = req.query;
    console.log('收到 API 请求，查询参数：', req.query); // 加这行

    let sql = 'SELECT * FROM cafes WHERE 1=1';
    const params = [];
    // 篩選 city
    if (city) {
      sql += ' AND city LIKE ?';
      params.push(`%${city}%`);
    }

    // 篩選 searchQuery
    if (searchQuery) {
      sql += ' AND (name LIKE ? OR city LIKE ?)';
      const keyword = `%${searchQuery}%`;
      params.push(keyword, keyword);
    }

    // 篩選 tags
    const selectedTags = tags ? (Array.isArray(tags) ? tags : [tags]) : [];

    if (!selectedTags.includes('all') && selectedTags.length > 0) {
      selectedTags.forEach((tag) => {
        if (tag === 'wifi') sql += ' AND wifi >= 4';
        if (tag === 'quiet') sql += ' AND quiet >= 4';
        if (tag === 'seat') sql += ' AND seat >= 4';
        if (tag === 'limited_time') sql += " AND limited_time = 'no'";
      });
    }

    const cafes = db.prepare(sql).all(...params);
    res.json({ data: { cafes: cafes } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ data: { cafes: [], message: '取得咖啡廳失敗' } });
  }
});

// 單筆 API：根據 id 查詢
router.get('/id/:id', (req, res) => {
  const { id } = req.params;

  try {
    const cafe = db.prepare('SELECT * FROM cafes WHERE id = ?').get(id);

    if (!cafe) {
      return res
        .status(404)
        .json({ data: { cafe: {}, message: 'Cafe not found' } });
    }

    res.json({ data: { cafe: cafe } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ data: { cafe: {}, message: '取得咖啡廳失敗' } });
  }
});

// 根據 城市 查詢咖啡廳
router.get('/city/:city', (req, res) => {
  const { city } = req.params;

  try {
    const cafe = db.prepare('SELECT * FROM cafes WHERE city = ?').all(city);

    if (!cafe) {
      return res
        .status(404)
        .json({ data: { cafes: [], message: 'Cafe not found' } });
    }
    res.json({ data: { cafes: cafe } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ data: { cafes: [], message: '取得咖啡廳失敗' } });
  }
});
export default router;
