# admin_dashboard/views.py

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserRegistrationSerializer, LoginSerializer
from .permissions import IsAdminUser

# --- NEW, SIMPLIFIED LOGIN VIEW ---
class LoginAPIView(APIView):
    """
    This is our completely custom login view. It will force the use of 'email'.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)


# --- THESE REGISTRATION VIEWS STAY THE SAME ---
class AdminRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

    def get_serializer_context(self):
        return {'role': 'admin'}

class EmployeeCreateByAdminView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [IsAdminUser] 
    
    def get_serializer_context(self):
        return {'role': 'employee'}