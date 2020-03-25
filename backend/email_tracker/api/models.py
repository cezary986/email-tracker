from django.db import models
from django.contrib.auth.models import User


class IpAddress(models.Model):
    ip_address = models.CharField(max_length=200, null=False, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)

    class Meta:
        app_label = 'api'

class Adressee(models.Model):
    email_address = models.EmailField(unique=True)
    message = models.ForeignKey('EmailMessage', on_delete=models.CASCADE, null=False)

    class Meta:
        app_label = 'api'
"""
Model for certain email
"""
class EmailMessage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    created = models.DateTimeField(auto_now_add=True)
    first_opened = models.DateTimeField(null=True)
    last_opened = models.DateTimeField(null=True)
    title = models.CharField(max_length=200, null=True)
    uuid = models.CharField(max_length=200, null=True)
    description = models.CharField(max_length=200, null=True)

    activated = models.BooleanField(default=False)

    class Meta:
        app_label = 'api'
        ordering = ('-created',)