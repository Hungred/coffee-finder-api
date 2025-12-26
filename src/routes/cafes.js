const express = require('express');
const db = require('../db/sqlite');

const router = express.Router();

/**
 * GET /api/cafes
 * query:
 *  - search
 */
router.get('/', (req, res) => {
  const { search = '' } = req.query;

  const sql = `
    SELECT * FROM cafes
    WHERE name LIKE ?
  `;

  db.all(sql, [`%${search}%`], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

module.exports = router;
