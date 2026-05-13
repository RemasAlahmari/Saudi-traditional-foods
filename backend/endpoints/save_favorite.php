<?php
require_once __DIR__ . '/../Utilies/helpers.php';
require_once __DIR__ . '/../Database_config/db.php';

bootstrap('POST');
$b = body();

$user_id    = (int) ($b['user_id']    ?? 0);
$meal_id    =       ($b['meal_id']    ?? '');
$meal_name  = trim( $b['meal_name']   ?? '');
$meal_image = trim( $b['meal_image']  ?? '');

if (!$user_id || !$meal_id) fail('user_id and meal_id required.', 422);

$db = getDB();

// Duplicate check
$s = $db->prepare('SELECT id FROM favorites WHERE user_id = :u AND meal_id = :m LIMIT 1');
$s->bindParam(':u', $user_id, PDO::PARAM_INT);
$s->bindParam(':m', $meal_id, PDO::PARAM_STR);
$s->execute();
if ($s->fetch()) fail('Already in favorites.', 409);

// Insert
$s = $db->prepare('INSERT INTO favorites (user_id, meal_id, meal_name, meal_image, created_at) VALUES (:u, :m, :n, :i, NOW())');
$s->bindParam(':u', $user_id,    PDO::PARAM_INT);
$s->bindParam(':m', $meal_id,    PDO::PARAM_STR);
$s->bindParam(':n', $meal_name,  PDO::PARAM_STR);
$s->bindParam(':i', $meal_image, PDO::PARAM_STR);
$s->execute();

ok(['id' => (int) $db->lastInsertId()], 'Saved to favorites.', 201);
