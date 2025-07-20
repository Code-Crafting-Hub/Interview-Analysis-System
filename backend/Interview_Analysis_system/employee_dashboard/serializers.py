# employees_dashboard/serializers.py - REPLACED CONTENTS

from rest_framework import serializers

# Import the central User model
from admin_dashboard.models import User 


class EmployeeProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for an employee to view or update their own profile.
    It reads from the central User model.
    """
    # Make related fields readable

    class Meta:
        model = User
        # Only expose fields relevant to an employee's profile
        fields = [
            'id', 'full_name', 'email', 'phone_number', 
            'position'
        ]
        # An employee should not be able to change their email or role
        read_only_fields = ['email', 'role']