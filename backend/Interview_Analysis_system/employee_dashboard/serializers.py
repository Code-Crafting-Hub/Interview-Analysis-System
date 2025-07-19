from rest_framework import serializers
from .models import Department, Employee

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name', 'description']

class EmployeeSerializer(serializers.ModelSerializer):
    # This makes the API response more user-friendly by including the department's name
    department_name = serializers.CharField(source='department.name', read_only=True)
    
    class Meta:
        model = Employee
        fields = [
            'id', 
            'first_name', 
            'last_name', 
            'email', 
            'phone_number',
            'department',       # This will be the ID for writing/updating
            'department_name',  # This is for reading
            'position', 
            'date_hired', 
            'created_by'
        ]
        # These fields should be set by the server, not the client
        read_only_fields = ['created_by', 'date_hired', 'department_name']