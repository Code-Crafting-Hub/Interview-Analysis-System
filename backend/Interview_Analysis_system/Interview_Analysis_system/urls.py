# Interview_Analysis_system/urls.py

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    # Keep your previous API if you still need it
    # path('api/', include('employee_dashboard.urls')), 

    # Add the new, namespaced API for the HR Admin
    path('api/', include('admin_dashboard.urls')),
]

# This is needed to serve uploaded images correctly during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)