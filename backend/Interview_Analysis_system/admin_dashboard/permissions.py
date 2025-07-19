from rest_framework.permissions import BasePermission

class IsAdminUser(BasePermission):
    """
    Custom permission to only allow users with the 'admin' role.
    """
    message = "You do not have permission to perform this action."

    def has_permission(self, request, view):
        # We check the 'role' from the JWT payload attached to request.user
        return bool(request.user and request.user.is_authenticated and request.user.role == 'admin')