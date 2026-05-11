// =============================================
// API SERVICE — Saudi Traditional Foods
<<<<<<< HEAD
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
=======
// Ready for PHP + MySQL backend integration
// =============================================

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.saudifoods.com/v1';

// ─── Request Helper ─────────────────────────
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('auth_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error: ${response.status}`);
  }

  return response.json();
}

// ─── Meals API ──────────────────────────────

/**
 * Get all meals with optional filters
 * @param {Object} params - { category, page, limit }
 */
export async function getMeals(params = {}) {
  const query = new URLSearchParams(params).toString();
  return request(`/meals${query ? `?${query}` : ''}`);
}

/**
 * Get a single meal by ID
 * @param {string|number} id
 */
export async function getMealById(id) {
  return request(`/meals/${id}`);
}

/**
 * Search meals by query
 * @param {string} query
 */
export async function searchMeals(query) {
  return request(`/meals/search?q=${encodeURIComponent(query)}`);
}

/**
 * Get meals by category
 * @param {string} category
 */
export async function getMealsByCategory(category) {
  return request(`/meals?category=${encodeURIComponent(category)}`);
}

/**
 * Get featured/recommended meals
 */
export async function getFeaturedMeals() {
  return request('/meals/featured');
>>>>>>> 3228eb700dd44bcb477c7bb67a5503c6ac069043
}

// ─── Auth API ───────────────────────────────

/**
 * Register a new user
<<<<<<< HEAD
 * POST /api/register.php
 * @param {{ username: string, email: string, password: string }} userData
 */
export async function registerUser(userData) {
  return request('/register.php', {
=======
 * @param {{ username, email, password }} userData
 */
export async function registerUser(userData) {
  return request('/auth/register', {
>>>>>>> 3228eb700dd44bcb477c7bb67a5503c6ac069043
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

/**
 * Login user
<<<<<<< HEAD
 * POST /api/login.php
 * @param {{ email: string, password: string }} credentials
 */
export async function loginUser(credentials) {
  return request('/login.php', {
=======
 * @param {{ email, password }} credentials
 */
export async function loginUser(credentials) {
  return request('/auth/login', {
>>>>>>> 3228eb700dd44bcb477c7bb67a5503c6ac069043
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

/**
 * Logout current user
<<<<<<< HEAD
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
=======
 */
export async function logoutUser() {
  return request('/auth/logout', { method: 'POST' });
}

/**
 * Get current user profile
 */
export async function getUserProfile() {
  return request('/user/profile');
}

/**
 * Update user profile
 * @param {Object} profileData
 */
export async function updateUserProfile(profileData) {
  return request('/user/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
>>>>>>> 3228eb700dd44bcb477c7bb67a5503c6ac069043
}

// ─── Favorites API ──────────────────────────

/**
<<<<<<< HEAD
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
=======
 * Get user's favorite meals
 */
export async function getFavorites() {
  return request('/user/favorites');
}

/**
 * Add meal to favorites
 * @param {string|number} mealId
 */
export async function addFavorite(mealId) {
  return request(`/user/favorites/${mealId}`, { method: 'POST' });
}

/**
 * Remove meal from favorites
 * @param {string|number} mealId
 */
export async function removeFavorite(mealId) {
  return request(`/user/favorites/${mealId}`, { method: 'DELETE' });
}

// ─── Categories API ─────────────────────────

/**
 * Get all food categories
 */
export async function getCategories() {
  return request('/categories');
>>>>>>> 3228eb700dd44bcb477c7bb67a5503c6ac069043
}
