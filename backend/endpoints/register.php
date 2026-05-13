<?php
require_once __DIR__ . '/../Utilies/helpers.php';
require_once __DIR__ . '/../Database_config/db.php';

bootstrap('POST');
$b = body();

$username = trim($b['username'] ?? '');
$email    = trim($b['email']    ?? '');
$password =      $b['password'] ?? '';

$errors = [];
if (!$username || strlen($username) < 3)
    $errors['username'] = 'Min. 3 characters.';
elseif (!preg_match('/^[a-zA-Z0-9_]+$/', $username))
    $errors['username'] = 'Letters, numbers, underscores only.';
if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL))
    $errors['email'] = 'Valid email required.';
if (!$password || strlen($password) < 8)
    $errors['password'] = 'Min. 8 characters.';

if ($errors) fail('Validation failed.', 422, $errors);

$db = getDB();

$s = $db->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
$s->execute([$email]);
if ($s->fetch()) fail('Email already registered.', 409, ['email' => 'Already in use.']);

$s = $db->prepare('SELECT id FROM users WHERE username = ? LIMIT 1');
$s->execute([$username]);
if ($s->fetch()) fail('Username taken.', 409, ['username' => 'Choose another.']);

$hash = password_hash($password, PASSWORD_DEFAULT, ['cost' => 12]);
$s = $db->prepare('INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, NOW())');
$s->execute([$username, $email, $hash]);
$id = (int) $db->lastInsertId();

ok(['user' => ['id' => $id, 'username' => $username, 'email' => $email, 'created_at' => date('Y-m-d H:i:s')]], 'Account created!', 201);