# admin_dashboard/admin.py

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(BaseUserAdmin):
    """
    Defines the CORRECT admin interface for our custom User model.
    """
    # --- Configuration for the list view page ---
    list_display = ('email', 'full_name', 'role', 'is_active')
    list_filter = ('role', 'is_active')
    search_fields = ('email', 'full_name')
    ordering = ('email',)

    # --- Configuration for the add/change form page ---

    # Define the layout of the form for editing a user.
    # We have removed the 'Permissions' fieldset that contained 'groups' and 'user_permissions'.
    fieldsets = (
        # Section 1: Core login information
        (None, {'fields': ('email', 'password')}),
        # Section 2: User's personal and role information
        ('Personal Info', {'fields': ('full_name', 'role')}),
        # Section 3: Details specific to Admin users
        ('Admin Specific Details', {'fields': ('admin_phone', 'admin_address', 'admin_image')}),
        # Section 4: Status (moved from 'Permissions')
        ('Status', {'fields': ('is_active',)}),
    )

    # Define the layout of the form for adding a new user
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password', 'full_name', 'role', 'is_active'),
        }),
    )

    # --- THIS IS THE FIX ---
    # The parent UserAdmin class tries to use filter_horizontal on 'groups' and
    # 'user_permissions'. Since our model doesn't have these, we override this
    # setting with an empty tuple to disable it.
    filter_horizontal = ()