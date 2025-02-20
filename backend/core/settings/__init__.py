from os import getenv

from dotenv import load_dotenv

load_dotenv()

if getenv("DJANGO_DEBUG") == "True":
    DEBUG = True
    from .development import *
else:
    DEBUG = False
    from .production import *
