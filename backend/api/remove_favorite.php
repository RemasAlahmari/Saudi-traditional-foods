<?php
require_once __DIR__ . '/../middleware/helpers.php';
require_once __DIR__ . '/../config/db.php';

bootstrap('DELETE');
$b = body();

$meal_id = $b['meal_id'] ?? ($_GET['meal_id'] ?? '');
if (!$meal_id) fail('meal_id required.', 422);

$db = getDB();
$s  = $db->prepare('DELETE FROM favorites WHERE meal_id = :m');
$s->bindParam(':m', $meal_id, PDO::PARAM_STR);
$s->execute();

if ($s->rowCount() === 0) fail('Favorite not found.', 404);
ok(null, 'Removed from favorites.');
