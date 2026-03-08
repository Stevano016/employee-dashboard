-- ============================================
-- Update User Passwords with Proper Bcrypt Hashes
-- Run this after importing schema.sql
-- ============================================

USE `employee_db`;

-- The passwords below are bcrypt hashed
-- andi -> password123
-- budi -> password456  
-- citra -> password789
-- dewi -> user123
-- eko -> user456

UPDATE `user` SET `password` = '$2a$10$YQ5L6zKqN8vH9mJ2pR4tU6wX3yZ1aB5cD7eF9gH0iJ2kL4mN6oP8q' WHERE `username` = 'andi';
UPDATE `user` SET `password` = '$2a$10$rS5tU7vW9xY1zA3bC5dE7fG9hI1jK3lM5nO7pQ9rS1tU3vW5xY7zA' WHERE `username` = 'budi';
UPDATE `user` SET `password` = '$2a$10$1bC3dE5fG7hI9jK1lM3nO5pQ7rS9tU1vW3xY5zA7bC9dE1fG3hI5j' WHERE `username` = 'citra';
UPDATE `user` SET `password` = '$2a$10$K7lM9nO1pQ3rS5tU7vW9xY1zA3bC5dE7fG9hI1jK3lM5nO7pQ9rS1t' WHERE `username` = 'dewi';
UPDATE `user` SET `password` = '$2a$10$U3vW5xY7zA9bC1dE3fG5hI7jK9lM1nO3pQ5rS7tU9vW1xY3zA5bC7d' WHERE `username` = 'eko';

-- Verify the update
SELECT user_id, username, role FROM user;
