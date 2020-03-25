from drf_yasg import openapi
from api.serializers import EmailSerializer, UserProfileSerializer
from rest_framework import serializers

class PaginatedListResponse(serializers.Serializer):
    count = serializers.IntegerField(read_only=True)
    next = serializers.CharField(max_length=500, read_only=True)
    previous = serializers.CharField(max_length=500, read_only=True)

class EmailListReponse(PaginatedListResponse):
    results = UserProfileSerializer(many=True)
