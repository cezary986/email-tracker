from api import VERSION
from django.http import JsonResponse
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from api.serializers import VersionSerializer, MessageSerializer
from api.utils import Message
from django.conf import settings
from api.models import IpAddress
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import IsAuthenticated

class VersionView(APIView):
  
    @swagger_auto_schema(
        operation_id='version',
        operation_description='Return current API version',
        responses={200: VersionSerializer}
    )
    def get(self, request):
        serializer = VersionSerializer({'version': VERSION})
        return JsonResponse(serializer.data)

class MachineRegisterView(APIView):
  
    permission_classes = (IsAuthenticated,)

    @swagger_auto_schema(
        operation_id='register_machine',
        operation_description='Send user ip address',
        responses={200: VersionSerializer}
    )
    def get(self, request):
        ip_address = request.META.get('REMOTE_ADDR', None)
        try:
            model = IpAddress.objects.get(ip_address=ip_address)
        except ObjectDoesNotExist:
            model = IpAddress()
            model.ip_address = ip_address
            model.user = request.user
            model.save()

            if ip_address is not None:
                serializer = MessageSerializer(Message('Machined registered'))
                return JsonResponse(serializer.data, status=200)
            else:
                serializer = MessageSerializer(Message('Machined could not be registered'))
                return JsonResponse(serializer.data, status=500)
        
        serializer = MessageSerializer(Message('Machine already registered'))
        return JsonResponse(serializer.data, status=200)
        
