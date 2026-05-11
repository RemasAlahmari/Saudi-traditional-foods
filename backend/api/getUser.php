<?php
/**
 * =============================================
 * GET USER ENDPOINT
 * GET /api/getUser.php
 * =============================================
 * Returns the currently authenticated user's
 * profile information from the database.
 * Requires an active session (protected route).
 *
 * Returns: { success, message, data: { user } }
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
// requireAuth() returns user_id or sends 401 and exits
$userId = requireAuth();

// ── Fetch Fresh User Data From DB ─────────────
/*
 * Always fetch from DB rather than trusting session data.
 * This ensures we reflect any profile updates immediately.
 */
$pdo = getDBConnection();

$stmt = $pdo->prepare(
    'SELECT id, username, email, created_at
     FROM users
     WHERE id = ?
     LIMIT 1'
);
$stmt->execute([$userId]);
$user = $stmt->fetch();

if (!$user) {
    // Session exists but user was deleted — clean up
    destroySession();
    sendError('User account not found. Please log in again.', 404);
}

// Also return the count of saved favorites
$favStmt = $pdo->prepare('SELECT COUNT(*) AS total FROM favorites WHERE user_id = ?');
$favStmt->execute([$userId]);
$favCount = (int) $favStmt->fetchColumn();

sendSuccess([
    'user' => [
        'id'              => (int) $user['id'],
        'username'        => $user['username'],
        'email'           => $user['email'],
        'created_at'      => $user['created_at'],
        'favoritesCount'  => $favCount,
    ]
], 'User data retrieved successfully.');
