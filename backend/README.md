# Saudi Traditional Foods — PHP Backend

Complete REST API backend built with PHP + MySQL.
Connects to the existing React (Vite) frontend.

---

## 📁 Folder Structure

```
backend/
├── config/
│   └── database.php          ← PDO connection factory
├── api/
│   ├── register.php          ← POST   Create new account
│   ├── login.php             ← POST   Authenticate user
│   ├── logout.php            ← POST   Destroy session
│   ├── getUser.php           ← GET    Current user profile
│   ├── addFavorite.php       ← POST   Save meal to favorites
│   ├── removeFavorite.php    ← DELETE Remove meal from favorites
│   └── getFavorites.php      ← GET    List user's favorites
├── middleware/
│   └── auth.php              ← Session management + CORS
├── utils/
│   └── response.php          ← JSON response helpers
├── react-api-update/
│   └── meals.js              ← Drop-in replacement for src/api/meals.js
├── database.sql              ← Full schema + sample data
└── .htaccess                 ← Apache security + rewrite rules
```

---

## 🚀 Setup with XAMPP

### Step 1 — Install & Start XAMPP
1. Download XAMPP from https://www.apachefriends.org
2. Open **XAMPP Control Panel**
3. Start **Apache** and **MySQL** (both green)

### Step 2 — Place the backend folder
```
Copy the entire backend/ folder to:
C:\xampp\htdocs\saudi-foods-backend\
```
So the register endpoint is at:
`http://localhost/saudi-foods-backend/api/register.php`

### Step 3 — Import the Database
1. Open http://localhost/phpmyadmin in your browser
2. Click **"New"** in the left sidebar
3. Database name: `saudi_foods_db`
4. Collation: `utf8mb4_unicode_ci` → click **Create**
5. With the new DB selected, click the **"Import"** tab
6. Click **"Choose File"** → select `database.sql`
7. Click **"Go"** at the bottom

### Step 4 — Configure Database Credentials
Open `config/database.php` and update if needed:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'saudi_foods_db');
define('DB_USER', 'root');   // Default XAMPP
define('DB_PASS', '');       // Default XAMPP (empty)
```

### Step 5 — Update React Frontend
Replace `src/api/meals.js` in your React project with
the file at `react-api-update/meals.js`.

Then update your `.env` or `vite.config.js`:
```
VITE_API_URL=http://localhost/saudi-foods-backend/api
```

### Step 6 — Enable mod_rewrite (if needed)
In `C:\xampp\apache\conf\httpd.conf`, find and ensure:
```apache
LoadModule rewrite_module modules/mod_rewrite.so
```
And in the `<Directory "C:/xampp/htdocs">` block:
```apache
AllowOverride All
```
Then restart Apache.

---

## 🔌 API Reference

All responses follow this envelope:

```json
{
  "success": true | false,
  "message": "Human-readable message",
  "code":    200,
  "data":    { ... }
}
```

---

### POST `/api/register.php`
Create a new user account.

**Request body:**
```json
{
  "username": "Abdullah",
  "email":    "abdullah@example.com",
  "password": "MySecure123"
}
```

**Success (201):**
```json
{
  "success": true,
  "message": "Account created successfully. Welcome!",
  "code":    201,
  "data": {
    "user": {
      "id":         1,
      "username":   "Abdullah",
      "email":      "abdullah@example.com",
      "created_at": "2026-05-11 12:00:00"
    }
  }
}
```

**Error (422 — validation):**
```json
{
  "success": false,
  "message": "Validation failed. Please check your inputs.",
  "code":    422,
  "errors": {
    "email":    "This email is already registered.",
    "password": "Password must be at least 8 characters."
  }
}
```

---

### POST `/api/login.php`
Authenticate a user and start a session.

**Request body:**
```json
{
  "email":    "abdullah@example.com",
  "password": "MySecure123"
}
```

**Success (200):**
```json
{
  "success": true,
  "message": "Login successful. Welcome back, Abdullah!",
  "code":    200,
  "data": {
    "user": {
      "id":         1,
      "username":   "Abdullah",
      "email":      "abdullah@example.com",
      "created_at": "2026-05-11 12:00:00"
    }
  }
}
```

**Error (401):**
```json
{
  "success": false,
  "message": "Invalid email or password. Please try again.",
  "code":    401
}
```

---

### POST `/api/logout.php`
Destroy the current session.

**Request:** (no body needed)

**Success (200):**
```json
{
  "success": true,
  "message": "You have been logged out successfully.",
  "code":    200
}
```

---

### GET `/api/getUser.php`
Get the currently authenticated user's profile.
**Requires:** active session.

**Success (200):**
```json
{
  "success": true,
  "message": "User data retrieved successfully.",
  "code":    200,
  "data": {
    "user": {
      "id":             1,
      "username":       "Abdullah",
      "email":          "abdullah@example.com",
      "created_at":     "2026-05-11 12:00:00",
      "favoritesCount": 4
    }
  }
}
```

**Unauthorised (401):**
```json
{
  "success": false,
  "message": "Unauthorised. Please log in.",
  "code":    401
}
```

---

### POST `/api/addFavorite.php`
Save a meal to the user's favorites.
**Requires:** active session.

**Request body:**
```json
{
  "meal_id":    1,
  "meal_name":  "Kabsa",
  "meal_image": "https://images.unsplash.com/photo-xxx"
}
```

**Success (201):**
```json
{
  "success": true,
  "message": "Meal added to favorites successfully.",
  "code":    201,
  "data": {
    "favorite": {
      "id":         12,
      "user_id":    1,
      "meal_id":    1,
      "meal_name":  "Kabsa",
      "meal_image": "https://images.unsplash.com/photo-xxx",
      "created_at": "2026-05-11 14:30:00"
    }
  }
}
```

---

### DELETE `/api/removeFavorite.php`
Remove a meal from favorites.
**Requires:** active session.

**Request body:**
```json
{ "meal_id": 1 }
```

**Success (200):**
```json
{
  "success": true,
  "message": "Meal removed from favorites successfully.",
  "code":    200
}
```

---

### GET `/api/getFavorites.php`
Return all favorite meals for the logged-in user.
**Requires:** active session.

**Success (200):**
```json
{
  "success": true,
  "message": "Favorites retrieved successfully.",
  "code":    200,
  "data": {
    "favorites": [
      {
        "id":         12,
        "meal_id":    1,
        "meal_name":  "Kabsa",
        "meal_image": "https://images.unsplash.com/photo-xxx",
        "created_at": "2026-05-11 14:30:00"
      }
    ],
    "total": 1
  }
}
```

---

## ⚛️ React Integration Examples

### Login
```js
import { loginUser } from './api/meals';

async function handleLogin(email, password) {
  try {
    const res = await loginUser({ email, password });
    // res.data.user contains the user object
    login(res.data.user, 'session'); // pass to AuthContext
    navigate('/');
  } catch (err) {
    setError(err.message);           // err.errors has field-level errors
  }
}
```

### Register
```js
import { registerUser } from './api/meals';

async function handleRegister(form) {
  try {
    const res = await registerUser({
      username: form.username,
      email:    form.email,
      password: form.password,
    });
    login(res.data.user, 'session');
    navigate('/');
  } catch (err) {
    if (err.errors) setFieldErrors(err.errors);
    else setGlobalError(err.message);
  }
}
```

### Toggle Favorite
```js
import { addFavorite, removeFavorite } from './api/meals';

async function handleFavoriteToggle(meal, isFav) {
  try {
    if (isFav) {
      await addFavorite({
        meal_id:    meal.id,
        meal_name:  meal.name,
        meal_image: meal.image,
      });
    } else {
      await removeFavorite(meal.id);
    }
  } catch (err) {
    console.error('Favorites error:', err.message);
  }
}
```

### Load Favorites Page
```js
import { getFavorites } from './api/meals';

useEffect(() => {
  getFavorites()
    .then(res => setFavorites(res.data.favorites))
    .catch(err => {
      if (err.status === 401) navigate('/login');
      else setError(err.message);
    });
}, []);
```

---

## 🔒 Security Checklist

| Feature | Implementation |
|---|---|
| Password hashing | `password_hash()` bcrypt cost=12 |
| Password verification | `password_verify()` (constant-time) |
| SQL injection | PDO prepared statements throughout |
| Session fixation | `session_regenerate_id(true)` on login |
| Session cookie | `httponly=true`, `samesite=Lax` |
| XSS headers | `X-Content-Type-Options`, `X-Frame-Options` |
| Directory listing | `Options -Indexes` in .htaccess |
| Folder access | config/, middleware/, utils/ blocked via .htaccess |
| User enumeration | Generic "Invalid email or password" message |
| Timing attacks | Dummy hash comparison when user not found |
| CORS | Whitelist of allowed React origins |

---

## ⚙️ PHP Requirements

- PHP 8.0+ (uses union types and named args)
- PDO extension enabled (`extension=pdo_mysql` in `php.ini`)
- Apache mod_rewrite enabled

In XAMPP, open `C:\xampp\php\php.ini` and ensure:
```ini
extension=pdo_mysql
extension=mysqli
```

---

## 🐛 Common Issues

**"Database connection failed"**
→ Make sure MySQL is running in XAMPP Control Panel
→ Verify DB_NAME is `saudi_foods_db` and DB_USER is `root`

**"Unauthorised. Please log in." on every request**
→ React must send `credentials: 'include'` with every fetch call
→ CORS `Access-Control-Allow-Credentials: true` must match

**CORS errors in browser**
→ The React dev server origin must be in the allowedOrigins array in `middleware/auth.php`
→ Default: `http://localhost:5173`

**403 on .htaccess**
→ Enable `AllowOverride All` in Apache's httpd.conf for the htdocs directory
