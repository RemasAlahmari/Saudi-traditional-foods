<?php
/**
 * =============================================
 * REGISTER ENDPOINT
 * POST /api/register.php
 * =============================================
 * Accepts: { username, email, password }
 * Returns: { success, message, data: { user } }
 *
 * Validation rules:
 *  - username: 3–30 chars, alphanumeric + underscore
 *  - email:    valid RFC format, unique in DB
 *  - password: minimum 8 chars
 */

require_once __DIR__ . '/../middleware/auth.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/response.php';

// ── Bootstrap ────────────────────────────────
setCORSHeaders();
header('Content-Type: application/json; charset=UTF-8');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed. Use POST.', 405);
}

// ── Parse Request Body ────────────────────────
$body = getRequestBody();

$username = getField($body, 'username');
$email    = getField($body, 'email');
$password = getField($body, 'password');

// ── Validate Required Fields ──────────────────
$errors = validateRequired($body, ['username', 'email', 'password']);

// Username: 3–30 chars, letters/numbers/underscores only
if (empty($errors['username'])) {
    if (strlen($username) < 3 || strlen($username) > 30) {
        $errors['username'] = 'Username must be between 3 and 30 characters.';
    } elseif (!preg_match('/^[a-zA-Z0-9_]+$/', $username)) {
        $errors['username'] = 'Username may only contain letters, numbers, and underscores.';
    }
}

// Email: basic RFC validation
if (empty($errors['email']) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Please enter a valid email address.';
}

// Password: minimum 8 characters
if (empty($errors['password']) && strlen($password) < 8) {
    $errors['password'] = 'Password must be at least 8 characters.';
}

if (!empty($errors)) {
    sendError('Validation failed. Please check your inputs.', 422, $errors);
}

// ── Check for Duplicate Email ─────────────────
$pdo = getDBConnection();

$stmt = $pdo->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
$stmt->execute([$email]);

if ($stmt->fetch()) {
    sendError('An account with this email already exists.', 409, [
        'email' => 'This email is already registered.'
    ]);
}

// Also check for duplicate username
$stmt = $pdo->prepare('SELECT id FROM users WHERE username = ? LIMIT 1');
$stmt->execute([$username]);

if ($stmt->fetch()) {
    sendError('This username is already taken.', 409, [
        'username' => 'Please choose a different username.'
    ]);
}

// ── Hash Password & Insert User ───────────────
/*
 * password_hash() uses bcrypt by default (PASSWORD_DEFAULT).
 * The cost factor (12) is higher than the PHP default (10)
 * for stronger brute-force resistance.
 */
$hashedPassword = password_hash($password, PASSWORD_DEFAULT, ['cost' => 12]);

$stmt = $pdo->prepare(
    'INSERT INTO users (username, email, password, created_at)
     VALUES (?, ?, ?, NOW())'
);

$stmt->execute([$username, $email, $hashedPassword]);
$newUserId = (int) $pdo->lastInsertId();

// ── Auto-login: Create Session ────────────────
setUserSession($newUserId, $username, $email);

// ── Return Created User (never return the password) ──
sendSuccess([
    'user' => [
        'id'         => $newUserId,
        'username'   => $username,
        'email'      => $email,
        'created_at' => date('Y-m-d H:i:s'),
    ]
], 'Account created successfully. Welcome!', 201);
