from .base import *

ALLOWED_HOSTS = ["127.0.0.1", "localhost"]

INTERNAL_IPS = ALLOWED_HOSTS

CORS_ORIGIN_WHITELIST = ["http://localhost:3000"]
CSRF_TRUSTED_ORIGINS = ["http://localhost:3000"]
