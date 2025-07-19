from django.contrib.auth.backends import ModelBackend
from .models import User

class EmailBackend(ModelBackend):
    """
    A custom authentication backend.
    Allows users to log in using their email address.
    """
    def authenticate(self, request, email=None, password=None, **kwargs):
        """
        Overrides the authenticate method to allow login with email.
        """
        try:
            # Try to fetch the user by email
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            # No user found with that email, so authentication fails
            return None
        
        # Check if the provided password is correct for the user
        if user.check_password(password) and self.user_can_authenticate(user):
            return user
        
        # Password was incorrect
        return None

    def get_user(self, user_id):
        """
        Overrides the get_user method to allow Django to fetch a user
        by their primary key (ID).
        """
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None