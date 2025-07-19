from rest_framework.permissions import BasePermission

class IsAdminUser(BasePermission):
    """
    Custom permission to only allow users with the 'admin' role.
    """
    def has_permission(self, request, view):
        # This checks the 'role' from the JWT access token that the
        # user provides. If the role is not 'admin', this returns False.
        return bool(request.user and request.user.is_authenticated and request.user.role == 'admin')