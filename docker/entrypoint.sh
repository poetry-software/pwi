#!/bin/sh

mkdir -p /app/storage/framework/cache
mkdir -p /app/storage/framework/sessions
mkdir -p /app/storage/framework/views

if ! grep -q "^APP_KEY=" ".env" || [ -z "$(grep "^APP_KEY=" ".env" | cut -d '=' -f2)" ]; then
    php artisan key:generate
fi

php artisan migrate --force

/usr/bin/supervisord -c /app/docker/supervisor/supervisor.conf
