# admin_dashboard/admin.py

from django.contrib import admin
from .models import User

# This is the simplest possible way to register a model.
# It has no custom settings and cannot cause the SystemCheckError.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'full_name', 'role', 'is_staff')
    search_fields = ('email', 'full_name')
    list_filter = ('role',)
    ordering = ('email',)