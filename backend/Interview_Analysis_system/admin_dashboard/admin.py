# admin_dashboard/admin.py

from django.contrib import admin
from .models import User

# This is the simplest possible way to register a model.
# It has no custom settings and cannot cause the SystemCheckError.
admin.site.register(User)