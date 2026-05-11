<?php
/**
 * =============================================
 * DATABASE CONFIGURATION
 * Saudi Traditional Foods — Backend
 * =============================================
 * PDO connection with error handling.
 * Edit DB_NAME, DB_USER, DB_PASS to match
 * your XAMPP / phpMyAdmin setup.
 */

define('DB_HOST', '127.0.0.1:3307');
define('DB_NAME', 'saudi_foods_db');
define('DB_USER', 'root');        // Default XAMPP username
define('DB_PASS', '');            // Default XAMPP password (empty)
define('DB_CHARSET', 'utf8mb4');

/**
 * Returns a PDO connection instance.
 * Throws a PDOException on failure (caught globally).
 */
function getDBConnection(): PDO
{
    static $pdo = null; // reuse the same connection within a request

    if ($pdo === null) {
        $dsn = sprintf(
            'mysql:host=%s;dbname=%s;charset=%s',
            DB_HOST,
            DB_NAME,
            DB_CHARSET
        );

        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,   // throw on errors
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,         // arrays by default
            PDO::ATTR_EMULATE_PREPARES   => false,                     // real prepared stmts
        ];

        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            // Don't expose raw DB errors to clients
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Database connection failed. Please try again later.',
                'code'    => 500
            ]);
            exit;
        }
    }

    return $pdo;
}
