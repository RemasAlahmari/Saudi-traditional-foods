<?php
/**
 * =============================================
 * AUTHENTICATION MIDDLEWARE
 * Saudi Traditional Foods — Backend
 * =============================================
 * Included at the top of every protected
 * endpoint. Starts / validates the PHP session
 * and rejects unauthenticated requests early.
 */

require_once __DIR__ . '/../utils/response.php';

/**
 * Start the session with secure, hardened settings.
 * Called once per request (idempotent).
 */
function startSecureSession(): void
{
    if (session_status() === PHP_SESSION_NONE) {
        session_set_cookie_params([
            'lifetime' => 0,              // browser-session cookie
            'path'     => '/',
            'domain'   => '',             // current domain only
            'secure'   => false,          // set true in production (HTTPS)
            'httponly' => true,           // JS cannot access the cookie
            'samesite' => 'Lax',          // CSRF mitigation
        ]);
        session_start();
    }
}

/**
 * Require an authenticated session.
 * If no valid session exists, sends 401 and exits.
 *
 * @return int  The authenticated user_id
 */
function requireAuth(): int
{
    startSecureSession();

    if (empty($_SESSION['user_id']) || !is_int($_SESSION['user_id'])) {
        sendError('Unauthorised. Please log in.', 401);
    }

    return (int) $_SESSION['user_id'];
}

/**
 * Store user data in the session after successful login.
 *
 * @param int    $userId
 * @param string $username
 * @param string $email
 */
function setUserSession(int $userId, string $username, string $email): void
{
    startSecureSession();
    session_regenerate_id(true);   // prevent session fixation attacks

    $_SESSION['user_id']  = $userId;
    $_SESSION['username'] = $username;
    $_SESSION['email']    = $email;
    $_SESSION['login_at'] = time();
}

/**
 * Destroy the current session completely.
 */
function destroySession(): void
{
    startSecureSession();
    $_SESSION = [];

    // Delete the session cookie from the browser
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params['path'],
            $params['domain'],
            $params['secure'],
            $params['httponly']
        );
    }

    session_destroy();
}

/**
 * Set CORS headers to allow requests from the React dev server.
 * In production, replace the wildcard with your actual domain.
 */
function setCORSHeaders(): void
{
    $allowedOrigins = [
        'http://localhost:5173',   // Vite dev server
        'http://localhost:3000',   // CRA / alternative
        'http://127.0.0.1:5173',
    ];

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if (in_array($origin, $allowedOrigins, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
    } else {
        // During development you can use * — restrict in production
        header('Access-Control-Allow-Origin: *');
    }

    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

    // Handle preflight OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}
