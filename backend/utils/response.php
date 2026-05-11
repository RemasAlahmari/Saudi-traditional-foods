<?php
/**
 * =============================================
 * RESPONSE HELPER UTILITY
 * Saudi Traditional Foods — Backend
 * =============================================
 * Centralised JSON response builder.
 * All API endpoints use these functions to
 * ensure a consistent response envelope.
 */

/**
 * Send a successful JSON response and exit.
 *
 * @param mixed  $data    Payload to return (array, object, null)
 * @param string $message Human-readable success message
 * @param int    $code    HTTP status code (default 200)
 */
function sendSuccess(mixed $data = null, string $message = 'Success', int $code = 200): void
{
    http_response_code($code);

    $response = [
        'success' => true,
        'message' => $message,
        'code'    => $code,
    ];

    if ($data !== null) {
        $response['data'] = $data;
    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/**
 * Send an error JSON response and exit.
 *
 * @param string $message Human-readable error message
 * @param int    $code    HTTP status code (default 400)
 * @param array  $errors  Optional field-level validation errors
 */
function sendError(string $message, int $code = 400, array $errors = []): void
{
    http_response_code($code);

    $response = [
        'success' => false,
        'message' => $message,
        'code'    => $code,
    ];

    if (!empty($errors)) {
        $response['errors'] = $errors;
    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/**
 * Sanitise and retrieve a value from $_POST or decoded JSON body.
 * Returns null if the key is not present.
 *
 * @param array  $data  The data source array
 * @param string $key   Field name
 * @param mixed  $default Default value if key missing
 */
function getField(array $data, string $key, mixed $default = null): mixed
{
    $value = $data[$key] ?? $default;

    if (is_string($value)) {
        $value = trim($value);          // strip surrounding whitespace
    }

    return $value;
}

/**
 * Decode the incoming JSON request body.
 * Returns an empty array on failure.
 */
function getRequestBody(): array
{
    $raw = file_get_contents('php://input');
    if (empty($raw)) {
        return [];
    }

    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

/**
 * Validate that required fields are present and non-empty.
 *
 * @param array $data   Input data
 * @param array $fields Required field names
 * @return array        Associative error messages (empty if all valid)
 */
function validateRequired(array $data, array $fields): array
{
    $errors = [];
    foreach ($fields as $field) {
        $value = $data[$field] ?? null;
        if ($value === null || (is_string($value) && trim($value) === '')) {
            $errors[$field] = ucfirst($field) . ' is required.';
        }
    }
    return $errors;
}
