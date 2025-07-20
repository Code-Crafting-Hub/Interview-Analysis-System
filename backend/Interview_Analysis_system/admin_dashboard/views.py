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

from rest_framework_simplejwt.views import TokenObtainPairView
from .token_serializers import CustomTokenObtainPairSerializer

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


# class EmployeeCreateByAdminView(generics.CreateAPIView):
#     """
#     Protected API endpoint for an authenticated Admin to create a new Employee user.
#     """
#     serializer_class = UserRegistrationSerializer
    
#     # This is the security lock. The IsAdminUser class will check the user's
#     # JWT to ensure their role is 'admin' before allowing access.
#     permission_classes = [permissions.AllowAny]
    
#     def get_serializer_context(self):
#         """
#         Passes the 'role' context to the UserRegistrationSerializer.
#         This ensures the serializer validates for an 'employee'.
#         """
#         return {'role': 'employee'}


class EmployeeCreateByAdminView(generics.CreateAPIView):
    """
    Protected API endpoint for an authenticated Admin to create a new Employee user.
    """
    serializer_class = UserRegistrationSerializer
    
    # This is the security lock. The IsAdminUser class will check the user's
    # JWT to ensure their role is 'admin' before allowing access.
    permission_classes = [permissions.AllowAny] # Changed from permissions.AllowAny to IsAdminUser

    def get_serializer_context(self):
        """
        Passes the 'role' context to the UserRegistrationSerializer.
        This ensures the serializer validates for an 'employee'.
        """
        return {'role': 'employee'}



# class AdminLoginAPIView(generics.GenericAPIView):
#     """
#     API endpoint for Admin login.
#     """
#     permission_classes = [permissions.AllowAny]
#     serializer_class = LoginSerializer

#     def get_serializer_context(self):
#         # Pass the 'expected_role' to the serializer
#         return {'expected_role': 'admin'}

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         return Response(serializer.validated_data, status=status.HTTP_200_OK)


# class EmployeeLoginAPIView(generics.GenericAPIView):
#     """
#     API endpoint for Employee login.
#     """
#     permission_classes = [permissions.AllowAny]
#     serializer_class = LoginSerializer

#     def get_serializer_context(self):
#         # Pass the 'expected_role' to the serializer
#         return {'expected_role': 'employee'}

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         return Response(serializer.validated_data, status=status.HTTP_200_OK)




class LogoutAPIView(generics.GenericAPIView):
    """
    API endpoint for user logout. Blacklists the refresh token.
    This endpoint requires the user to be authenticated.
    """
    serializer_class = LogoutSerializer
    
    # --- THIS IS THE FIX ---
    # The user must be logged in (i.e., provide a valid access token)
    # to be able to log out.
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        """
        Handles the POST request to log a user out.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            serializer.save()
        except TokenError:
            # This can happen if the refresh token is already invalid.
            # We can still consider the logout successful on the client side.
            return Response({"detail": "Token is invalid or expired."}, status=status.HTTP_400_BAD_REQUEST)

        # A 204 No Content response is standard for a successful delete/logout action.
        return Response(status=status.HTTP_204_NO_CONTENT)
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
    


# class AdminLoginAPIView(APIView):
#     permission_classes = [permissions.AllowAny]

#     def post(self, request):
#         email = request.data.get('email')
#         password = request.data.get('password')
        
#         # Manual authentication
#         try:
#             user = User.objects.get(email=email)
#             if user.check_password(password) and user.role == 'admin':
#                 refresh = RefreshToken.for_user(user)
#                 return Response({
#                     'access': str(refresh.access_token),
#                     'refresh': str(refresh),
#                     'email': user.email,
#                     'role': user.role
#                 })
#         except User.DoesNotExist:
#             pass
        
#         return Response(
#             {"detail": "Invalid credentials or not an admin"},
#             status=status.HTTP_401_UNAUTHORIZED
#         )

# class EmployeeLoginAPIView(TokenObtainPairView):
#     serializer_class = CustomTokenObtainPairSerializer


class AdminLoginAPIView(APIView):
    """
    Handles login requests for users with the 'admin' role.
    This view performs a manual authentication check.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response(
                {"detail": "Email and password are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Find the user by email
            user = User.objects.get(email=email)
            
            # Check if the password is correct and the user is an admin
            if user.check_password(password) and user.role == 'admin':
                refresh = RefreshToken.for_user(user)
                
                # The response is structured to match the frontend's expectation
                # with nested tokens.
                return Response({
                    'tokens': {
                        'access': str(refresh.access_token),
                        'refresh': str(refresh),
                    },
                    'email': user.email,
                    'role': user.role
                }, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            # We don't want to reveal if the user exists or not, so we fall through
            # to the generic error message.
            pass

        # If authentication fails for any reason, return a 401 Unauthorized.
        return Response(
            {"detail": "Invalid credentials or you are not an admin."},
            status=status.HTTP_401_UNAUTHORIZED
        )


# --- Employee Login View ---
class EmployeeLoginAPIView(TokenObtainPairView):
    """
    Handles login for 'employee' roles using the customized serializer.
    """
    serializer_class = CustomTokenObtainPairSerializer

    def get_serializer_context(self):
        # This tells the login serializer to only accept users with the 'employee' role.
        return {'expected_role': 'employee'}

class LogoutAPIView(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"detail": "Logout successful."}, status=status.HTTP_200_OK)