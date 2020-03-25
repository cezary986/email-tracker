from rest_framework import serializers
from django.core.exceptions import ObjectDoesNotExist

class UserProfileSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(max_length=200, read_only=True)
    email = serializers.EmailField(max_length=400, read_only=True)
    first_name = serializers.CharField(max_length=200, read_only=True)
    last_name = serializers.CharField(max_length=200, read_only=True)
    is_superuser = serializers.BooleanField(read_only=True)


class VersionSerializer(serializers.Serializer):
    version = serializers.CharField(max_length=100)

class MessageSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=1000)

class AdresseeSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    email_address = serializers.EmailField(max_length=400, read_only=True)

class EmailSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    created = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S", read_only=True)
    first_opened = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S", read_only=True)
    last_opened = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S", read_only=True)
    title = serializers.CharField(max_length=200,)
    description = serializers.CharField(max_length=400)
    uuid = serializers.CharField(max_length=100, read_only=True)
    addressee = AdresseeSerializer(many=True, read_only=False, source='adressee_set')
    activated = serializers.BooleanField()