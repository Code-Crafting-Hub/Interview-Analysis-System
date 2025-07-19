# employees_dashboard/serializers.py - REPLACED CONTENTS

from rest_framework import serializers
from .models import Department
# Import the central User model
from admin_dashboard.models import User 

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name', 'description']

class EmployeeProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for an employee to view or update their own profile.
    It reads from the central User model.
    """
    # Make related fields readable
    department_name = serializers.CharField(source='department.name', read_only=True)

    class Meta:
        model = User
        # Only expose fields relevant to an employee's profile
        fields = [
            'id', 'full_name', 'email', 'phone_number', 
            'position', 'department', 'department_name'
        ]
        # An employee should not be able to change their email or role
        read_only_fields = ['email', 'role']