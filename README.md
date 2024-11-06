# Task Manager Application
A simple task management application using Laravel 11 and React.

## Features
1. Registration & Login
2. Task CRUD with filtering
3. Assign users to tasks

## Tech Stack
1. PHP 8.3
2. MySQL 8.2
3. Apache or Nginx webserver with Laravel config
4. Laravel 11

## Installation Steps

1. git clone https://github.com/TanujAkshit/task_manager.git
2. cd task_manager
3. Run 'composer install'.
4. Run 'npm install'.
5. Make new .env file from .env.example. Setup db connections in .env
6. Run `php artisan key:generate` to generate key
7. Run `php artisan migrate:fresh --seed`.
8. Run `php artisan serve` for start laravel(artisan) server.
9. Run `npm run dev` for start react(vite) server.