<?php
require_once __DIR__ . '/../Utilies/helpers.php';
require_once __DIR__ . '/../Database_config/db.php';

bootstrap('GET');

$user_id = (int) ($_GET['user_id'] ?? 0);
if (!$user_id) fail('user_id required.', 422);

$db = getDB();
$s  = $db->prepare('SELECT id, meal_id, meal_name, meal_image, created_at FROM favorites WHERE user_id = :u ORDER BY created_at DESC');
$s->bindParam(':u', $user_id, PDO::PARAM_INT);
$s->execute();

$rows = array_map(fn($r) => [
    'id'         => (int) $r['id'],
    'meal_id'    => $r['meal_id'],
    'meal_name'  => $r['meal_name'],
    'meal_image' => $r['meal_image'] ?? '',
    'created_at' => $r['created_at'],
], $s->fetchAll());

ok(['favorites' => $rows, 'total' => count($rows)], 'Favorites retrieved.');
