// =============================================
// API SERVICE — Saudi Traditional Foods
// Connected to PHP + MySQL backend
// Base URL: http://localhost/saudi-foods-backend/api
// =============================================

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost/saudi-foods-backend/api';

// ─── Request Helper ─────────────────────────
/**
 * Centralised fetch wrapper.
 * - Always sends credentials (session cookie)
 * - Always sets Content-Type: application/json
 * - Throws a descriptive Error on non-2xx responses
 */
async function request(endpoint, options = {}) {
  const config = {
    credentials: 'include',          // send PHP session cookie
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    const message = data.message || `HTTP ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.errors = data.errors || {};
    throw error;
  }

  return data;
}

// ─── Auth API ───────────────────────────────

/**
 * Register a new user
 * POST /api/register.php
 * @param {{ username: string, email: string, password: string }} userData
 */
export async function registerUser(userData) {
  return request('/register.php', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

/**
 * Login user
 * POST /api/login.php
 * @param {{ email: string, password: string }} credentials
 */
export async function loginUser(credentials) {
  return request('/login.php', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

/**
 * Logout current user
 * POST /api/logout.php
 */
export async function logoutUser() {
  return request('/logout.php', { method: 'POST' });
}

/**
 * Get current authenticated user's profile
 * GET /api/getUser.php
 */
export async function getUserProfile() {
  return request('/getUser.php');
}

// ─── Favorites API ──────────────────────────

/**
 * Get all favorite meals for the logged-in user
 * GET /api/getFavorites.php
 */
export async function getFavorites() {
  return request('/getFavorites.php');
}

/**
 * Add a meal to favorites
 * POST /api/addFavorite.php
 * @param {{ meal_id: number, meal_name: string, meal_image: string }} mealData
 */
export async function addFavorite(mealData) {
  return request('/addFavorite.php', {
    method: 'POST',
    body: JSON.stringify(mealData),
  });
}

/**
 * Remove a meal from favorites
 * DELETE /api/removeFavorite.php
 * @param {number} mealId
 */
export async function removeFavorite(mealId) {
  return request('/removeFavorite.php', {
    method: 'DELETE',
    body: JSON.stringify({ meal_id: mealId }),
  });
}

// ─── Meals API (future PHP endpoints) ───────

/**
 * Get all meals
 * GET /api/getMeals.php
 */
export async function getMeals(params = {}) {
  const query = new URLSearchParams(params).toString();
  return request(`/getMeals.php${query ? `?${query}` : ''}`);
}

/**
 * Get meal by ID
 * GET /api/getMeal.php?id=5
 */
export async function getMealById(id) {
  return request(`/getMeal.php?id=${id}`);
}

/**
 * Search meals
 * GET /api/searchMeals.php?q=kabsa
 */
export async function searchMeals(query) {
  return request(`/searchMeals.php?q=${encodeURIComponent(query)}`);
}
