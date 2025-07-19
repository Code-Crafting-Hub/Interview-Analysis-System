# admin_dashboard/serializers.py

from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from employee_dashboard.models import Department

class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    A dynamic serializer that now accepts a department NAME instead of an ID.
    """
    # --- THIS IS THE KEY CHANGE ---
    # We are overriding the default 'department' field.
    # This field will now display the department's name and will also
    # accept a name as input to find the correct department object.
    department = serializers.SlugRelatedField(
        queryset=Department.objects.all(),
        slug_field='name'
    )

    class Meta:
        model = User
        fields = [
            'full_name', 'email', 'password', 
            'admin_phone', 'admin_address', 'admin_image',
            'phone_number', 'position', 'department','employee_image'
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def __init__(self, *args, **kwargs):
        # This dynamic logic does not need to change. It works perfectly.
        super().__init__(*args, **kwargs)
        role = self.context.get('role')

        if role == 'admin':
            self.fields['admin_phone'].required = True
            self.fields['admin_address'].required = True
            self.fields.pop('phone_number', None)
            self.fields.pop('position', None)
            self.fields.pop('department', None)
            self.fields.pop('employee_image', None)
        elif role == 'employee':
            self.fields['position'].required = True
            self.fields['department'].required = True
            self.fields.pop('admin_phone', None)
            self.fields.pop('admin_address', None)
            self.fields.pop('admin_image', None)
            self.fields.pop('admin_image', None)
        else:
            self.fields.pop('admin_phone', None)
            self.fields.pop('admin_address', None)
            self.fields.pop('admin_image', None)
            self.fields.pop('phone_number', None)
            self.fields.pop('position', None)
            self.fields.pop('department', None)
            self.fields.pop('employee_image', None)

    def create(self, validated_data):
        role = self.context.get('role')
        user = User.objects.create_user(role=role, **validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    """
    A smart serializer that handles login and validates the user's role.
    """
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        # Get the expected role from the context passed by the view
        expected_role = self.context.get('expected_role')
        
        # First, authenticate with email and password
        user = authenticate(email=data['email'], password=data['password'])

        if not user or not user.is_active:
            raise serializers.ValidationError("Incorrect credentials or user account is inactive.")

        # --- THIS IS THE NEW ROLE CHECK ---
        # After successful authentication, check if the user's role matches.
        if user.role != expected_role:
            raise serializers.ValidationError(f"Access Denied: You are not authorized to log in as an {expected_role}.")
        
        # If both password and role are correct, generate tokens
        refresh = RefreshToken.for_user(user)
        refresh['role'] = user.role
        refresh['full_name'] = user.full_name

        return {
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            },
            'user_details': {
                'id': user.id,
                'full_name': user.full_name,
                'email': user.email,
                'role': user.role,
            }
        }    

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_messages = {
        'bad_token': ('Token is expired or invalid')
    }

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):
        try:
            # This is the line that does the actual work
            RefreshToken(self.token).blacklist()
        except TokenError:
            # This raises an error if the token is already invalid
            self.fail('bad_token')


class EmployeeListSerializer(serializers.ModelSerializer):
    """
    Serializer specifically for listing employees in the admin dashboard.
    It exposes fields relevant for a list view.
    """
    # Make the department name readable in the response
    department_name = serializers.CharField(source='department.name', read_only=True)

    class Meta:
        model = User
        # Define the fields you want to show for each employee in the list
        fields = [
            'id',
            'full_name',
            'email',
            'position',
            'department_name',
            'phone_number',
            'employee_image'
        ]