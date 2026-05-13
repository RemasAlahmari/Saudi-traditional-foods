export const MEALDB = 'https://www.themealdb.com/api/json/v1/1';
export const API = 'http://localhost/backend/endpoints';

async function request(endpoint, options = {}) {
  const res  = await fetch(`${API}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!data.success) {
    const err  = new Error(data.message || 'Request failed');
    err.errors = data.errors || {};
    err.status = res.status;
    throw err;
  }
  return data;
}

export async function getSaudiMeals() {
  const res  = await fetch(`${MEALDB}/filter.php?a=Saudi_Arabia`);
  const data = await res.json();
  return data.meals || [];
}

export async function getMealById(id) {
  const res  = await fetch(`${MEALDB}/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
}

export async function searchSaudiMeals(query) {
  const res  = await fetch(`${MEALDB}/search.php?s=${encodeURIComponent(query)}`);
  const data = await res.json();
  if (!data.meals) return [];
  return data.meals.filter(m => m.strArea === 'Saudi Arabia');
}

export const registerUser = (body) =>
  request('/register.php', { method: 'POST', body: JSON.stringify(body) });

export const loginUser = (body) =>
  request('/login.php', { method: 'POST', body: JSON.stringify(body) });

export const logoutUser = () =>
  request('/logout.php', { method: 'POST' });

export async function getFavorites(userId) {
  const res  = await fetch(`${API}/get_favorites.php?user_id=${userId}`);
  return res.json();
}

export async function saveFavorite(body) {
  const res  = await fetch(`${API}/save_favorite.php`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });
  return res.json();
}

export async function deleteFavorite(mealId) {
  const res  = await fetch(`${API}/remove_favorite.php`, {
    method:  'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ meal_id: mealId }),
  });
  return res.json();
}