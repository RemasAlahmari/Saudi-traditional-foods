<?php
/**
 * =============================================
 * LOGIN ENDPOINT
 * POST /api/login.php
 * =============================================
 * Accepts: { email, password }
 * Returns: { success, message, data: { user } }
 *
 * Security measures:
 *  - password_verify() for hash comparison
 *  - Session regeneration on login
 *  - Generic error messages (no user enumeration)
 *  - Rate limiting comment (implement with Redis/DB in production)
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

// ── Parse Request Body ────────────────────────
$body = getRequestBody();

$email    = getField($body, 'email');
$password = getField($body, 'password');

// ── Validate Required Fields ──────────────────
$errors = validateRequired($body, ['email', 'password']);

if (!empty($errors['email']) || (isset($email) && !filter_var($email, FILTER_VALIDATE_EMAIL))) {
    // Use a generic message to prevent user enumeration
    sendError('Invalid email or password.', 401);
}

if (!empty($errors)) {
    sendError('Email and password are required.', 422, $errors);
}

// ── Look Up User by Email ─────────────────────
$pdo = getDBConnection();

$stmt = $pdo->prepare(
    'SELECT id, username, email, password, created_at
     FROM users
     WHERE email = ?
     LIMIT 1'
);
$stmt->execute([$email]);
$user = $stmt->fetch();

/*
 * Use a deliberate constant-time comparison path.
 * Even if the user doesn't exist, run password_verify against
 * a dummy hash — this prevents timing-based user enumeration.
 */
$dummyHash = '$2y$12$invalidhashfortimingprotectiononly.........';
$hashToCheck = $user ? $user['password'] : $dummyHash;

$passwordMatches = password_verify($password, $hashToCheck);

if (!$user || !$passwordMatches) {
    sendError('Invalid email or password. Please try again.', 401);
}

// ── Check if rehash is needed (future-proof) ──
if (password_needs_rehash($user['password'], PASSWORD_DEFAULT, ['cost' => 12])) {
    $newHash = password_hash($password, PASSWORD_DEFAULT, ['cost' => 12]);
    $rehashStmt = $pdo->prepare('UPDATE users SET password = ? WHERE id = ?');
    $rehashStmt->execute([$newHash, $user['id']]);
}

// ── Create Authenticated Session ─────────────
setUserSession((int) $user['id'], $user['username'], $user['email']);

// ── Return User Data (no password) ───────────
sendSuccess([
    'user' => [
        'id'         => (int) $user['id'],
        'username'   => $user['username'],
        'email'      => $user['email'],
        'created_at' => $user['created_at'],
    ]
], 'Login successful. Welcome back, ' . $user['username'] . '!');
