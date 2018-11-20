# Local devel Settings
import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOCAL_SETTINGS = True

DEBUG = True

ALLOWED_HOSTS = ["*"]

# Make this unique, and don't share it with anybody.
# You can use http://www.miniwebtool.com/django-secret-key-generator/
# to create one.
SECRET_KEY = 'gv*f9ntgqmj8fqp+=ycx)v%6*o*#k1v25*a_gmrla3y*yy@*!0'

# Name for site
SITE_TITLE = 'SkyScraper'
SITE_EMAIL = 'peter@peterk.co'
DEFAULT_FROM_EMAIL = 'Trunk-Player WebSite <scanner-web-help@example.com>'

# Set this to the location of your audio files
AUDIO_URL_BASE = '/audio_files/'

# Allow TalkGroup access restrictions
ACCESS_TG_RESTRICT = False

# Postgres database setup
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'radio',  # Database Name
        'USER': 'skyscraper',  # Database User Name
        'PASSWORD': 'sdr',  # Database User Password
        'HOST': '127.0.0.1',
        'PORT': '',
    }
}

TIME_ZONE = 'America/Los_Angeles'
GOOGLE_ANALYTICS_PROPERTY_ID = 'UA-34288093-2'

BASE_DIR = '/trunk-player/'

SECURE_PROXY_SSL_HEADER = ()
