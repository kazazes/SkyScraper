# Local devel Settings
import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOCAL_SETTINGS = True

DEBUG = True

ALLOWED_HOSTS = []

# Make this unique, and don't share it with anybody.
# You can use http://www.miniwebtool.com/django-secret-key-generator/
# to create one.
SECRET_KEY = 'gv*f9ntgqmj8fqp+=ycx)v%6*o*#k1v25*a_gmrla3y*yy@*!0'

# Name for site
SITE_TITLE = 'Trunk-Player'
SITE_EMAIL = 'help@example.com'
DEFAULT_FROM_EMAIL = 'Trunk-Player WebSite <scanner-web-help@example.com>'

# Set this to the location of your audio files
AUDIO_URL_BASE = '/data/audio'

# Allow TalkGroup access restrictions
ACCESS_TG_RESTRICT = False

# Postgres database setup
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'trunk_player',  # Database Name
        'USER': 'skyscraper',  # Database User Name
        'PASSWORD': 'sdr',  # Database User Password
        'HOST': 'localhost',
        'PORT': '',
    }
}

SECURE_PROXY_SSL_HEADER = ()
