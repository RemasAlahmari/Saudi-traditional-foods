-- =============================================
-- SQL SCHEMA — Saudi Traditional Foods DB
-- =============================================
-- Database:  saudi_foods_db
-- Engine:    InnoDB  (for foreign keys)
-- Charset:   utf8mb4 (full Unicode, incl. emoji)
-- Collation: utf8mb4_unicode_ci
--
-- HOW TO IMPORT:
--   1. Open phpMyAdmin → http://localhost/phpmyadmin
--   2. Click "New" in the left sidebar
--   3. Name the database: saudi_foods_db
--   4. Select Charset: utf8mb4 / Collation: utf8mb4_unicode_ci
--   5. Click "Create"
--   6. Select the new DB → click "Import" tab
--   7. Choose this file → click "Go"
-- =============================================

-- Create and select the database
CREATE DATABASE IF NOT EXISTS `saudi_foods_db`
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE `saudi_foods_db`;

-- ── users ─────────────────────────────────────
-- Stores registered user accounts.
-- Passwords are stored as bcrypt hashes only.
CREATE TABLE IF NOT EXISTS `users` (
    `id`         INT          NOT NULL AUTO_INCREMENT,
    `username`   VARCHAR(30)  NOT NULL,
    `email`      VARCHAR(255) NOT NULL,
    `password`   VARCHAR(255) NOT NULL,  -- bcrypt hash (60 chars) — use 255 for future algos
    `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_users_email`    (`email`),
    UNIQUE KEY `uq_users_username` (`username`),
    INDEX `idx_users_email` (`email`)   -- speeds up login lookups
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  COMMENT='Registered user accounts';


-- ── favorites ─────────────────────────────────
-- Each row represents one meal saved by one user.
-- meal_id references the ID used in the React
-- frontend / mock data (not a FK to a DB table,
-- since meals live in the front-end for now).
CREATE TABLE IF NOT EXISTS `favorites` (
    `id`         INT          NOT NULL AUTO_INCREMENT,
    `user_id`    INT          NOT NULL,
    `meal_id`    INT          NOT NULL,
    `meal_name`  VARCHAR(255) NOT NULL,
    `meal_image` VARCHAR(500) NOT NULL DEFAULT '',
    `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`),

    -- A user can only save the same meal once
    UNIQUE KEY `uq_favorites_user_meal` (`user_id`, `meal_id`),

    -- Foreign key: cascades delete when a user is removed
    CONSTRAINT `fk_favorites_user`
        FOREIGN KEY (`user_id`)
        REFERENCES `users` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX `idx_favorites_user_id`   (`user_id`),
    INDEX `idx_favorites_meal_id`   (`meal_id`)

) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  COMMENT='Meals saved to favorites by each user';


-- =============================================
-- SAMPLE DATA (optional — for testing)
-- Password for both test users is: Test1234!
-- Hash generated with: password_hash('Test1234!', PASSWORD_DEFAULT, ['cost'=>12])
-- =============================================

-- Insert a test user (comment out if not needed)
INSERT IGNORE INTO `users` (`username`, `email`, `password`, `created_at`) VALUES
(
    'Abdullah',
    'abdullah@example.com',
    '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',  -- password: password
    NOW()
);

-- NOTE: The hash above is a placeholder from Laravel's docs.
-- Run the following PHP to generate a real hash for 'Test1234!':
--   echo password_hash('Test1234!', PASSWORD_DEFAULT, ['cost' => 12]);
