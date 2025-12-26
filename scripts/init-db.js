import '../src/db/sqlite.js'; // 建表
import db from '../src/db/sqlite.js';
import fetch from 'node-fetch';

//抓 Cafe Nomad API 並寫入 SQLite
async function fetchCafesWithCache() {
  const res = await fetch('https://cafenomad.tw/api/v1.2/cafes');
  const cafes = await res.json();

  const insert = db.prepare(`
    INSERT OR REPLACE INTO cafes
    (id, name, city, wifi, seat, quiet, tasty, cheap, music, url, address, latitude, longitude, limited_time, socket, standing_desk, mrt, open_time)
    VALUES (@id,@name,@city,@wifi,@seat,@quiet,@tasty,@cheap,@music,@url,@address,@latitude,@longitude,@limited_time,@socket,@standing_desk,@mrt,@open_time)
  `);

  const insertMany = db.transaction((cafes) => {
    for (const cafe of cafes) {
      insert.run(cafe);
    }
  });

  insertMany(cafes);
  console.log('SQLite populated with Cafe Nomad data');
}

// 執行
fetchCafesWithCache().then(() => {
  console.log('Database initialized and populated');
});
