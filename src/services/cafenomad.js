import fetch from 'node-fetch';

const BASE_URL = 'https://cafenomad.tw/api/v1.2';

/**
 * 取得 Cafe Nomad 咖啡廳資料
 * @param {string} city - 城市（如 taipei / taichung）
 */
export async function fetchCafes(city) {
  const url = city ? `${BASE_URL}/cafes/${city}` : `${BASE_URL}/cafes`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`CafeNomad API error: ${response.status}`);
    }

    const data = await response.json();

    // 👉 在這裡做資料整理（前端友善）
    return data.map((cafe) => ({
      id: cafe.id,
      name: cafe.name,
      city: cafe.city,
      wifi: cafe.wifi,
      seat: cafe.seat,
      quiet: cafe.quiet,
      tasty: cafe.tasty,
      cheap: cafe.cheap,
      music: cafe.music,
      url: cafe.url,
      address: cafe.address || '',
      latitude: cafe.latitude,
      longitude: cafe.longitude,
      limited_time: cafe.limited_time || '',
      socket: cafe.socket || '',
      standing_desk: cafe.standing_desk || '',
      mrt: cafe.mrt || '',
      open_time: cafe.open_time || '',
    }));
  } catch (error) {
    console.error('[CafeNomad] fetchCafes failed:', error);
    throw error;
  }
}
