# admin_dashboard/serializers.py

from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

# --- NEW, SIMPLIFIED LOGIN SERIALIZER ---
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        # We manually authenticate the user.
        # We use a custom authentication backend that we will define in settings.py
        user = authenticate(email=data['email'], password=data['password'])
        
        if user and user.is_active:
            # If authentication is successful, create JWT tokens
            refresh = RefreshToken.for_user(user)
            
            return {
                'email': user.email,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            }
        
        raise serializers.ValidationError("Incorrect Credentials")


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