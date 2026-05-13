<?php
require_once __DIR__ . '/../Utilies/helpers.php';
require_once __DIR__ . '/../Database_config/db.php';

bootstrap('POST');
$b = body();

$email    = trim($b['email']    ?? '');
$password =      $b['password'] ?? '';

if (!$email || !$password) fail('Email and password required.', 422);

$db = getDB();
$s  = $db->prepare('SELECT id, username, email, password, created_at FROM users WHERE email = ? LIMIT 1');
$s->execute([$email]);
$user = $s->fetch();

$dummy = '$2y$12$invalidhashfortimingprotectionxx.......';
$hash  = $user ? $user['password'] : $dummy;

if (!$user || !password_verify($password, $hash)) {
    fail('Invalid email or password.', 401);
}

ok(['user' => [
    'id'         => (int) $user['id'],
    'username'   => $user['username'],
    'email'      => $user['email'],
    'created_at' => $user['created_at'],
]], 'Login successful!');