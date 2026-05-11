<?php
/**
 * =============================================
 * ADD FAVORITE ENDPOINT
 * POST /api/addFavorite.php
 * =============================================
 * Saves a meal to the authenticated user's
 * favorites list. Prevents duplicates.
 *
 * Accepts:  { meal_id, meal_name, meal_image }
 * Returns:  { success, message, data: { favorite } }
 * Requires: Active session (protected)
 */

require_once __DIR__ . '/../middleware/auth.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/response.php';

// ── Bootstrap ────────────────────────────────
setCORSHeaders();
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed. Use POST.', 405);
}

// ── Require Authentication ────────────────────
$userId = requireAuth();

// ── Parse Request Body ────────────────────────
$body = getRequestBody();

$mealId    = getField($body, 'meal_id');
$mealName  = getField($body, 'meal_name');
$mealImage = getField($body, 'meal_image', ''); // optional

// ── Validate ──────────────────────────────────
$errors = validateRequired($body, ['meal_id', 'meal_name']);

if (!empty($errors)) {
    sendError('meal_id and meal_name are required.', 422, $errors);
}

// meal_id must be a positive integer
if (!is_numeric($mealId) || (int) $mealId <= 0) {
    sendError('meal_id must be a positive integer.', 422, [
        'meal_id' => 'Invalid meal ID.'
    ]);
}

$mealId = (int) $mealId;

// meal_name length sanity check
if (strlen($mealName) > 255) {
    sendError('meal_name is too long (max 255 characters).', 422);
}

// Sanitise image URL — must be a URL or empty
if (!empty($mealImage) && !filter_var($mealImage, FILTER_VALIDATE_URL)) {
    $mealImage = ''; // silently drop invalid URLs
}

// ── Check for Duplicate ───────────────────────
$pdo = getDBConnection();

$stmt = $pdo->prepare(
    'SELECT id FROM favorites
     WHERE user_id = ? AND meal_id = ?
     LIMIT 1'
);
$stmt->execute([$userId, $mealId]);

if ($stmt->fetch()) {
    sendError('This meal is already in your favorites.', 409);
}

// ── Insert Favorite ───────────────────────────
$stmt = $pdo->prepare(
    'INSERT INTO favorites (user_id, meal_id, meal_name, meal_image, created_at)
     VALUES (?, ?, ?, ?, NOW())'
);
$stmt->execute([$userId, $mealId, $mealName, $mealImage]);
$newId = (int) $pdo->lastInsertId();

sendSuccess([
    'favorite' => [
        'id'         => $newId,
        'user_id'    => $userId,
        'meal_id'    => $mealId,
        'meal_name'  => $mealName,
        'meal_image' => $mealImage,
        'created_at' => date('Y-m-d H:i:s'),
    ]
], 'Meal added to favorites successfully.', 201);
