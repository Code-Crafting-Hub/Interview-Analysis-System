# admin_dashboard/views.py

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserRegistrationSerializer, LoginSerializer
from .permissions import IsAdminUser

# --- NEW, SIMPLIFIED LOGIN VIEW ---
class LoginAPIView(APIView):
    """
    This is our completely custom login view.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # --- THIS IS THE FIX ---
        # We return serializer.validated_data because it contains the rich
        # dictionary we built in the serializer's .validate() method.
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


# --- THESE REGISTRATION VIEWS STAY THE SAME ---
class AdminRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

    def get_serializer_context(self):
        return {'role': 'admin'}

from .permissions import IsAdminUser
from .serializers import UserRegistrationSerializer

class EmployeeCreateByAdminView(generics.CreateAPIView):
    """
    This is the protected API endpoint for an Admin to create a new Employee.
    """
    serializer_class = UserRegistrationSerializer
    
    # THIS IS THE SECURITY LOCK:
    # This line tells Django Rest Framework to use our custom permission.
    # Any request to this view will first be checked by IsAdminUser.
    permission_classes = [IsAdminUser] 
    
    def get_serializer_context(self):
        # This tells our dynamic serializer to prepare for an 'employee'.
        return {'role': 'employee'}