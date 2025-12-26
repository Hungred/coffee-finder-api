import express from 'express';
import { fetchCafes } from '../services/cafenomad.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { searchQuery, name, city, tags } = req.query;

    // 1️⃣ 先拿全部資料
    let cafes = city ? await fetchCafes(city) : await fetchCafes();

    // 2️⃣ name / searchQuery
    if (searchQuery) {
      const keyword = searchQuery.toLowerCase();
      cafes = cafes.filter(
        (cafe) =>
          cafe.name.toLowerCase().includes(keyword) ||
          cafe.city.toLowerCase().includes(keyword)
      );
    }

    // 3️⃣ tags
    if (tags) {
      const selectedTags = Array.isArray(tags) ? tags : [tags];

      if (!selectedTags.includes('all')) {
        cafes = cafes.filter((cafe) => {
          return selectedTags.every((tag) => {
            if (tag === 'wifi') return cafe.wifi >= 4;
            if (tag === 'quiet') return cafe.quiet >= 4;
            if (tag === 'seat') return cafe.seat >= 4;
            if (tag === 'limited_time') return cafe.limited_time === 'no';
            return true;
          });
        });
      }
    }

    res.json(cafes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '取得咖啡廳失敗' });
  }
});

export default router;
