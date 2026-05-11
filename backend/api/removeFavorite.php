<?php
/**
 * =============================================
 * REMOVE FAVORITE ENDPOINT
 * DELETE /api/removeFavorite.php
 * =============================================
 * Removes a meal from the authenticated user's
 * favorites. Uses meal_id (not the row id) so
 * the React frontend can call it with the same
 * ID it has for the meal.
 *
 * Accepts:  { meal_id }  — via JSON body or query string
 * Returns:  { success, message }
 * Requires: Active session (protected)
 */

require_once __DIR__ . '/../middleware/auth.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/response.php';

// ── Bootstrap ────────────────────────────────
setCORSHeaders();
header('Content-Type: application/json; charset=UTF-8');

// Accept DELETE or POST (some clients struggle with DELETE + body)
$method = strtoupper($_SERVER['REQUEST_METHOD']);
if (!in_array($method, ['DELETE', 'POST'], true)) {
    sendError('Method not allowed. Use DELETE or POST.', 405);
}

// ── Require Authentication ────────────────────
$userId = requireAuth();

// ── Parse meal_id ─────────────────────────────
// Support both JSON body and query string: ?meal_id=5
$body   = getRequestBody();
$mealId = getField($body, 'meal_id')
       ?? getField($_GET,  'meal_id');

if (!$mealId || !is_numeric($mealId) || (int) $mealId <= 0) {
    sendError('A valid meal_id is required.', 422, [
        'meal_id' => 'Please provide a positive integer meal_id.'
    ]);
}

$mealId = (int) $mealId;

// ── Attempt Deletion ──────────────────────────
$pdo = getDBConnection();

/*
 * Always scope the DELETE by BOTH user_id AND meal_id.
 * This prevents a user from deleting another user's favorites.
 */
$stmt = $pdo->prepare(
    'DELETE FROM favorites
     WHERE user_id = ? AND meal_id = ?'
);
$stmt->execute([$userId, $mealId]);

if ($stmt->rowCount() === 0) {
    // Either the favorite didn't exist or belonged to another user
    sendError('Favorite not found or already removed.', 404);
}

sendSuccess(null, 'Meal removed from favorites successfully.');
