from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from django.http import JsonResponse, HttpResponse
from api.serializers import EmailSerializer, MessageSerializer, AdresseeSerializer
from api.utils import Message
from django.http.response import HttpResponseBadRequest
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.parsers import JSONParser
from django.conf import settings
import uuid
from api.models import EmailMessage, IpAddress, Adressee
from datetime import datetime
import api.scheme as scheme
from PIL import Image
import io


class EmailsView(APIView):
    
    permission_classes = (IsAuthenticated,)

    def _make_paginated_response(self, queryset):
        paginator = LimitOffsetPagination()
        queryset = paginator.paginate_queryset(queryset, self.request)
        serializer = EmailSerializer(queryset, many=True)
        return paginator.get_paginated_response(serializer.data)

    @swagger_auto_schema(
        operation_id='emails_list',
        manual_parameters=[],
        operation_description="Return all user's emails",
        responses={200: scheme.EmailListReponse()}
    )
    def get(self, request, **kwargs):
        emails = EmailMessage.objects.filter(user=request.user)
        serializer = EmailSerializer(emails, many=True)
        return JsonResponse(serializer.data, safe=False)

    @swagger_auto_schema(
      operation_id='add_email',
      operation_description='Add new email for tracking',
      responses={200: EmailSerializer, 400: 'For corrupted body'}
    )
    def post(self, request, format=None):
        data = JSONParser().parse(request)
        addressees = data.get('addressee', [])
        tmp = []
        if len(addressees) == 0:
            serializer = MessageSerializer(Message('Email neeeds to have at least one addressee'))
            return JsonResponse(serializer.data, safe=False, status=400)
        else:
            for i, addressee in enumerate(addressees):
                serializer = AdresseeSerializer(data=addressee)
                if serializer.is_valid():
                    model = None
                    try:
                        model = Adressee.objects.get(email_address=addressee.get('email_address', None))
                    except ObjectDoesNotExist:
                        model = Adressee()
                    model.email_address = addressee.get('email_address', None)
                    tmp.append(model)
                else:
                    serializer = MessageSerializer(Message('Bad json format for addresee at index: ' + i))
                    return JsonResponse(serializer.data, safe=False, status=400)

        model = EmailMessage()
        model.user = request.user
        model.title = data.get('title')
        model.created = datetime.utcnow()
        model.description = data.get('description')
        model.uuid = str(uuid.uuid4())
        
        model.save()

        for addressee in tmp:
            addressee.message = model
            addressee.save()

        serializer = EmailSerializer(model)
        return JsonResponse(serializer.data, status=201)


    @swagger_auto_schema(
        operation_id='update_email',
        operation_description='Update email',
        responses={200: ''}
    )
    def patch(self, request, email_id, format=None):
        data = JSONParser().parse(request)
        serializer = EmailSerializer(data=data, partial=True)
        email = None
        if serializer.is_valid():
            try:
                email = EmailMessage.objects.get(pk=email_id)
            except ObjectDoesNotExist:
                serializer = MessageSerializer(Message('No email with given id exist'))
                return JsonResponse(serializer.data, status=404)
            
            email.title = data.get('title', email.title)
            email.description = data.get('description', email.description)
            email.save()
            serializer = EmailSerializer(email)
            return JsonResponse(serializer.data, status=201)
        else:
            return JsonResponse(serializer.errors, safe=False, status=400)

    @swagger_auto_schema(
      operation_id='delete_email',
      operation_description='Delete email',
      responses={200: '{"message": "Email deleted"}'}
    )
    def delete(self, request, email_id, format=None):
        email = None
        try:
            email = EmailMessage.objects.get(pk=email_id)
            email.delete()
        except ObjectDoesNotExist:
            return JsonResponse({"message": 'No email with given id exist'}, status=404)

        serializer = MessageSerializer(Message('Email deleted'))
        return JsonResponse(serializer.data, status=200)


class EmailActivationView(APIView):

    @swagger_auto_schema(
        operation_id='check_if_activated',
        manual_parameters=[],
        operation_description="Check if email is activated",
        responses={200: scheme.EmailListReponse()}
    )
    def get(self, request, id, **kwargs):
        try:
            email = EmailMessage.objects.get(pk=id)
            if email.activated:
                serializer = MessageSerializer(Message('active'))
                return JsonResponse(serializer.data, status=200)
            else:
                serializer = MessageSerializer(Message('not active'))
                return JsonResponse(serializer.data, status=200)
        except ObjectDoesNotExist:
            serializer = MessageSerializer(Message('Invalid email id'))
            return JsonResponse(serializer.data, status=404)

class EmailReadView(APIView):


    def diff_times_in_seconds(self, t1, t2):
        # caveat emptor - assumes t1 & t2 are python times, on the same day and t2 is after t1
        h1, m1, s1 = t1.hour, t1.minute, t1.second
        h2, m2, s2 = t2.hour, t2.minute, t2.second
        t1_secs = s1 + 60 * (m1 )
        t2_secs = s2 + 60 * (m2 )
        print(t2_secs - t1_secs)
        return( t2_secs - t1_secs)

    def generate_reponse(self):
        img = Image.new('RGB', (1, 1))
        img.putdata([(255,255,255)])
        byteIO = io.BytesIO()
        img.save(byteIO, format='PNG')
        byteArr = byteIO.getvalue()
        return HttpResponse(byteArr, content_type="image/png")

    @swagger_auto_schema(
        operation_id='read_email',
        manual_parameters=[],
        operation_description="Mark email as readed",
        responses={200: scheme.EmailListReponse()}
    )
    def get(self, request, email_code, **kwargs):
        try:
            email = EmailMessage.objects.get(uuid=email_code)
        except ObjectDoesNotExist:
            serializer = MessageSerializer(Message('Invalid code'))
            return JsonResponse(serializer.data, status=404)

        user = email.user
        ip_addresses = IpAddress.objects.filter(user=user)
        request_ip = request.META.get('REMOTE_ADDR', None)
        for ip in ip_addresses:
            if ip.ip_address == request_ip:
                if self.diff_times_in_seconds(email.created.time(), datetime.utcnow()) > 4:
                    email.activated = True
                    email.save()
                    print('Activated')
                    return self.generate_reponse()
                return self.generate_reponse()
        
        if email.first_opened is None:
            email.first_opened = datetime.utcnow()
        email.last_opened = datetime.utcnow()
        email.save()
        serializer = MessageSerializer(Message('Email readed'))
        return self.generate_reponse()