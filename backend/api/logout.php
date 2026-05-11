<?php
/**
 * =============================================
 * LOGOUT ENDPOINT
 * POST /api/logout.php
 * =============================================
 * Destroys the PHP session and clears the
 * session cookie from the client browser.
 * Returns: { success, message }
 */

require_once __DIR__ . '/../middleware/auth.php';
require_once __DIR__ . '/../utils/response.php';

// ── Bootstrap ────────────────────────────────
setCORSHeaders();
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed. Use POST.', 405);
}

// Destroy session regardless of whether one existed
destroySession();

sendSuccess(null, 'You have been logged out successfully.');
