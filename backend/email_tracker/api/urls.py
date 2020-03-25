from django.urls import path
from django.conf.urls import url

from api.views.system import VersionView
from api.views.system import MachineRegisterView
from api.views.email import EmailsView
from api.views.email import EmailReadView, EmailActivationView

from rest_framework.authtoken import views
from django.urls import include
from rest_auth import views as rest_auth_views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('version/', VersionView.as_view(), name='version'),
    path('machine/register/', MachineRegisterView.as_view(), name='register_machine'),

    path('emails/', EmailsView.as_view(), name='emails'),
    path('email/read/<str:email_code>', EmailReadView.as_view(), name='emails_read'),
    path('email/<int:id>/activated/', EmailActivationView.as_view(), name='check_email_activation'),

    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('user/profile/', rest_auth_views.UserDetailsView.as_view(), name="profile"),
]