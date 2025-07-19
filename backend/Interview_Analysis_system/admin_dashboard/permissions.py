from rest_framework.permissions import BasePermission

class IsAdminUser(BasePermission):
    """
    Custom permission to only allow users with the 'admin' role.
    """
    message = "You do not have permission to perform this action. Only admins are allowed."

    def has_permission(self, request, view):
        # 1. Check if the user object exists and is authenticated.
        if not request.user or not request.user.is_authenticated:
            return False
        
        # 2. Explicitly check if the user object has a 'role' attribute
        #    and if that role is 'admin'.
        try:
            if request.user.role == 'admin':
                return True
        except AttributeError:
            # This will happen if the user object in the request doesn't have a .role attribute.
            return False
            
        return False