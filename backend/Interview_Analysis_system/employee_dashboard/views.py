# employees_dashboard/views.py
from rest_framework import generics, permissions
from .serializers import EmployeeProfileSerializer
from admin_dashboard.models import User

class EmployeeProfileView(generics.RetrieveUpdateAPIView):
    """
    API endpoint for a logged-in employee to view and update their own profile.
    """
    serializer_class = EmployeeProfileSerializer
    permission_classes = [permissions.IsAuthenticated] # Any logged-in user can see their own profile

    def get_object(self):
        # This method ensures that users can only ever see their own data
        return self.request.user