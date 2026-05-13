<?php
function bootstrap(string $method = 'POST'): void {
    // 1. Allow the Vite origin
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept');
    header('Access-Control-Allow-Credentials: true');

    // 2. Handle the Preflight (OPTIONS) request immediately
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }

    // 3. Set standard JSON header for the actual response
    header('Content-Type: application/json; charset=UTF-8');

    // 4. Validate the HTTP method
    if ($_SERVER['REQUEST_METHOD'] !== $method) {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
        exit;
    }
}

function ok(mixed $data = null, string $msg = 'Success', int $code = 200): void {
    http_response_code($code);
    $r = ['success' => true, 'message' => $msg];
    if ($data !== null) $r['data'] = $data;
    echo json_encode($r, JSON_UNESCAPED_UNICODE);
    exit;
}

function fail(string $msg, int $code = 400, array $errors = []): void {
    http_response_code($code);
    $r = ['success' => false, 'message' => $msg];
    if ($errors) $r['errors'] = $errors;
    echo json_encode($r, JSON_UNESCAPED_UNICODE);
    exit;
}

function body(): array {
    $raw = file_get_contents('php://input');
    return $raw ? (json_decode($raw, true) ?? []) : [];
}