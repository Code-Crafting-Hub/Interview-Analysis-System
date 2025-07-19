# admin_dashboard/serializers.py

from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

# --- NEW, SIMPLIFIED LOGIN SERIALIZER ---
class LoginSerializer(serializers.Serializer):
    """
    Handles user login and returns tokens along with user details.
    """
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(
        style={'input_type': 'password'},
        write_only=True
    )

    def validate(self, data):
        # Use our custom email backend to authenticate the user
        user = authenticate(email=data['email'], password=data['password'])
        
        if not user or not user.is_active:
            raise serializers.ValidationError("Incorrect credentials or user account is inactive.")

        # --- THE FIX IS HERE ---
        # If authentication is successful, generate the tokens.
        refresh = RefreshToken.for_user(user)

        # We now return a dictionary with a nested structure for clarity.
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

# --- THIS REGISTRATION SERIALIZER STAYS THE SAME ---
class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'full_name', 'email', 'password', 
            'admin_phone', 'admin_address', 'admin_image'
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        role = self.context.get('role')

        if role == 'admin':
            self.fields['admin_phone'].required = True
            self.fields['admin_address'].required = True
        elif role == 'employee':
            self.fields.pop('admin_phone')
            self.fields.pop('admin_address')
            self.fields.pop('admin_image')

    def create(self, validated_data):
        role = self.context.get('role')
        user = User.objects.create_user(role=role, **validated_data)
        return user