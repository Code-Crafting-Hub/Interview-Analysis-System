# admin_dashboard/views.py

from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from .models import User

# Import your custom serializers
from .serializers import UserRegistrationSerializer, LoginSerializer, LogoutSerializer, EmployeeListSerializer

# Import your custom permissions
from .permissions import IsAdminUser

# Import models and serializers from the other app that this admin panel will manage
from employee_dashboard.models import Department
from employee_dashboard.serializers import DepartmentSerializer


class AdminRegistrationView(generics.CreateAPIView):
    """
    Public API endpoint to allow for the creation of a new Admin user.
    """
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny] # Anyone can access this page to register.

    def get_serializer_context(self):
        """
        Passes the 'role' context to the UserRegistrationSerializer.
        This ensures the serializer validates for an 'admin'.
        """
        return {'role': 'admin'}


class EmployeeCreateByAdminView(generics.CreateAPIView):
    """
    Protected API endpoint for an authenticated Admin to create a new Employee user.
    """
    serializer_class = UserRegistrationSerializer
    
    # This is the security lock. The IsAdminUser class will check the user's
    # JWT to ensure their role is 'admin' before allowing access.
    permission_classes = [permissions.AllowAny]
    
    def get_serializer_context(self):
        """
        Passes the 'role' context to the UserRegistrationSerializer.
        This ensures the serializer validates for an 'employee'.
        """
        return {'role': 'employee'}


class AdminLoginAPIView(generics.GenericAPIView):
    """
    API endpoint for Admin login.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    def get_serializer_context(self):
        # Pass the 'expected_role' to the serializer
        return {'expected_role': 'admin'}

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class EmployeeLoginAPIView(generics.GenericAPIView):
    """
    API endpoint for Employee login.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    def get_serializer_context(self):
        # Pass the 'expected_role' to the serializer
        return {'expected_role': 'employee'}

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class DepartmentViewSet(viewsets.ModelViewSet):
    """
    Protected API endpoint that allows Admins to perform all CRUD
    (Create, Retrieve, Update, Delete) operations on Departments.
    """
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    
    # This endpoint is also locked down so that only Admins can manage departments.
    permission_classes = [IsAdminUser]

class LogoutAPIView(generics.GenericAPIView):
    """
    API endpoint for user logout. Blacklists the refresh token.
    """
    serializer_class = LogoutSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            serializer.save()
        # Because we imported it, Python now knows what TokenError is.
        except TokenError:
            return Response({"detail": "Token is invalid or expired."}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"detail": "Logout successful."}, status=status.HTTP_204_NO_CONTENT)


class EmployeeListView(generics.ListAPIView):
    """
    Protected API endpoint for an admin to view a list of all employees.
    """
    serializer_class = EmployeeListSerializer
    permission_classes = [permissions.AllowAny] # Use the same admin-only permission

    def get_queryset(self):
        """
        This method is overridden to ensure we only return users with the 'employee' role.
        """
        return User.objects.filter(role=User.Role.EMPLOYEE).order_by('full_name')


class EmployeeViewSet(viewsets.ModelViewSet):
    """
    A full CRUD ViewSet for Admins to manage employees.
    """
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return User.objects.filter(role=User.Role.EMPLOYEE)

    def get_serializer_class(self):
        """
        --- THIS LOGIC IS CRITICAL ---
        This method ensures the right serializer is used for the right action.
        """
        # For listing employees, use a simple, read-only serializer.
        if self.action == 'list':
            return EmployeeListSerializer
        
        # For ALL other actions (create, update, retrieve), use the
        # detailed registration serializer that handles all fields.
        return UserRegistrationSerializer

    def get_serializer_context(self):
        """Always pass 'employee' role in context"""
        context = super().get_serializer_context()
        context['role'] = 'employee'
        return context