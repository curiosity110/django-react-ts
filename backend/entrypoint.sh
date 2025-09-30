#!/bin/sh
set -e

# wait for Postgres (simple loop)
if [ -n "$PGHOST" ]; then
  echo "⏳ Waiting for Postgres at $PGHOST:$PGPORT..."
  until nc -z "$PGHOST" "${PGPORT:-5432}"; do sleep 1; done
fi

python manage.py collectstatic --noinput
python manage.py migrate --noinput

# Optional: seed a superuser in CI by setting DJANGO_SUPERUSER_* envs
if [ "$CREATE_SUPERUSER" = "true" ]; then
  python manage.py createsuperuser --noinput || true
fi

exec gunicorn core.wsgi:application --bind 0.0.0.0:8000 --workers 3 --threads 2 --timeout 120
