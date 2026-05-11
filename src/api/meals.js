// =============================================
// API SERVICE — Saudi Traditional Foods
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
}

// ─── Auth API ───────────────────────────────

/**
 * Register a new user
 * @param {{ username, email, password }} userData
 */
export async function registerUser(userData) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

/**
 * Login user
 * @param {{ email, password }} credentials
 */
export async function loginUser(credentials) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

/**
 * Logout current user
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
}

// ─── Favorites API ──────────────────────────

/**
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
}
