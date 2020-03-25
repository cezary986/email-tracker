from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
import os
import api.models as models
from django.contrib.auth.models import Group, Permission

DEFAULT_ADMIN_USERNAME = 'admin'
DEFAULT_ADMIN_PASSWORD = 'admin'


class Command(BaseCommand):
    help = 'Commands that should be run before running application. It setups it and add required data to database'

    def handle(self, *args, **kwargs):
        self.migrate_db()
        self.create_default_admin_user()

    def migrate_db(self):
        os.system('python manage.py makemigrations')
        os.system('python manage.py migrate')
        os.system('python manage.py makemigrations api')
        os.system('python manage.py migrate api')
       
    def create_default_admin_user(self):
        user = None
        try:
            user = User.objects.get(username=DEFAULT_ADMIN_USERNAME)
            self.stdout.write('UPDATE default admin user')
        except ObjectDoesNotExist:
            self.stdout.write('CREATE default admin user')
            user = User(username=DEFAULT_ADMIN_USERNAME)
        user.set_password(DEFAULT_ADMIN_PASSWORD)
        user.is_superuser = True
        user.is_staff = True
        user.save()

