# ReactDjango

> [!CAUTION]
> This is our current progress, this is not complete or ready for production.

## First time setup

1. Install python 3.13
2. `pip install pipenv`
3. Open terminal 1
4. `cp .env.example .env`
5. Modify the .env to suit your needs
6. `cd backend`
7. `pipenv install`
8. `pipenv shell`
9. `python manage.py migrate`
10. `python manage.py runserver`
11. Open terminal 2
12. Install node/pnpm
13. `cd frontend`
14. `pnpm install`
15. `pnpm dev`

> [!IMPORTANT]
> Make sure you stay consistent with then url you're using for the frontend/backend. Either use localhost for both, or 127.0.0.1 for both.

## Quickstart after first time setup

1. Open terminal 1
2. `cd backend`
3. `pipenv shell`
4. `python manage.py runserver`
5. Open terminal 2
6. `cd frontend`
7. `pnpm dev`
