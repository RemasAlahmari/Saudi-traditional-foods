<?php
/**
 * =============================================
 * GET FAVORITES ENDPOINT
 * GET /api/getFavorites.php
 * =============================================
 * Returns all meals saved by the authenticated
 * user, ordered by most recently added.
 *
 * Returns:  { success, message, data: { favorites, total } }
 * Requires: Active session (protected)
 */

require_once __DIR__ . '/../middleware/auth.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/response.php';

// ── Bootstrap ────────────────────────────────
setCORSHeaders();
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError('Method not allowed. Use GET.', 405);
}

// ── Require Authentication ────────────────────
$userId = requireAuth();

// ── Fetch Favorites ───────────────────────────
$pdo = getDBConnection();

$stmt = $pdo->prepare(
    'SELECT
        id,
        meal_id,
        meal_name,
        meal_image,
        created_at
     FROM favorites
     WHERE user_id = ?
     ORDER BY created_at DESC'
);
$stmt->execute([$userId]);
$favorites = $stmt->fetchAll();

// Cast types so JSON is clean (no string ints)
$favorites = array_map(function (array $row): array {
    return [
        'id'         => (int) $row['id'],
        'meal_id'    => (int) $row['meal_id'],
        'meal_name'  => $row['meal_name'],
        'meal_image' => $row['meal_image'] ?? '',
        'created_at' => $row['created_at'],
    ];
}, $favorites);

sendSuccess([
    'favorites' => $favorites,
    'total'     => count($favorites),
], 'Favorites retrieved successfully.');
